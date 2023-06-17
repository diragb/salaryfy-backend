'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    
  }
  Answer.init({
    question_id: DataTypes.STRING,
    answer: DataTypes.STRING,
    is_media: DataTypes.BOOLEAN,
    media_path: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Answer'
  });
  return Answer;
};