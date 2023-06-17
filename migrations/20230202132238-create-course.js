'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_id:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'CourseCategories',
          key: 'id',
        },
        onUpdate: 'CASCADE'
      }, 
      name:{
        allowNull: false,
        type: Sequelize.STRING
      }, 
      description:{
        allowNull: false,
        type: Sequelize.TEXT
      },
      image:{
        allowNull: false,
        type: Sequelize.STRING
      },
      course_duration:{
        allowNull: false,
        type: Sequelize.STRING
      },
      placement_duration:{
        allowNull: false,
        type: Sequelize.STRING
      },
      curriculum_content:{
        allowNull: false,
        type: Sequelize.TEXT
      },
      career_center_content:{
        allowNull: false,
        type: Sequelize.TEXT
      }, 
      final_exam_content:{
        allowNull: false,
        type: Sequelize.TEXT
      }, 
      mock_interview_content:{
        allowNull: false,
        type: Sequelize.TEXT
      }, 
      placement_drive_content:{
        allowNull: false,
        type: Sequelize.TEXT
      },
      job_role_content:{
        allowNull: false,
        type: Sequelize.TEXT
      },  
      student_review_content:{
        allowNull: false,
        type: Sequelize.TEXT
      }, 
      price:{
        allowNull: false,
        type: Sequelize.INTEGER
      }, 
      type:{
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
    await queryInterface.dropTable('Courses');
  }
};
