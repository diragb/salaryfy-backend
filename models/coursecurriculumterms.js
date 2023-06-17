'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CourseCurriculumTerm extends Model {
    static associate(models) {
      // define association here
      models.CourseCurriculumTerm.belongsTo(models.Course, {
        foreignKey: 'course_id',
        as: 'course'
      });
      models.CourseCurriculumTerm.belongsToMany(models.CourseCurriculumTermDetail, {
        through: models.CourseCurriculumTermDetail,
        foreignKey: 'course_term_id',
        otherKey: 'id',
        as: 'curriculum_term_topic',  
      });
    }
  }
  CourseCurriculumTerm.init({
    course_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {
    sequelize,
    timestamps: true,
    modelName: 'CourseCurriculumTerm'
  });
  return CourseCurriculumTerm;
};