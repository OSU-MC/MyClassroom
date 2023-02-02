'use strict'

module.exports = (sequelize, DataTypes) => {
    const Section = sequelize.define('Section', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Courses',
                key: 'id'
            },
            validate: {
                notNull: {
                    msg: "A section must belong to a course"
                }
            }
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        joinCode: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isAlphanumeric: true,
                notNull: {
                    msg: "Section join code required"
                },
                notEmpty: {
                    msg: "section join code cannot be empty"
                },
                len: {
                    args: [6, 6],
                    msg: 'Section join code must be 6 characters'
                }
            }
        },
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['courseId', 'number'],
                name: 'custom_unique_section_constraint'
            }
        ],
        timestamps: true
    })

    return Section
}