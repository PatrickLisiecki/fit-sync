const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authMiddleware");
const { ForbiddenError, NotFoundError } = require("../errors");
const { User, Exercise } = require("../models");

const getExercise = async (id) => {
  const Exercise = await Exercise.findByPk(parseInt(id, 10));
  if (!Exercise) {
    throw new NotFoundError("Exercise not found");
  }
  return Exercise;
};

const authorizeEdit = (session, Exercise) => {
  if (parseInt(session.userId, 10) !== Exercise.UserId) {
    throw new ForbiddenError("You are not authorized to edit this Exercise");
  }
};

const authorizeDelete = (session, Exercise) => {
  if (parseInt(session.userId, 10) !== Exercise.UserId) {
    throw new ForbiddenError("You are not authorized to delete this job");
  }
};

// Read all exercises for a specific user
router.get("/:userId", authenticateUser, async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch exercises data from the database based on userId
    const exercises = await Exercise.findAll({
      where: {
        userId,
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

// Read all exercises for a specific user and day
router.get("/:userId/:workoutId/:week/:day", authenticateUser, async (req, res) => {
  try {
    const { userId, day, week, workoutId } = req.params;

    // Fetch exercises data from the database based on userId and day
    const exercises = await Exercise.findAll({
      where: {
        userId,
        day,
        week,
        workoutId,
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

// Create a new exercise
router.post("/", authenticateUser, async (req, res) => {
  try {
    const { userId, day, name, type, muscle, equipment, difficulty, details, workoutId, week } =
      req.body;

    // Create the exercise in the database
    const exercise = await Exercise.create({
      userId,
      day,
      name,
      type,
      muscle,
      equipment,
      difficulty,
      details,
      workoutId,
      week,
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
router.put("/:exerciseId", authenticateUser, async (req, res) => {
  try {
    const { exerciseId } = req.params;
    const { name, type, muscle, equipment, difficulty, details } = req.body;

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
    exercise.details = details;

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
router.delete("/:exerciseId", authenticateUser, async (req, res) => {
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
