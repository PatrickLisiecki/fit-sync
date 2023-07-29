"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Sample WorkoutExercise data
    const sampleWorkoutExercises = [
      {
        workoutId: 1,
        exerciseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Add more sample WorkoutExercises as needed
    ];

    // Insert the data into the 'WorkoutExercises' table
    await queryInterface.bulkInsert(
      "workout_exercises",
      sampleWorkoutExercises,
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the inserted data
    await queryInterface.bulkDelete("workout_exercises", null, {});
  },
};
