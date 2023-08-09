"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
      this.belongsTo(models.Workout, {
        foreignKey: "workoutId",
      });
      this.hasMany(models.Sets, {
        foreignKey: "exerciseId",
      });
    }
  }
  Exercise.init(
    {
      workoutId: DataTypes.INTEGER,
      type: DataTypes.STRING,
      name: DataTypes.STRING,
      muscle: DataTypes.STRING,
      equipment: DataTypes.STRING,
      difficulty: DataTypes.STRING,
      day: DataTypes.STRING,
      week: DataTypes.INTEGER,
      details: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: [0, 5000],
        },
      },
    },
    {
      sequelize,
      modelName: "Exercise",
      tableName: "exercises",
    }
  );
  return Exercise;
};
