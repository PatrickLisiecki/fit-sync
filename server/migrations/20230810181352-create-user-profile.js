"use strict";
/** @type {import('sequelize-cli').Migration} */
"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("user_profiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      age: {
        type: Sequelize.INTEGER,
      },
      gender: {
        type: Sequelize.STRING,
      },
      weight: {
        type: Sequelize.STRING,
      },
      height: {
        type: Sequelize.INTEGER,
      },
      state: {
        type: Sequelize.INTEGER,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      displayName: {
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("user_profiles");
  },
};
