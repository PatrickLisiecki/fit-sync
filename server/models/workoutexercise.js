"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WorkoutExercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WorkoutExercise.belongsTo(models.Workout, { foreignKey: "workoutId" });
      WorkoutExercise.belongsTo(models.Exercise, { foreignKey: "exerciseId" });
    }
  }
  WorkoutExercise.init(
    {
      workoutId: DataTypes.INTEGER,
      exerciseId: DataTypes.INTEGER,
    },

    {
      sequelize,
      modelName: "WorkoutExercise",
      tableName: "workout_exercises",
    }
  );
  return WorkoutExercise;
};
