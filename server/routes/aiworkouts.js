const express = require("express");
const router = express.Router();
const { AIworkout } = require("../models");
const { authenticateUser } = require("../middleware/authMiddleware");

// Create AI workout
router.post("/", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { workout } = req.body;

    const createdAIworkout = await AIworkout.create({
      userId,
      workout,
    });

    res.status(201).json(createdAIworkout);
  } catch (error) {
    console.error("Error creating AI workout:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Read AI workout by user ID
router.get("/:userId", authenticateUser, async (req, res) => {
  try {
    const userId = req.params.userId;

    const aiWorkouts = await AIworkout.findAll({
      where: { userId },
    });

    res.json(aiWorkouts);
  } catch (error) {
    console.error("Error fetching AI workouts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update AI workout by user ID
router.put("/:userId", authenticateUser, async (req, res) => {
  try {
    const userId = req.params.userId;
    const { workout } = req.body;

    const aiWorkouts = await AIworkout.findAll({
      where: { userId },
    });

    if (!aiWorkouts.length) {
      return res.status(404).json({ error: "AI workouts not found" });
    }

    await Promise.all(
      aiWorkouts.map(async (aiWorkout) => {
        await aiWorkout.update({ workout });
      })
    );

    res.json(aiWorkouts);
  } catch (error) {
    console.error("Error updating AI workouts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete AI workout by user ID
router.delete("/:userId", authenticateUser, async (req, res) => {
  try {
    const userId = req.params.userId;

    const aiWorkouts = await AIworkout.findAll({
      where: { userId },
    });

    if (!aiWorkouts.length) {
      return res.status(404).json({ error: "AI workouts not found" });
    }

    await Promise.all(
      aiWorkouts.map(async (aiWorkout) => {
        await aiWorkout.destroy();
      })
    );

    res.json({ message: "AI workouts deleted successfully" });
  } catch (error) {
    console.error("Error deleting AI workouts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
