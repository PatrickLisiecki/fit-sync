const express = require("express");
const router = express.Router();
const { User, Exercise, Workout } = require("../models");
const workout = require("../models/workout");

router.get("/current_user", async (req, res) => {
  if (req.session.userId) {
    const user = await User.findByPk(req.session.userId);
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } else {
    return res.status(401).json({ user: null });
  }
});

// Route handler for getting all workouts for a specific user
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch all workouts for the current user from the database
    const workouts = await Workout.findAll({
      where: {
        userId: userId,
      },
    });

    return res.json(workouts);
  } catch (error) {
    console.error("Error fetching user's workouts:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// Route handler for creating a new workout
router.post("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name } = req.body; // Assuming you have a name for the new workout

    // Create the new workout in the database
    const newWorkout = await Workout.create({
      name: name,
      userId: userId,
    });

    return res.status(201).json(newWorkout);
  } catch (error) {
    console.error("Error creating new workout:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// Route handler for updating a workout
router.put("/:workoutId", async (req, res) => {
  try {
    const workoutId = req.params.workoutId;
    const { name } = req.body; // Assuming you have a name for updating the workout

    // Find the workout in the database
    const workout = await Workout.findByPk(workoutId);

    // If the workout is not found, return an error
    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    // Update the workout's name and save it to the database
    workout.name = name;
    await workout.save();

    return res.status(200).json(workout);
  } catch (error) {
    console.error("Error updating workout:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// Route handler for deleting a workout
router.delete("/:workoutId", async (req, res) => {
  try {
    const workoutId = req.params.workoutId;

    // Find the workout in the database
    const workout = await Workout.findByPk(workoutId);

    // If the workout is not found, return an error
    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    // Delete the workout from the database
    await workout.destroy();

    return res.status(200).json({ message: "Workout deleted successfully" });
  } catch (error) {
    console.error("Error deleting workout:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
