"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sampleSets = [
      {
        exerciseId: 1,
        reps: 10,
        weight: 50.0,
        date: new Date("2023-07-25"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exerciseId: 1,
        reps: 12,
        weight: 55.0,
        date: new Date("2023-07-27"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exerciseId: 2,
        reps: 5,
        weight: 100.0,
        date: new Date("2023-07-26"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("sets", sampleSets, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("sets", null, {});
  },
};
