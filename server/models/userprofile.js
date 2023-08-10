"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  UserProfile.init(
    {
      userId: DataTypes.INTEGER,
      height: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      gender: DataTypes.STRING,
      state: DataTypes.STRING,
      displayName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserProfile",
      tableName: "UserProfiles",
    }
  );
  return UserProfile;
};
