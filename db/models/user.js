'use strict'

const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT_ROUNDS || 8

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
        }
    },
    { 
        timestamps: true,
        hooks: {
            beforeCreate: async (user) => {
                if (user.rawPassword) {
                    user.password = await bcrypt.hash(user.rawPassword, saltRounds)
                }
            },
            beforeUpdate: async (user) => {
                if (user.rawPassword) {
                    user.password = await bcrypt.hash(user.rawPassword, saltRounds)
                }
            }
        }
    })

    // function prototype that can be used to validate the password supplied for authentication
    User.prototype.validatePassword = function (password) {
        return bcrypt.compareSync(password, this.password)
    }

    return User
}