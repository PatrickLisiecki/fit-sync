const { Model } = require("sequelize");
const { DataTypes } = require("sequelize");
const Exercise = require("./exercise");

module.exports = (sequelize, DataTypes) => {
  class Workout extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
      this.hasMany(models.Exercise, {
        foreignKey: "workoutId",
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
