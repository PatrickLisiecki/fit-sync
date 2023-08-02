"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("exercises", "day", {
      type: Sequelize.STRING, // Change the data type if necessary
      allowNull: true, // Set this to false if the day cannot be null
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("exercises", "day");
  },
};
