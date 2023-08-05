/* eslint-disable no-unused-vars */
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
import PrivacyPolicy from "./routes/Home/PrivacyPolicy";

// Dashboard components
import Dashboard from "./routes/Dashboard/Dashboard";
import NutritionPage from "./routes/Nutrition/NutritionPage";
import WorkoutExercises from "./routes/Workouts/WorkoutExercises";
import WorkoutPlan from "./routes/Workouts/WorkoutPlan";
import WorkoutList from "./routes/Workouts/workoutList";

import { ExerciseContextProvider } from "./contexts/ExerciseContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
        path: "/dashboard/nutrition",
        element: (
          <ProtectedRoute>
            <NutritionPage />
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
        errorElement: <ErrorPage />,
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
        errorElement: <ErrorPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contact",
    element: <Contact />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/policy",
    element: <PrivacyPolicy />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
