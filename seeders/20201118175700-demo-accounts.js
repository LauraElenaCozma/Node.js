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
   const usersAccounts = usersQuery.map(user => ({
    userId: user.id,
    iban: faker.finance.iban(),
    cardType: 'MasterCard',
    cardNumber: faker.finance.creditCardNumber(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
   await queryInterface.bulkInsert('Accounts', usersAccounts, {});
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
