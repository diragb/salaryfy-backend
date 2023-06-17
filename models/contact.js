'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    
  }
  Contact.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    message: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Contact'
  });
  return Contact;
};