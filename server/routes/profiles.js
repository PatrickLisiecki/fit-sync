const express = require("express");
const router = express.Router();
const { UserProfile } = require("../models"); // Assuming you have the Sets model defined
const { authenticateUser } = require("../middleware/authMiddleware");

router.post("/", authenticateUser, async (req, res) => {
  try {
    const userProfile = await UserProfile.create(req.body);
    res.status(201).json(userProfile);
  } catch (error) {
    console.error("Error creating user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Read user profile by user ID
router.get("/:userId", authenticateUser, async (req, res) => {
  try {
    const userId = req.params.userId;
    const userProfile = await UserProfile.findOne({
      where: { userId },
    });

    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    res.json(userProfile);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update user profile by user ID
router.put("/:userId", authenticateUser, async (req, res) => {
  try {
    const userId = req.params.userId;
    const userProfile = await UserProfile.findOne({
      where: { userId },
    });

    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    await userProfile.update(req.body);
    res.json(userProfile);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
