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
import NutritionPage from "./routes/Nutrition/NutritionPage";
import WorkoutExercises from "./routes/Workouts/WorkoutExercises";
import WorkoutPlan from "./routes/Workouts/WorkoutPlan";

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
    ],
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
