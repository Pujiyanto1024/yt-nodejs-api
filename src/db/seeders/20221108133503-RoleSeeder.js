'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Roles', [
      {
        roleName: 'Super User',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: 'Admin 1',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: 'User Biasa',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Roles', null, {});
  }
};
