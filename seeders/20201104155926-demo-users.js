'use strict';
const faker = require('faker');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    /*const mockUsers = [
      {
        firstName: 'Laura',
        lastName: 'Cozma',
        email: 'ffff@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]*/
    const mockUsers = [];
    for(let i = 0; i <= 100; i++) {
      mockUsers.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    await queryInterface.bulkInsert('Users', mockUsers, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
