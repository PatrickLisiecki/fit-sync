const express = require("express");
const router = express.Router();
const { User, Exercise } = require("../models");

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
router.get("/user/:userId/workout", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch the workout plan data from the database based on the userId
    const workoutPlan = await Exercise.findAll({
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

module.exports = router;
