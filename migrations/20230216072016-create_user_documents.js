'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('UserDocuments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE'
      }, 
      aadhar_card:{
        allowNull: true,
        type: Sequelize.STRING
      },  
      pan_card:{
        allowNull: true,
        type: Sequelize.STRING
      },  
      passport_photo:{
        allowNull: true,
        type: Sequelize.STRING
      }, 
      isa:{
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
    await queryInterface.dropTable('UserDocuments');
  }
};
