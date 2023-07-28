// import { useContext } from "react";
// import { Form, redirect } from "react-router-dom";
// import { AuthContext } from "../contexts/AuthContext";
export default function Root() {
    // const { currentUser, logout } = useContext(AuthContext);

    // const handleLogout = (e) => {
    //     e.preventDefault();

    //     logout();

    //     redirect("/auth");
    // };

    return (
        <div className="w-full min-h-screen flex flex-row justify-start">
            <span className="text-2xl font-bold text-gray-800">Homepage</span>
        </div>
    );
}
