'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class College extends Model {
    
  }
  College.init({
    type: DataTypes.INTEGER,
    name: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: true,
    modelName: 'College'
  });
  return College;
};