'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.createTable('books', 
      {
         id: {
           type: Sequelize.DataTypes.INTEGER(10),
           primaryKey: true,
           autoIncrement: true,
           allowNull: false,
         },

         title: {
           type: Sequelize.DataTypes.STRING(200),
           allowNull: false,
         },

         total_pages: {
           type: Sequelize.DataTypes.INTEGER,
           allowNull: false,
         },

         author: {
           type: Sequelize.DataTypes.STRING(200),
           allowNull: false,
         },

         release_year: {
           type: Sequelize.DataTypes.STRING(50),
           allowNull: false,
         },

         stock: {
           type: Sequelize.DataTypes.INTEGER,
           allowNull: false,
         },
         createdAt: Sequelize.DataTypes.DATE,
         updatedAt: Sequelize.DataTypes.DATE,

      });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('books');
  }
};
