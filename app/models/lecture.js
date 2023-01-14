'use strict'

// UNCOMMENT:
// const Course = require("./course")

module.exports = (sequelize, DataTypes) => {
    const Lecture = sequelize.define('Lecture', {
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
        //     },
        //     unique: 'course_order_index' // compound unique constraint with 'order'
        // },
        title: {
            type: DataTypes.STRING(50), // max length of 50
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Lecture name required"
                },
                notEmpty: {
                    msg: "Lecture name cannot be empty"
                },
                max: {
                    args: [50],
                    msg: "Title must be less than 50 characters"
                }
            }
        },
        // the order of current lecture within a course
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: 'course_order_index'    // compound unique constraint with 'courseId'
        },
        description: {
            type: DataTypes.STRING(250),    // max length of 250
            max: {
                args: [250],
                msg: "Description must be less than 250 characters"
            }
        },
        published: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })
}

// one-to-many relationship with lecture
// UNCOMMENT:
// Lecture.belongsTo(Course);
