'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    const password = await bcrypt.hash('123456', 10);

    await queryInterface.bulkInsert('Users', [
      { name: 'Admin', email: 'admin@example.com', total_amount: 50000.00, password:password, createdAt: new Date(), updatedAt: new Date() },
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
