"use strict";
const { Model } = require("sequelize");
const Workout = require("./workout");

module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Exercise.belongsToMany(models.Workout, { through: "workout_exercise" });
      Exercise.hasMany(models.WorkoutExercise, { foreignKey: "exerciseId" });
    }
  }
  Exercise.init(
    {
      name: DataTypes.STRING,
      exerciseId: DataTypes.INTEGER,
      type: DataTypes.STRING,
      muscle: DataTypes.STRING,
      equipment: DataTypes.STRING,
      difficulty: DataTypes.STRING,
      instructions: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Exercise",
      tableName: "Exercises",
    }
  );
  return Exercise;
};
