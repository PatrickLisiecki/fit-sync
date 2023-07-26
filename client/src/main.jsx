import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import "./index.css";
import Login from "./routes/Auth/Login";
import Signup from "./routes/Auth/Signup";
import ErrorPage from "./routes/ErrorPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Root from "./routes/root";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Root />
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/signup",
        element: <Signup />,
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
