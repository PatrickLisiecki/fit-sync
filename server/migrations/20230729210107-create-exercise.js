"use strict";
/** @type {import('sequelize').QueryInterface} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("exercises", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        // Add the workoutId column
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      workoutId: {
        // Add the workoutId column
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "workouts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      type: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      muscle: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      equipment: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      difficulty: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      details: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      week: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("exercises");
  },
};
