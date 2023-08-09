const express = require("express");
const router = express.Router();
const { Sets } = require("../models"); // Assuming you have the Sets model defined
const { authenticateUser } = require("../middleware/authMiddleware");

// Create a new set
router.post("/", authenticateUser, async (req, res, next) => {
  try {
    const { exerciseId, reps, weight, date } = req.body;
    const newSet = await Sets.create({ exerciseId, reps, weight, date });
    res.status(201).json(newSet);
  } catch (error) {
    next(error);
  }
});

// Get all sets
router.get("/", authenticateUser, async (req, res, next) => {
  try {
    const sets = await Sets.findAll();
    res.json(sets);
  } catch (error) {
    next(error);
  }
});

// Get all sets from an exercise
router.get("/:exerciseId", authenticateUser, async (req, res, next) => {
  try {
    const exerciseId = req.params.exerciseId;
    const sets = await Sets.findAll({ where: { exerciseId: exerciseId } });
    if (!sets) {
      return res.status(404).json({ message: "Sets not found" });
    }
    res.json(sets);
  } catch (error) {
    next(error);
  }
});

// Update a set by ID
router.put("/:id", authenticateUser, async (req, res, next) => {
  try {
    const setId = req.params.id;
    const { reps, weight, date } = req.body;
    const set = await Sets.findByPk(setId);
    if (!set) {
      return res.status(404).json({ message: "Set not found" });
    }
    await set.update({ reps, weight, date });
    res.json(set);
  } catch (error) {
    next(error);
  }
});

// Delete a set by ID
router.delete("/:id", authenticateUser, async (req, res, next) => {
  try {
    const setId = req.params.id;
    const set = await Sets.findByPk(setId);
    if (!set) {
      return res.status(404).json({ message: "Set not found" });
    }
    await set.destroy();
    res.json({ message: "Set deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
