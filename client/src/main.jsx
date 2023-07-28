import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import "./index.css";
import Auth from "./routes/Auth/Auth";
import ErrorPage from "./routes/ErrorPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./routes/Dashboard/Dashboard";
import WorkoutList from "./routes/workoutlist";
import Root from "./routes/Root";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
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
