'use strict'

const { DataTypes } = require("sequelize")

module.exports = (sequelize, Database) => {
    const Enrollment = sequelize.define('Enrollment', {
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
        // userId: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: User,
        //         key: 'id'
        //     }
        // },
        // sectionId: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: Section,
        //         key: 'id'
        //     }
        // },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isIn: [['student', 'teacher', 'ta', 'admin']],
            notNull: {
                msg: "Enrollment role required"
            }
          }
        }
    },
    {
        timestamps: true
    }
    )

    // to be implemented later
    // Course.hasMany(Enrollment, {
    //     foreignKey: 'courseId'
    // });
    // Enrollment.belongsTo(Course);

    // User.hasMany(Enrollment, {
    //     foreignKey: 'userId'
    // });
    // Enrollment.belongsTo(User);

    // Section.hasMany(Enrollment, {
    //     foreignKey: 'sectionId'
    // });
    // Enrollment.belongsTo(Section);

    return Enrollment
}