"use strict";
const { nanoid } = require("nanoid");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.Account);
    }
  }
  Task.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      AccountId: {
        type: DataTypes.STRING,
        references: {
          model: "Accounts",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Task",
      hooks: {
        beforeValidate(instance) {
          instance.id = nanoid(15);
        },
        afterFind(instance) {
          instance.input ? (instance.input = JSON.parse(instance.input)) : null;
          instance.hasil ? (instance.hasil = JSON.parse(instance.hasil)) : null;
        },
      },
    }
  );
  return Task;
};
