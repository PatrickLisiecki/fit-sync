/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import PrivacyPolicy from "./components/PrivacyPolicy";
import AuthProvider from "./contexts/AuthContext";
import "./index.css";
import About from "./routes/About";
import Auth from "./routes/Auth/Auth";
import Contact from "./routes/Contact";
import Dashboard from "./routes/Dashboard/Dashboard";
import Home from "./routes/Home/Home";
import NutritionPage from "./routes/Nutrition/NutritionPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import WorkoutExercises from "./routes/Workouts/WorkoutExercises";
import WorkoutPlan from "./routes/Workouts/WorkoutPlan";
import WorkoutList from "./routes/Workouts/workoutList";

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
    ],
    errorElement: <ErrorPage />,
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
    path: "dashboard/workouts/:day",
    element: (
      <ProtectedRoute>
        <WorkoutExercises />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/ninja",
    element: <WorkoutList />,
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
