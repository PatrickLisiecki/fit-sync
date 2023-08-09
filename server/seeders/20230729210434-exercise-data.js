"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sampleExercises = [
      {
        workoutId: 1,
        userId: 1,
        week: 1,
        day: "Monday",
        name: "Push-up",
        type: "Strength",
        muscle: "Chest",
        equipment: "Bodyweight",
        difficulty: "Beginner",
        details: "Place your hands on the floor...",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        workoutId: 1,
        userId: 1,
        week: 2,
        name: "Squat",
        day: "Monday",
        type: "Strength",
        muscle: "Legs",
        equipment: "None",
        difficulty: "Intermediate",
        details: "Stand with your feet shoulder-width apart...",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("exercises", sampleExercises, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("exercises", null, {});
  },
};
