'use strict'

const bcrypt = require('bcrypt');
const moment = require('moment')
const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 8
const mailer = require('../../lib/mailer')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        // the id column should be standardized across all models
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "First name required"
                },
                notEmpty: {
                    msg: "First name cannot be empty"
                }
            }
        },
        lastName: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Last name required"
                },
                notEmpty: {
                    msg: "Last name cannot be empty"
                }
            }
        },
        fullName: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.firstName} ${this.lastName}`;
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Invalid email"
                },
                notNull: {
                    msg: "Email required to create account"
                },
                isWithinDomain(value) {
                    const customDomain = process.env.EMAIL_DOMAIN_CONSTRAINT
                    if (customDomain) {
                        if (!value.endsWith(customDomain)) {
                            throw new Error("Email must be within the domain set by the system admin")
                        }
                    }
                }
            }
        },
        // the rawPassword is virtual, meaning it will not be stored in the db
        // this allows us to perform sequelize validation on the rawPassword, then store it hashed
        // in the password column (below). We can avoid validation on this field by specifying the fields option
        // for queryInterface methods, and excluding this field
        rawPassword: {
            type: DataTypes.VIRTUAL,
            allowNull: false,
            validate: {
                len: {
                    args: [11, 32],
                    msg: 'Password must be 11-32 characters'
                },
                notNull: {
                    msg: "Password cannot be null"
                },
                notEmpty: {
                    msg: "Password cannot be empty"
                }
            }
        },
        password: {
            type: DataTypes.STRING // we exclude allowNull: false from the model definition because it enforces model validation, but we must include it in the migration so the schema enforces the NOT NULL constraint on the column
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        failedLoginAttempts: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        lastLogin: {
            type: DataTypes.DATEONLY
        },
        emailConfirmed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        emailConfirmationCode: {
            type: DataTypes.STRING
        },
        emailConfirmationExpiresAt: {
            type: DataTypes.DATE
        },
        passwordResetCode: {
            type: DataTypes.STRING
        },
        passwordResetExpiresAt: {
            type: DataTypes.DATE
        },
        passwordResetInitiated: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    { 
        timestamps: true,
        hooks: {
            beforeCreate: async (user) => {
                user.password = await bcrypt.hash(user.rawPassword, saltRounds)
            },
            afterCreate: (user) => {
                mailer.welcome(user)
                user.generateEmailConfirmation()
            },
            beforeUpdate: async (user) => {
                if (user.rawPassword) {
                    user.password = await bcrypt.hash(user.rawPassword, saltRounds)
                }
            },
            afterUpdate: (user) => {
                if (user._previousDataValues.email != user.email) {
                    user.generateEmailConfirmation()
                }
            }
        }
    })

    User.associate = (models) => {
        User.hasMany(models.Session)
    }

    // function prototype that can be used to validate the password supplied for authentication
    User.prototype.validatePassword = function (password) {
        return bcrypt.compareSync(password, this.password)
    }

    User.prototype.generateEmailConfirmation = function () {
        this.emailConfirmationCode = this.generateOTP()
        // because we are using DATE in sequelize (DATETIME in MYSQL), we convert to UTC timezone for standardized storage & comparisons
        // MySQL documentation here: https://dev.mysql.com/doc/refman/8.0/en/datetime.html
        this.emailConfirmationExpiresAt = moment().add(5, 'm').utc().format("YYYY-MM-DD HH:mm:ss") // set expiration to NOW + 5 minutes
        mailer.confirmation(this)
        return this.emailConfirmationCode
    }

    User.prototype.emailConfirmationExpired = function () {
        return !moment().utc().isBefore(moment(this.emailConfirmationExpiresAt))
    }

    User.prototype.validateEmailConfirmation = function (code) {
        this.emailConfirmed = code == this.emailConfirmationCode
        return this.emailConfirmed
    }

    User.prototype.generatePasswordReset = function () {
        this.passwordResetCode = this.generateOTP()
        // because we are using DATE in sequelize (DATETIME in MYSQL), we convert to UTC timezone for standardized storage & comparisons
        // MySQL documentation here: https://dev.mysql.com/doc/refman/8.0/en/datetime.html
        this.passwordResetExpiresAt = moment().add(5, 'm').utc().format("YYYY-MM-DD HH:mm:ss") // set expiration to NOW + 5 minutes
        this.passwordResetInitiated = true
        return this.passwordResetCode
    }

    User.prototype.passwordResetExpired = function () {
        return !moment().utc().isBefore(moment(this.passwordResetExpiresAt))
    }

    User.prototype.validatePasswordReset = function (code) {
        const passwordReset = code == this.passwordResetCode
        this.passwordResetInitiated = !passwordReset
        // TODO: sign a JWT that authenticates a password reset
        return passwordReset
    }

    // generates a one time password of length otpLength and containing digits 0-9 & all lowercase letters in the English alphabet
    User.prototype.generateOTP = function () {
        const digits = '0123456789abcdefghijklmnopqrstuvwxyz'
        const otpLength = 6
        var otp = ''
        for(let i = 1; i <= otpLength; i++) {
            var index = Math.floor(Math.random()*(digits.length))
            otp = otp + digits[index]
        }
        return otp;
    }

    return User
}