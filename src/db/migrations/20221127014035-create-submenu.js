'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Submenus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING
      },
      masterMenuId: {
        type: Sequelize.BIGINT
      },
      url: {
        type: Sequelize.TEXT
      },
      title: {
        type: Sequelize.STRING
      },
      icon: {
        type: Sequelize.TEXT
      },
      ordering: {
        type: Sequelize.INTEGER
      },
      isTargetSelf: {
        type: Sequelize.BOOLEAN
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Submenus');
  }
};