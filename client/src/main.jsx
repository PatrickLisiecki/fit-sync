/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import "./index.css";

// Authentication and authorization
import Auth from "./routes/Auth/Auth";
import AuthProvider from "./contexts/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

// Home components
import Home from "./routes/Home/Home";
import LandingPage from "./routes/Home/LandingPage";
import About from "./routes/Home/About";
import Contact from "./routes/Home/Contact";
import PrivacyPolicy from "./routes/Home/PrivacyPolicy";

// Dashboard components
import Dashboard from "./routes/Dashboard/Dashboard";
import WorkoutExercises from "./routes/Workouts/WorkoutExercises";
import WorkoutPlan from "./routes/Workouts/WorkoutPlan";
import NutritionPage from "./routes/Nutrition/NutritionPage";

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
        path: "/dashboard/workouts/:day",
        element: (
          <ProtectedRoute>
            <WorkoutExercises />
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
