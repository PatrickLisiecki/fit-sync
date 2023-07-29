const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth");
const models = require("./models");

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

app.get("/users/:userId/workouts", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Received request for user with ID:", userId);

    // Get the date of the upcoming Monday
    const mondayDate = moment().isoWeekday(1).format("YYYY-MM-DD");

    const user = await models.User.findByPk(userId, {
      include: {
        model: models.Workout,
        include: models.Exercise,
        where: {
          date: "monday", // Use the upcoming Monday's date in the query
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Workouts:", user.Workouts);

    // Extract exercises for each workout
    const workoutsWithExercises = user.Workouts.map((workout) => {
      const exercises = workout.getExercises(); // Get associated exercises for the workout
      return {
        ...workout.toJSON(),
        exercises,
      };
    });

    res.json(workoutsWithExercises);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
