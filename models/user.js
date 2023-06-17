'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.belongsToMany(models.Role, {
        through: models.UserHasRole,
        foreignKey: 'UserId',
        otherKey: 'RoleId',
        as: 'roles',  
      });
      models.User.hasOne(models.UserDetails, {
        foreignKey: 'user_id',
        as: 'details'
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    otp: DataTypes.STRING,
    expire_at: DataTypes.DATE,
    password: DataTypes.STRING,
    email_verified_at: DataTypes.DATE,
    remember_token: DataTypes.STRING
  }, {
    sequelize,
    timestamps: true,
    // createdAt: 'created_at',
    // updatedAt: 'updated_at',
    modelName: 'User'
  });
  return User;
};