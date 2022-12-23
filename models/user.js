'use strict'

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        // the id column should be standardized across all models
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
        firstName: { type: DataTypes.TEXT, allowNull: false },
        lastName: { type: DataTypes.TEXT, allowNull: false },
        fullName: { type: DataTypes.VIRTUAL,
            get() {
            return `${this.firstName} ${this.lastName}`;
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        // the rawPassword is virtual, meaning it will not be stored in the db
        // this allows us to perform sequelize validation on the rawPassword, then store it hashed
        // in the password column (below)
        rawPassword: {
            type: DataTypes.VIRTUAL,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A password is required'
                },
                notEmpty: {
                    msg: 'Please provide a password'
                },
                len: {
                    args: [11, 32],
                    msg: 'The password should be between 11-32 characters long'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            set(value) {
                if (value === this.rawPassword) {
                    bcrypt.hash(value, 10, function(err, hashedPass) {
                        this.setDataValue('password', hashedPass)
                    })
                }
                else {
                    throw new Error('Passwords must match!')
                }
            },
            allowNull: false
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
    }, { timestamps: true })

    return User
}