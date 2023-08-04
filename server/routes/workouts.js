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

// Route handler for /user/:userId/workout
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch the workout plan data from the database based on the userId
    const workoutPlan = await Workout.findAll({
      where: {
        userId: userId,
      },
    });

    // Check if the workout plan data was found
    if (!workoutPlan || workoutPlan.length === 0) {
      return res.status(404).json({ error: "Workout plan not found" });
    }

    // If the workout plan data was found, send it in the response
    return res.json(workoutPlan);
  } catch (error) {
    console.error("Error fetching workout plan:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name } = req.body; // Assuming you have a name and description for the new workout

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

// Route handler for /user/:userId/workouts
router.get("/user/:userId/workouts", async (req, res) => {
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

// Route handler for /user/:userId/workouts/:workoutId/exercises/:day
router.get(
  "/user/:userId/workouts/:workoutId/exercises/:day",
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const workoutId = req.params.workoutId;
      const day = req.params.day;

      // Fetch exercises for a specific workout on a given day from the database
      const exercises = await Exercise.findAll({
        where: {
          userId: userId,
          workoutId: workoutId,
          day: day,
        },
      });

      return res.json(exercises);
    } catch (error) {
      console.error("Error fetching exercises:", error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
);

module.exports = router;
