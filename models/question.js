'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      // define association here
      models.Question.belongsToMany(models.Answer, {
        through: models.Answer,
        foreignKey: 'question_id',
        otherKey: 'id',
        as: 'answers',  
      });
      models.Question.hasOne(models.CorrectAnswer, {
        foreignKey: 'question_id',
        as: 'correct_answer'
      });
    }
  }
  Question.init({
    category: DataTypes.STRING,
    question: DataTypes.STRING,
    is_media: DataTypes.BOOLEAN,
    media_path: DataTypes.STRING,
    course_id: DataTypes.INTEGER,
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Question'
  });
  return Question;
};