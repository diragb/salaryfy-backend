'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DirectPlacedAddInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
    
  }
  DirectPlacedAddInfo.init({
    user_id: DataTypes.INTEGER,
    education: DataTypes.STRING,
    current_industry: DataTypes.STRING,
    current_department: DataTypes.STRING,
    current_designation: DataTypes.STRING,
    current_salary: DataTypes.STRING,
    desired_industry_to_work_in: DataTypes.STRING,
    desired_department: DataTypes.STRING,
    desired_designation: DataTypes.STRING,
    current_location: DataTypes.STRING,
    relocate: DataTypes.STRING,
    aadhar_card_path: DataTypes.STRING,
    pan_card_path: DataTypes.STRING,
    consent_path: DataTypes.STRING,
    passport_photo_path: DataTypes.STRING,
    resume_path: DataTypes.STRING,
    x_certificate_path:DataTypes.STRING,
    xii_certificate_path: DataTypes.STRING,
    passbook_photocopy_path: DataTypes.STRING,
    cancelled_cheque_path: DataTypes.STRING,
    graduate_marksheet_path: DataTypes.STRING,
    graduate_certificate_path: DataTypes.STRING,
    post_graduate_certificate_path: DataTypes.STRING,
    work_experience_letter_path: DataTypes.STRING,
    three_month_salary_slip_path: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: true,
    // createdAt: 'created_at',
    // updatedAt: 'updated_at',
    modelName: 'DirectPlacedAddInfo'
  });
  return DirectPlacedAddInfo;
};