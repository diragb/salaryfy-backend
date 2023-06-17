'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CourseCategory extends Model {
    
  }
  CourseCategory.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: true,
    modelName: 'CourseCategory'
  });
  return CourseCategory;
};