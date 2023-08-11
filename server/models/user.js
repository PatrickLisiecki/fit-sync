const { Model } = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Workout, {
        foreignKey: "userId",
      });
      this.hasOne(models.UserProfile, {
        foreignKey: "userId",
      });
      this.hasMany(models.Exercise, {
        foreignKey: "userId",
      });
      this.hasMany(models.AIworkout, {
        foreignKey: "userId",
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
