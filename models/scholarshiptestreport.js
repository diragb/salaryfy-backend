'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ScholarshipTestReport extends Model {
    static associate(models) {
      // define association here
      models.ScholarshipTestReport.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      models.ScholarshipTestReport.hasOne(models.UserDetails, {
        foreignKey: 'id',
        targetKey: 'user_id',
        as: 'details'
      });
      models.ScholarshipTestReport.belongsTo(models.Course, {
        foreignKey: 'course_id',
        as: 'course'
      });
    }
  }
  ScholarshipTestReport.init({
    user_id:DataTypes.INTEGER,
    course_id: DataTypes.INTEGER,
    total_questions: DataTypes.STRING,
    total_percentage: DataTypes.STRING,
    total_correct_count: DataTypes.STRING,
    security_fee: DataTypes.STRING,
    payload: DataTypes.TEXT,
  }, {
    sequelize,
    timestamps: true,
    modelName: 'ScholarshipTestReport'
  });
  return ScholarshipTestReport;
};