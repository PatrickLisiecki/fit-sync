"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the new columns (sets, reps, weight) to the Exercise table
    await queryInterface.addColumn("exercises", "sets", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn("exercises", "reps", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn("exercises", "weight", {
      type: Sequelize.FLOAT,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the new columns (sets, reps, weight) from the Exercise table in reverse order
    await queryInterface.removeColumn("exercises", "weight");
    await queryInterface.removeColumn("exercises", "reps");
    await queryInterface.removeColumn("exercises", "sets");
  },
};
