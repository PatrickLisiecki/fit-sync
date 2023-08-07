"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Sample sets data
    const sampleSets = [
      {
        exerciseId: 1, // Add the exerciseId for the first set
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
        exerciseId: 2, // Add the exerciseId for the second set
        reps: 5,
        weight: 100.0,
        date: new Date("2023-07-26"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more sample sets entries as needed
    ];

    // Insert the data into the 'Sets' table
    await queryInterface.bulkInsert("sets", sampleSets, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the inserted data
    await queryInterface.bulkDelete("sets", null, {});
  },
};
