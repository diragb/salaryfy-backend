'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('UserDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      alternate_number: {
        allowNull: true,
        type: Sequelize.STRING
      },
      bank_account_number: {
        allowNull: true,
        type: Sequelize.STRING
      },
      bank_name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      ifsc_number: {
        allowNull: true,
        type: Sequelize.STRING
      },
      bank_branch_name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      city: {
        allowNull: true,
        type: Sequelize.STRING
      },
      gender: {
        allowNull: true,
        type: Sequelize.STRING
      },
      age: {
        allowNull: true,
        type: Sequelize.STRING
      },
      current_semester: {
        allowNull: true,
        type: Sequelize.STRING
      },
      graduation_program_name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      pg_graduation_program_name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      type: {
        allowNull: true,
        type: Sequelize.STRING
      },
      edu_background: {
        allowNull: true,
        type: Sequelize.STRING
      },
      graduation_status:{
        allowNull: true,
        type: Sequelize.STRING
      },
      collage_id:{
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Colleges',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      graduation_score:{
        allowNull: true,
        type: Sequelize.INTEGER
      },
      total_experience:{
        allowNull: true,
        type: Sequelize.STRING
      },
      last_salary:{
        allowNull: true,
        type: Sequelize.STRING
      },
      career_gap:{
        allowNull: true,
        type: Sequelize.STRING
      },
      career_gap_duration:{
        allowNull: true,
        type: Sequelize.STRING
      },
      pg_collage_id:{
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Colleges',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('UserDetails');
  }
};
