'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CourseFaculty extends Model {
    static associate(models) {
      // define association here
      models.CourseFaculty.belongsTo(models.Course, {
        foreignKey: 'course_id',
        as: 'course'
      });
    }
  }
  CourseFaculty.init({
    course_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    profile_image: DataTypes.STRING,
    designation: DataTypes.STRING,
    department: DataTypes.STRING,
    description: DataTypes.TEXT,
    media_path: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: true,
    modelName: 'CourseFaculty'
  });
  return CourseFaculty;
};