"use strict";
const { nanoid } = require("../helpers/nanoid");
const bcrypt = require("bcryptjs");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.hasMany(models.Task);
    }
  }
  Account.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isDefaultPassword: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      verificationToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Account",
      hooks: {
        beforeValidate(instance) {
          instance.id = nanoid(25);
          instance.verificationToken = nanoid(100);
        },
        beforeCreate(instance) {
          instance.password = bcrypt.hashSync(instance.password, 5);
        },
        beforeUpdate(instance) {
          instance.password = bcrypt.hashSync(instance.password, 5);
        },
      },
    }
  );
  return Account;
};
