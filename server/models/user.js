const { Model } = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Workout, {
        foreignKey: "userId", // Specify the correct foreign key for the workout association
      });

      this.hasMany(models.Exercise, {
        foreignKey: "userId", // Specify the correct foreign key for the exercise association
      });
      this.hasMany(models.WorkoutProgress, {
        foreignKey: "userId", // Specify the correct foreign key for the exercise association
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
