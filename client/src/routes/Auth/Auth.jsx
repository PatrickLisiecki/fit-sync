import { useContext, useState } from "react";
import { Form, Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

// Icons
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Auth() {
    const { currentUser, login, signup, authError } = useContext(AuthContext);
    const [byLogin, setByLogin] = useState(true);

    // Redirect if user is already logged in
    if (currentUser) {
        return <Navigate to="/dashboard" />;
    }

    // Handle form submission for login
    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const credentials = Object.fromEntries(formData);
        await login(credentials);
    };

    // Handle form submission for signup
    const handleSignup = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const credentials = Object.fromEntries(formData);

        // Check if any of the required fields are empty
        if (!credentials.username || !credentials.email || !credentials.password) {
            // Show an error message or set a state to display an error message
            console.error("All fields are required");
            return;
        }

        await signup(credentials);
    };

    return (
        <section className="w-full min-h-screen flex justify-center items-center bg-gray-200">
            <div className="w-full container mx-auto flex flex-col items-center justify-center">
                {/* Header */}
                {/* <div className="text-[32px] font-semibold uppercase flex items-center mb-2 text-teal-400">
                    Flex Fusion
                </div> */}

                {/* Login Form */}
                <div
                    className={`${
                        byLogin ? "block" : "hidden"
                    } min-w-[300px] md:min-w-[500px] bg-white rounded-lg p-10 shadow-bs`}
                >
                    {/* Form Header */}
                    <div className="w-full text-left mb-4">
                        <span className="h3 uppercase  text-accent">Login</span>
                    </div>

                    {/* Form */}
                    <Form
                        className="flex flex-col justify-center items-center gap-y-6"
                        method="post"
                        onSubmit={handleLogin}
                    >
                        {/* Username Field */}
                        <fieldset className="w-full">
                            {authError && <div className="text-red-500">{authError}</div>}
                            <label
                                htmlFor="username"
                                className="block text-sm font-semibold uppercase text-primary"
                            >
                                Username
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Username"
                                    className="block w-full rounded-md pl-10 pr-3 py-3 text-sm focus:outline-none bg-white border border-gray-200 text-primary"
                                    required=""
                                />
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary">
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                            </div>
                        </fieldset>

                        {/* Password Field */}
                        <fieldset className="w-full">
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold uppercase text-primary"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    className="block w-full rounded-md pl-10 pr-3 py-3 text-sm focus:outline-none bg-white border border-gray-200 text-primary"
                                    required=""
                                />
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary">
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                            </div>
                        </fieldset>

                        {/* Login Button */}
                        <fieldset className="w-full">
                            <button
                                type="submit"
                                className="w-full rounded-md px-4 py-3 text-sm uppercase font-bold text-white bg-gray-700 hover:bg-gray-600"
                            >
                                Sign in
                            </button>
                        </fieldset>

                        {/* Create Account Button */}
                        <div className="text-sm font-semibold text-primary">
                            Don’t have an account?{" "}
                            <span
                                className="text-sm cursor-pointer text-blue-500 hover:underline"
                                onClick={() => setByLogin(!byLogin)}
                            >
                                Sign up
                            </span>
                        </div>
                    </Form>
                </div>

                {/* Signup Form */}
                <div
                    className={`${
                        byLogin ? "hidden" : "block"
                    } min-w-[300px] md:min-w-[500px] bg-white rounded-lg p-10 shadow-bs`}
                >
                    {/* Form Header */}
                    <div className="w-full text-left mb-4">
                        <span className="h3 uppercase  text-accent">Sign Up</span>
                    </div>

                    {/* Form */}
                    <Form
                        className="flex flex-col justify-center items-center gap-y-6"
                        method="post"
                        onSubmit={handleSignup}
                    >
                        {/* Username Field */}
                        <fieldset className="w-full">
                            {authError && <div className="text-red-500">{authError}</div>}
                            <label
                                htmlFor="username"
                                className="block text-sm font-semibold uppercase text-primary"
                            >
                                Username
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Username"
                                    className="block w-full rounded-md pl-10 pr-3 py-3 text-sm focus:outline-none bg-white border border-gray-200 text-primary"
                                    required=""
                                />
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary">
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                            </div>
                        </fieldset>

                        {/* Email Field */}
                        <fieldset className="w-full">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold uppercase text-primary"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="email@domain.com"
                                    className="block w-full rounded-md pl-10 pr-3 py-3 text-sm focus:outline-none bg-white border border-gray-200 text-primary"
                                    required=""
                                />
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                            </div>
                        </fieldset>

                        {/* Password Field */}
                        <fieldset className="w-full">
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold uppercase text-primary"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className="block w-full rounded-md pl-10 pr-3 py-3 text-sm focus:outline-none bg-white border border-gray-200 text-primary"
                                    required=""
                                />
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary">
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                            </div>
                        </fieldset>

                        {/* Login Button */}
                        <fieldset className="w-full">
                            <button
                                type="submit"
                                className="w-full rounded-md px-4 py-3 text-sm uppercase font-bold text-white bg-gray-700 hover:bg-gray-600"
                            >
                                Sign up
                            </button>
                        </fieldset>

                        {/* Create Account Button */}
                        <div className="text-sm font-semibold text-primary">
                            Already have an account?{" "}
                            <span
                                className="cursor-pointer text-blue-500 hover:underline"
                                onClick={() => setByLogin(!byLogin)}
                            >
                                Log in
                            </span>
                        </div>
                    </Form>
                </div>
            </div>
        </section>
    );
}
