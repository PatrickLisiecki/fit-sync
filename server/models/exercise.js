"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId", // Specify the correct foreign key for the user association
      });
      this.belongsTo(models.Workout, {
        foreignKey: "workoutId", // Specify the correct foreign key for the workout association
      });
    }
  }
  Exercise.init(
    {
      workoutId: DataTypes.INTEGER, // Add the workoutId field
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      muscle: DataTypes.STRING,
      equipment: DataTypes.STRING,
      difficulty: DataTypes.STRING,
      day: DataTypes.STRING,
      instructions: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Exercise",
      tableName: "exercises",
    }
  );
  return Exercise;
};
