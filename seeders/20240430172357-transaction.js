'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Transactions', [
      { user_id: 1, order_id: 'dp/1/240513/101010', amount: 100000.00, status: 1, type: 10, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, order_id: 'wd/1/240513/130040', amount: 50000.00, status: 1, type: 20, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
