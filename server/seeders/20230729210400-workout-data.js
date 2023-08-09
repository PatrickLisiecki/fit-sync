"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sampleWorkouts = [
      {
        userId: 1,
        name: "push/pull",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        name: "5x5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("workouts", sampleWorkouts, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("workouts", null, {});
  },
};
