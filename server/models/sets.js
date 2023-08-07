"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sets extends Model {
    static associate(models) {
      this.belongsTo(models.Exercise, {
        foreignKey: "exerciseId",
      });
    }
  }
  Sets.init(
    {
      exerciseId: DataTypes.INTEGER,
      reps: DataTypes.INTEGER,
      weight: DataTypes.FLOAT,
      date: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Sets",
      tableName: "sets",
    }
  );
  return Sets;
};
