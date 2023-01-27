'use strict'

const { DataTypes } = require("sequelize")

module.exports = (sequelize, Database) => {
    const Section = sequelize.define('Section', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        // UNCOMMENT: 
        // courseId: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: Course,
        //         key: 'id'
        //     }
        // },
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
                fields: ['number'] //courseId foreign key will be part of this too
            }
        ]
    },
    {
        timestamps: true
    }
    )

    // Course.hasMany(Section, {
    //     foreignKey: 'courseId'
    // });
    // Section.belongsTo(Course);

    return Section
}