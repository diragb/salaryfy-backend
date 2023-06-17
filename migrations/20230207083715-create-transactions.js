'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
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
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      amount:{
        allowNull: false,
        type: Sequelize.STRING
      }, 
      transaction_type:{
        allowNull: false,
        type: Sequelize.STRING
      }, 
      payment_id:{
        allowNull: true,
        type: Sequelize.STRING
      },  
      order_id:{
        allowNull: true,
        type: Sequelize.STRING
      },
      payment_source:{
        allowNull: false,
        type: Sequelize.STRING
      }, 
      status:{
        allowNull: false,
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
    await queryInterface.dropTable('Transactions');
  }
};
