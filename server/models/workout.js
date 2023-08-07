const { Model } = require("sequelize");
const { DataTypes } = require("sequelize");
const Exercise = require("./exercise");

module.exports = (sequelize, DataTypes) => {
  class Workout extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId", // Specify the correct foreign key for the user association
      });
      this.hasMany(models.Exercise, {
        foreignKey: "workoutId", // Specify the correct foreign key for the exercise association
      });
    }
  }
  Workout.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Workout",
      tableName: "workouts",
    }
  );
  return Workout;
};
