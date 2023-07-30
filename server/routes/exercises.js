const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { Exercise } = require("../models");

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

module.exports = router;
