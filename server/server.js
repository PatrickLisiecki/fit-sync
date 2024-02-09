const express = require("express");
const app = express();
const port = 4000;
const session = require("express-session");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const authRouter = require("./routes/auth");
const exercisesRouter = require("./routes/exercises");
const workoutRouter = require("./routes/workouts");
const setsRouter = require("./routes/sets");
const AIworkoutsRouter = require("./routes/aiworkouts");
const externalRouter = require("./routes/external");

const {
  forbiddenErrorHandler,
  notFoundErrorHandler,
} = require("./middleware/errorHandlers");

app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true, // Allow cookies and authentication headers to be sent with the request
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl}`);
  res.on("finish", () => {
    console.log(`Response Status: ${res.statusCode}`);
  });
  next();
});

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, // 1 hour
    },
  }),
);

app.use(forbiddenErrorHandler);
app.use(notFoundErrorHandler);

app.use("/api/auth", authRouter);
app.use("/api/exercises", exercisesRouter);
app.use("/api/workouts", workoutRouter);
app.use("/api/sets", setsRouter);
app.use("/api/aiworkouts", AIworkoutsRouter);
app.use("/api/external", externalRouter);

app.use(express.static(path.join(__dirname, "client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
