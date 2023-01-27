'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Lecture', {
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
      //     }        
      // },
      title: {
          type: DataTypes.STRING(50), // max length of 50
          allowNull: false
      },
      // the order of current lecture within a course
      order: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: {    // compound unique constraint with 'courseId'
              args: 'course_order_index'
          }
      },
      description: {
        type: DataTypes.STRING(250)    // max length of 250
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('Lecture');
  }
};
