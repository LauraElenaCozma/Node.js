'use strict';
const models = require('../models');
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
   const usersQuery = await models.User.findAll();
   const usersAddress = usersQuery.map(user => ({
    userId: user.id,
    street: faker.address.streetName(),
    no: 3,
    city: faker.address.city(),
    country: faker.address.country(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
   await queryInterface.bulkInsert('Addresses', usersAddress, {});
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
