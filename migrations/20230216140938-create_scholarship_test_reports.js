'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ScholarshipTestReports', {
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
      course_id:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Courses',
          key: 'id',
        },
        onUpdate: 'CASCADE'
      }, 
      total_questions:{
        allowNull: false,
        type: Sequelize.STRING
      },
      total_percentage: {
        allowNull: false,
        type: Sequelize.STRING
      },
      total_correct_count: {
        allowNull: false,
        type: Sequelize.STRING
      }, 
      security_fee: {
        allowNull: true,
        type: Sequelize.STRING
      }, 
      payload: {
        allowNull: true,
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('ScholarshipTestReports');
  }
};
