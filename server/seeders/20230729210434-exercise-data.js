"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Sample exercise data
    const sampleExercises = [
      {
        workoutId: 1, // Add the workoutId for the first exercise
        userId: 2,
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
        workoutId: 1,
        userId: 2, // Add the workoutId for the second exercise
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
