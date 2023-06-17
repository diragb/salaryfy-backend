'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CourseJobRole extends Model {
    static associate(models) {
      // define association here
      models.CourseJobRole.belongsTo(models.Course, {
        foreignKey: 'course_id',
        as: 'course'
      });
    }
  }
  CourseJobRole.init({
    course_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: true,
    modelName: 'CourseJobRole'
  });
  return CourseJobRole;
};