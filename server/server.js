const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth");
const { Workout, User, Exercise } = require("./models"); // Import the User model

const { authenticateUser } = require("./middleware/authMiddleware");
const port = 4000;

const app = express();

app.use(express.json());
app.use(cors()); // Add this line
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, // 1 hour
    },
  })
);
app.use("/api/auth", authRouter);

// GET /api/days/:day/workouts
app.get("/days/:day/workouts", async (req, res) => {
  const day = req.params.day;

  try {
    // Find workouts for the specified day
    const workouts = await Workout.findAll({
      where: { day }, // Filter workouts by the specified day
      include: Exercise, // Include associated exercises for each workout
    });

    res.json(workouts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/workoutPlan/:workoutId/exercises
app.get("/workoutPlan/:workoutId/exercises", async (req, res) => {
  const workoutId = parseInt(req.params.workoutId, 10);

  try {
    // Find exercises for the specified workout
    const exercises = await Exercise.findAll({
      where: { workoutId },
    });

    res.json(exercises);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/users/:userId/workouts", async (req, res) => {
  const targetId = parseInt(req.params.userId, 10);

  try {
    const user = await User.findByPk(targetId, {
      include: Workout, // Remove include: Exercise
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const workouts = user.Workouts;

    res.json(workouts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
