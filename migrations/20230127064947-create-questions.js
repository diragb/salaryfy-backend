'use strict';

const sequelize = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category:{
        allowNull: true,
        type: Sequelize.STRING
      },
      question:{
        allowNull: false,
        type: Sequelize.STRING
      },  
      is_media:{
        allowNull: true,
        type: Sequelize.BOOLEAN
      },  
      media_path:{
        allowNull: true,
        type: Sequelize.STRING
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Questions');
  }
};
