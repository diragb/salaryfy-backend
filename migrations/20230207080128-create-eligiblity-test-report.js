'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('EligiblityTestReports', {
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
      user_type:{
        allowNull: false,
        type: Sequelize.STRING
      },
      total_questions:{
        allowNull: false,
        type: Sequelize.STRING
      },
      salary_hike_percentage: {
        allowNull: false,
        type: Sequelize.STRING
      },
      salary_in_lpa: {
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
      test_percentage_in_logical_reasoning: {
        allowNull: false,
        type: Sequelize.STRING
      },
      test_percentage_in_language_comprehension: {
        allowNull: false,
        type: Sequelize.STRING
      },
      test_percentage_in_audio_visual_processing: {
        allowNull: false,
        type: Sequelize.STRING
      },
      total_percentage_in_logical_reasoning: {
        allowNull: false,
        type: Sequelize.STRING
      },
      total_percentage_in_language_comprehension: {
        allowNull: false,
        type: Sequelize.STRING
      },
      total_percentage_in_audio_visual_processing: {
        allowNull: false,
        type: Sequelize.STRING
      },
      is_eligible: {
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
    await queryInterface.dropTable('EligiblityTestReports');
  }
};
