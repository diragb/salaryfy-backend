'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone: {
        allowNull: true,
        unique: true,
        type: Sequelize.STRING
      },
      otp: {
        allowNull: true,
        type: Sequelize.STRING
      },
      expire_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      email: {
        allowNull: true,
        unique: true,
        isEmail: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: true,
        type: Sequelize.STRING
      },
      email_verified_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      remember_token: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};