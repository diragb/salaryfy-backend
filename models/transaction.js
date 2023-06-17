'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      // define association here
      
    }
  }
  Transaction.init({
    user_id:DataTypes.INTEGER,
    amount: DataTypes.STRING,
    transaction_type: DataTypes.STRING,
    payment_id: DataTypes.STRING,
    order_id: DataTypes.STRING,
    payment_source: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Transaction'
  });
  return Transaction;
};