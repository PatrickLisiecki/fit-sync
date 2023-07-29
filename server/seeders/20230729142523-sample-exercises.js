"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Sample exercise data
    const sampleExercises = [
      {
        exerciseId: 1,
        name: "Push-up",
        type: "Strength",
        muscle: "Chest",
        equipment: "Bodyweight",
        difficulty: "Beginner",
        instructions: "Place your hands on the floor...",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exerciseId: 2,
        name: "Squat",
        type: "Strength",
        muscle: "Legs",
        equipment: "None",
        difficulty: "Intermediate",
        instructions: "Stand with your feet shoulder-width apart...",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more sample exercises as needed
    ];

    // Insert the data into the 'exercises' table
    await queryInterface.bulkInsert("exercises", sampleExercises, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the inserted data
    await queryInterface.bulkDelete("exercises", null, {});
  },
};
