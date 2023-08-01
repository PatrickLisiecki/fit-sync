import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import AuthProvider from "./contexts/AuthContext";
import "./index.css";
import Auth from "./routes/Auth/Auth";
import Dashboard from "./routes/Dashboard/Dashboard";
import Home from "./routes/Home/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import WorkoutExercises from "./routes/Workouts/WorkoutExercises";
import WorkoutPlan from "./routes/Workouts/WorkoutPlan";

import WorkoutList from "./routes/workoutlist";

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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
