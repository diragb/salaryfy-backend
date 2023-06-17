'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CourseClickInformation extends Model {
    static associate(models) {
      // define association here
      
    }
  }
  CourseClickInformation.init({
    course_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    timestamps: true,
    modelName: 'CourseClickInformation'
  });
  return CourseClickInformation;
};