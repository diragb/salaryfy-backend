'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.UserDetails.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
    }
    
  }
  UserDetails.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    alternate_number: DataTypes.STRING,
    bank_account_number: DataTypes.STRING,
    bank_name: DataTypes.STRING,
    ifsc_number: DataTypes.STRING,
    bank_branch_name: DataTypes.STRING,
    city: DataTypes.STRING,
    gender: DataTypes.STRING,
    age: DataTypes.STRING,
    current_semester: DataTypes.STRING,
    graduation_program_name: DataTypes.STRING,
    pg_graduation_program_name: DataTypes.STRING,
    type: DataTypes.STRING,
    edu_background: DataTypes.STRING,
    graduation_status: DataTypes.STRING,
    graduation_score: DataTypes.INTEGER,
    total_experience: DataTypes.STRING,
    last_salary: DataTypes.STRING,
    career_gap: DataTypes.STRING,
    career_gap_duration:DataTypes.STRING,
    collage_id: DataTypes.INTEGER,
    pg_collage_id: DataTypes.INTEGER,
  }, {
    sequelize,
    timestamps: true,
    // createdAt: 'created_at',
    // updatedAt: 'updated_at',
    modelName: 'UserDetails'
  });
  return UserDetails;
};