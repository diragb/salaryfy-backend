'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CourseCurriculumTermDetail extends Model {
    static associate(models) {
      // define association here
      models.CourseCurriculumTermDetail.belongsTo(models.CourseCurriculumTerm, {
        foreignKey: 'course_term_id',
        as: 'term'
      });
    }
  }
  CourseCurriculumTermDetail.init({
    course_term_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {
    sequelize,
    timestamps: true,
    modelName: 'CourseCurriculumTermDetail'
  });
  return CourseCurriculumTermDetail;
};