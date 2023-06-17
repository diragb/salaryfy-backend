'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('DirectPlacedAddInfos', {
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
      education: {
        allowNull: true,
        type: Sequelize.STRING
      },
      current_industry: {
        allowNull: true,
        type: Sequelize.STRING
      },
      current_department: {
        allowNull: true,
        type: Sequelize.STRING
      },
      current_designation: {
        allowNull: true,
        type: Sequelize.STRING
      },
      current_salary: {
        allowNull: true,
        type: Sequelize.STRING
      },
      desired_industry_to_work_in: {
        allowNull: true,
        type: Sequelize.STRING
      },
      desired_department: {
        allowNull: true,
        type: Sequelize.STRING
      },
      desired_designation: {
        allowNull: true,
        type: Sequelize.STRING
      },
      current_location: {
        allowNull: true,
        type: Sequelize.STRING
      },
      relocate: {
        allowNull: true,
        type: Sequelize.STRING
      },
      aadhar_card_path:{
        allowNull: true,
        type: Sequelize.STRING
      },
      pan_card_path:{
        allowNull: true,
        type: Sequelize.STRING
      },
      consent_path:{
        allowNull: true,
        type: Sequelize.STRING
      },
      passport_photo_path:{
        allowNull: true,
        type: Sequelize.STRING
      },
      resume_path:{
        allowNull: true,
        type: Sequelize.STRING
      },
      x_certificate_path:{
        allowNull: true,
        type: Sequelize.STRING
      },
      xii_certificate_path:{
        allowNull: true,
        type: Sequelize.STRING
      },
      passbook_photocopy_path:{
        allowNull: true,
        type: Sequelize.STRING
      },
      cancelled_cheque_path:{
        allowNull: true,
        type: Sequelize.STRING
      },
      graduate_marksheet_path:{
        allowNull: true,
        type: Sequelize.STRING
      },
      graduate_certificate_path:{
        allowNull: true,
        type: Sequelize.STRING
      },
      post_graduate_certificate_path:{
        allowNull: true,
        type: Sequelize.STRING
      },
      work_experience_letter_path:{
        allowNull: true,
        type: Sequelize.STRING
      },
      three_month_salary_slip_path:{
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
    await queryInterface.dropTable('DirectPlacedAddInfos');
  }
};
