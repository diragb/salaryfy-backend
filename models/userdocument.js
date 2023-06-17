'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserDocument extends Model {
    
  }
  UserDocument.init({
    user_id: DataTypes.INTEGER,
    aadhar_card: DataTypes.STRING,
    pan_card: DataTypes.STRING,
    passport_photo: DataTypes.STRING,
    isa: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: true,
    modelName: 'UserDocument'
  });
  return UserDocument;
};