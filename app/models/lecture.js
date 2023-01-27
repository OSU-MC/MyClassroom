'use strict'

// UNCOMMENT:
// const Course = require('./course')

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
        //     unique: {    // compound unique constraint with 'order'
        //         args: 'course_order_index',
        //         msg: 'There already exists a lecture with this order number in this course'
        //     }        
        // },
        title: {
            type: DataTypes.STRING(50), // max length of 50
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Lecture name required'
                },
                len: {
                    args: [1, 50],
                    msg: 'Title must be between 1 and 50 characters'
                }
            }
        },
        // the order of current lecture within a course
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: {    // compound unique constraint with 'courseId'
                args: 'course_order_index',
                msg: 'There already exists a lecture with this order number in this course'
            }
        },
        description: {
            type: DataTypes.STRING(250),    // max length of 250
            validate: {
                len: {
                    args: [0, 250],
                    msg: 'Description must be less than 250 characters'
                }
            }
        },
    },
    {
        // UNCOMMENT:
        // hooks: {
        //     beforeCreate: async (lecture) => {
        //         if (!lecture.order === null) {  // if lecture order isn't passed in
        //             const curr_max_order = await Lecture.max('order', {     // get the current max order number for this course
        //                 where: {
        //                     courseId: lecture.courseId
        //                 }
        //             })
    
        //             if (curr_max_order === null) {  // if no order was found (first entry for this course)
        //                 lecture.order = 1;
        //             }
        //             else {  // if there is an entry for this course, get appropriate order number
        //                 lecture.order = curr_max_order + 1
        //             }
        //         }
        //     }
        // }
    })

    return Lecture;
}

// one-to-many relationship with lecture
// UNCOMMENT:
// Lecture.belongsTo(Course);