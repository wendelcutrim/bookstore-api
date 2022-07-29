'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false
      },

      password: {
        type: Sequelize.STRING(200),
        allowNull: false
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
