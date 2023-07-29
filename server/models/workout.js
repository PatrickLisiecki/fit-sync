const { Model } = require("sequelize");
const { DataTypes } = require("sequelize");
const Exercise = require("./exercise");
const User = require("./user");

module.exports = (sequelize) => {
  class Workout extends Model {
    static associate(models) {
      const Exercise = models.Exercise; // Import Exercise model from models parameter
      // define association here
      Workout.belongsToMany(Exercise, { through: "workout_exercise" });
      Workout.belongsTo(models.User, { foreignKey: "userId" });
      Workout.hasMany(models.WorkoutExercise, { foreignKey: "workoutId" });
    }
  }
  Workout.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      day: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Workout",
      tableName: "workouts", // Adjust the table name here
    }
  );
  return Workout;
};
