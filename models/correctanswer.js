'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CorrectAnswer extends Model {
    static associate(models) {
        // define association here
        // models.CorrectAnswer.belongsTo(models.Answer, { foreignKey:'correct_answer_id',as:'correct_answer'} );
      }
  }
  CorrectAnswer.init({
    question_id: DataTypes.STRING,
    correct_answer_id: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: true,
    modelName: 'CorrectAnswer'
  });
  return CorrectAnswer;
};