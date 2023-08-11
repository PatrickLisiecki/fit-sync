"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("ai_workouts", [
      {
        userId: 1,
        workout: "dcccrcrcrcrcrcrcrc",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        workout: "dcccrcrcrcrcrcrcrc",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more data entries as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("ai_workouts", null, {});
  },
};
