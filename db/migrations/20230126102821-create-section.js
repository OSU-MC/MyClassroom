'use strict';

const { sequelize } = require('../../app/models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Sections', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      joinCode: {
        type: Sequelize.STRING,
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
      // these columns should be standardized across all future tables created
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
    })//.then(() => queryInterface.addIndex('Sections', ['number']));
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('Sections');
  }
};
