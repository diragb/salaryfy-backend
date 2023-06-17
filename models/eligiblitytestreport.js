'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EligiblityTestReport extends Model {
    static associate(models) {
      // define association here
      models.EligiblityTestReport.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      models.EligiblityTestReport.hasOne(models.UserDetails, {
        foreignKey: 'id',
        targetKey: 'user_id',
        as: 'details'
      });
    }
  }
  EligiblityTestReport.init({
    user_id:DataTypes.INTEGER,
    user_type: DataTypes.STRING,
    total_questions: DataTypes.STRING,
    salary_hike_percentage: DataTypes.STRING,
    salary_in_lpa: DataTypes.STRING,
    total_percentage: DataTypes.STRING,
    total_correct_count: DataTypes.STRING,
    test_percentage_in_logical_reasoning: DataTypes.STRING,
    test_percentage_in_language_comprehension: DataTypes.STRING,
    test_percentage_in_audio_visual_processing: DataTypes.STRING,
    total_percentage_in_logical_reasoning: DataTypes.STRING,
    total_percentage_in_language_comprehension: DataTypes.STRING,
    total_percentage_in_audio_visual_processing: DataTypes.STRING,
    is_eligible: DataTypes.STRING,
    payload: DataTypes.TEXT,
  }, {
    sequelize,
    timestamps: true,
    modelName: 'EligiblityTestReport'
  });
  return EligiblityTestReport;
};