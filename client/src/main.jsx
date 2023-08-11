import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import "./index.css";

// Authentication and authorization
import AuthProvider from "./contexts/AuthContext";
import Auth from "./routes/Auth/Auth";
import ProtectedRoute from "./routes/ProtectedRoute";

// Home components
import About from "./routes/Home/About";
import Contact from "./routes/Home/Contact";
import Home from "./routes/Home/Home";
import LandingPage from "./routes/Home/LandingPage";
import PrivacyPolicy from "./routes/Home/PrivacyPolicy";

// Dashboard components
import Dashboard from "./routes/Dashboard/Dashboard";
import DashboardHome from "./routes/Dashboard/DashboardHome";
import Progress from "./routes/Progress/Progress";
import ExerciseLog from "./routes/Progress/ExerciseLog";
import NutritionPage from "./routes/Nutrition/NutritionPage";
import Profile from "./routes/Profile/Profile";
import WorkoutExercises from "./routes/Workouts/WorkoutExercises";
import WorkoutPlan from "./routes/Workouts/WorkoutPlan";
import Quiz from "./routes/AI/Quiz";

import { ExerciseContextProvider } from "./contexts/ExerciseContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/policy",
        element: <PrivacyPolicy />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth",
    element: <Auth />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <DashboardHome />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/workouts",
        element: (
          <ProtectedRoute>
            <WorkoutPlan />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/progress",
        element: (
          <ProtectedRoute>
            <Progress />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/progress/:exerciseId",
        element: (
          <ProtectedRoute>
            <ExerciseLog />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/nutrition",
        element: (
          <ProtectedRoute>
            <NutritionPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/workouts/:workoutId/week/:week/:day",
        element: (
          <ProtectedRoute>
            <ExerciseContextProvider>
              <WorkoutExercises />
            </ExerciseContextProvider>
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/ai",
        element: (
          <ProtectedRoute>
            <Quiz />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
