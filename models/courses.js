'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      // define association here
      models.Course.belongsToMany(models.CourseCurriculumTerm, {
        through: models.CourseCurriculumTerm,
        foreignKey: 'course_id',
        otherKey: 'id',
        as: 'course_curriculum_term',  
      });
      models.Course.belongsToMany(models.CourseFeature, {
        through: models.CourseFeature,
        foreignKey: 'course_id',
        otherKey: 'id',
        as: 'course_features',  
      });
      models.Course.belongsToMany(models.CourseJobRole, {
        through: models.CourseJobRole,
        foreignKey: 'course_id',
        otherKey: 'id',
        as: 'course_job_roles',  
      });
      models.Course.belongsTo(models.CourseCategory, {
        foreignKey: 'category_id',
        as: 'category'
      });
      models.Course.hasOne(models.CourseFaculty, {
        foreignKey: 'course_id',
        targetKey: 'id',
        as: 'course_faculty'
      });
    }
  }
  Course.init({
    category_id:DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    course_duration: DataTypes.STRING,
    placement_duration: DataTypes.STRING,
    curriculum_content: DataTypes.TEXT,
    career_center_content: DataTypes.TEXT,
    final_exam_content: DataTypes.TEXT,
    mock_interview_content: DataTypes.TEXT,
    placement_drive_content: DataTypes.TEXT,
    job_role_content: DataTypes.TEXT,
    student_review_content: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    type: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Course'
  });
  return Course;
};