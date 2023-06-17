'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CourseFeature extends Model {
    static associate(models) {
      // define association here
      models.CourseFeature.belongsTo(models.Course, {
        foreignKey: 'course_id',
        as: 'course'
      });
    }
  }
  CourseFeature.init({
    course_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: true,
    modelName: 'CourseFeature'
  });
  return CourseFeature;
};