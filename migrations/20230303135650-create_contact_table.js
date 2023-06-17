'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },  
      name:{
        allowNull: true,
        type: Sequelize.STRING
      },   
      email:{
        allowNull: true,
        type: Sequelize.STRING
      },   
      phone:{
        allowNull: true,
        type: Sequelize.STRING
      }, 
      message:{
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
    await queryInterface.dropTable('Contacts');
  }
};
