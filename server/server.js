const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth");
const exercisesRouter = require("./routes/exercises");
const workoutRouter = require("./routes/workouts");
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

app.use("/api/exercises", exercisesRouter);
app.use("/api/workout", workoutRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
