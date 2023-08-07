const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { Exercise } = require("../models");

// Read all exercises for a specific user and day
router.get("/user/:userId/workout/day/:day/exercises", async (req, res) => {
  try {
    const { userId, day } = req.params;

    // Fetch exercises data from the database based on userId and day
    const exercises = await Exercise.findAll({
      where: {
        userId,
        day,
      },
    });

    // Return the exercises data as JSON response
    res.json(exercises);
  } catch (error) {
    console.error("Error fetching exercises:", error);
    // Handle the error, e.g., return an error response to the client
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/exercises/bulk", async (req, res) => {
  try {
    const exercises = req.body;

    // Create the exercises in the database
    const createdExercises = await Exercise.bulkCreate(exercises);

    // Return the newly created exercises as JSON response
    res.status(201).json(createdExercises);
  } catch (error) {
    console.error("Error creating exercises:", error);
    // Handle the error, e.g., return an error response to the client
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new exercise
router.post("/exercises", async (req, res) => {
  try {
    const {
      userId,
      day,
      name,
      type,
      muscle,
      equipment,
      difficulty,
      instructions,
      workoutId,
    } = req.body;

    // Create the exercise in the database
    const exercise = await Exercise.create({
      userId,
      day,
      name,
      type,
      muscle,
      equipment,
      difficulty,
      instructions,
      workoutId,
    });

    // Return the newly created exercise as JSON response
    res.status(201).json(exercise);
  } catch (error) {
    console.error("Error creating exercise:", error);
    // Handle the error, e.g., return an error response to the client
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update an existing exercise
router.put("/exercises/:exerciseId", async (req, res) => {
  try {
    const { exerciseId } = req.params;
    const { name, type, muscle, equipment, difficulty, instructions } =
      req.body;

    // Find the exercise in the database
    const exercise = await Exercise.findByPk(exerciseId);

    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }

    // Update the exercise in the database
    exercise.name = name;
    exercise.type = type;
    exercise.muscle = muscle;
    exercise.equipment = equipment;
    exercise.difficulty = difficulty;
    exercise.instructions = instructions;

    await exercise.save();

    // Return the updated exercise as JSON response
    res.json(exercise);
  } catch (error) {
    console.error("Error updating exercise:", error);
    // Handle the error, e.g., return an error response to the client
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete an exercise
router.delete("/exercises/:exerciseId", async (req, res) => {
  try {
    const { exerciseId } = req.params;

    // Find the exercise in the database
    const exercise = await Exercise.findByPk(exerciseId);

    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }

    // Delete the exercise from the database
    await exercise.destroy();

    // Return a success message as JSON response
    res.json({ message: "Exercise deleted successfully" });
  } catch (error) {
    console.error("Error deleting exercise:", error);
    // Handle the error, e.g., return an error response to the client
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
