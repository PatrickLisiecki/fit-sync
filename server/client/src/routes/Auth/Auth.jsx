import { useContext, useState } from "react";
import { Form, Navigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

// Icons
import {
  faEnvelope,
  faEye,
  faLock,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Auth() {
  const { currentUser, login, signup, authError } = useContext(AuthContext);
  const [byLogin, setByLogin] = useState(true);
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [errors, setErrors] = useState({});

  // Redirect if user is already logged in
  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  // Toggle isShown state
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  // Handle form submission for login
  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const credentials = Object.fromEntries(formData);
    await login(credentials);
  };

  // Handle form submission for signup
  const handleSignup = async (event) => {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);
    const credentials = Object.fromEntries(formData);

    // Clear previous errors
    setErrors({});

    // Perform validation checks
    const newErrors = {};

    // Check if any of the required fields are empty
    if (!credentials.username || !credentials.email || !credentials.password) {
      // Add error message
      newErrors.allFields = "All fields are required";
      console.error("All fields are required");
    }
    if (credentials.password != confirmedPassword) {
      // Add error message
      newErrors.passwordMatch = "Passwords do not match";
      console.error("Passwords do not match");
    }
    if (credentials.password.length < 3) {
      newErrors.password = "Password is too short";
      console.error("Password is too short");
    }
    if (credentials.username.length > 16) {
      newErrors.username = "Username is too long";
      console.error("Username is too long");
    }

    // Check for existing errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await signup(credentials);
  };

  return (
    <div className="min-h-screen w-full bg-primary bg-sprinkle bg-cover">
      <div className="w-full px-6 sm:px-24">
        {/* Header and close button */}
        <div className="flex w-full items-center justify-between py-[20px]">
          <Link to="/" className="h3 mb-0 uppercase tracking-wider text-white">
            Flex <span className="text-accent">Fusion</span>
          </Link>
          <Link
            to="/"
            className="grid h-[50px] w-[50px] place-items-center rounded-full bg-none text-white transition-all duration-300 hover:bg-secondary hover:text-accent"
          >
            <FontAwesomeIcon icon={faXmark} size="xl" />
          </Link>
        </div>

        {/* Nav links */}
        <div className="flex w-full items-center justify-center gap-x-5">
          <button
            onClick={() => {
              setByLogin(true);
            }}
          >
            <span
              className={`${
                byLogin
                  ? "border-b-2 border-accent text-accent"
                  : "text-white hover:text-accent"
              } pb-[0.2rem] text-sm font-[700] uppercase tracking-wider`}
            >
              Sign In
            </span>
          </button>

          <button
            onClick={() => {
              setByLogin(false);
            }}
          >
            <span
              className={`${
                byLogin
                  ? "text-white hover:text-accent"
                  : "border-b-2 border-accent text-accent"
              } pb-[0.2rem] text-sm font-[700] uppercase tracking-wider`}
            >
              Sign Up
            </span>
          </button>
        </div>

        <div className="flex w-full flex-col items-center justify-center py-[50px]">
          {/* Sign in and sign up form */}
          <div className="w-full max-w-[560px]">
            <div className="mx-auto w-full max-w-[340px]">
              {/* Form header */}
              <div className="mb-[30px] w-full text-center">
                <span className="h3 text-white">
                  {byLogin ? "Sign in to your account" : "Create a new account"}
                </span>
              </div>

              {/* Form */}
              <Form
                method="post"
                onSubmit={byLogin ? handleLogin : handleSignup}
                className="flex flex-col items-center justify-center"
              >
                {/* Login error message */}
                {authError && (
                  <div className="mb-2 text-center text-sm font-semibold uppercase text-red-500">
                    {authError}
                  </div>
                )}

                {/* Missing fields error message */}
                {errors.allFields && (
                  <div className="mb-2 text-center text-sm font-semibold uppercase text-red-500">
                    {errors.allFields}
                  </div>
                )}

                {/* Error message for long username */}
                {errors.username && (
                  <div className="mb-2 text-center text-sm font-semibold uppercase text-red-500">
                    {errors.username}
                  </div>
                )}

                {/* Error message for short password */}
                {errors.password && (
                  <div className="mb-2 text-center text-sm font-semibold uppercase text-red-500">
                    {errors.password}
                  </div>
                )}

                {/* Error message for non-matching passwords */}
                {errors.passwordMatch && (
                  <div className="mb-2 text-center text-sm font-semibold uppercase text-red-500">
                    {errors.passwordMatch}
                  </div>
                )}

                {/* Username Field */}
                <fieldset className="mb-4 w-full">
                  <div className="relative">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Username"
                      className="block w-full cursor-text rounded border border-gray-500 bg-primary py-3 pl-10 pr-3 text-sm text-white transition-all duration-200 placeholder:text-[#747778] focus:outline-none"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 transform text-white">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                  </div>
                </fieldset>

                {/* Email Field */}
                {!byLogin ? (
                  <fieldset className="mb-4 w-full">
                    <div className="relative">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        className="block w-full cursor-text rounded border border-gray-500 bg-primary py-3 pl-10 pr-3 text-sm text-white transition-all duration-200 placeholder:text-[#747778] focus:outline-none"
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 transform text-white">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                    </div>
                  </fieldset>
                ) : (
                  <></>
                )}

                {/* Password Field */}
                <fieldset className={`${byLogin ? "mb-0" : "mb-4"} w-full`}>
                  <div className="relative">
                    <input
                      type={passwordShown ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Password"
                      className="block w-full cursor-text rounded border border-gray-500 bg-primary px-10 py-3 text-sm text-white transition-all duration-200 placeholder:text-[#747778] focus:outline-none"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 transform text-white">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <button
                      type="button"
                      onClick={togglePassword}
                      className={`${
                        passwordShown
                          ? "text-accent hover:text-accent/90"
                          : "text-white hover:text-accent"
                      } absolute right-3 top-1/2 -translate-y-1/2 
                      transform transition-all duration-200`}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </div>
                </fieldset>

                {byLogin ? (
                  <div className="mb-[40px] w-full p-0 text-left">
                    <span className="cursor-pointer text-[10px] uppercase tracking-[1.6px] text-white transition-all duration-300 hover:text-accent">
                      Forgot your password?
                    </span>
                  </div>
                ) : (
                  <></>
                )}

                {/* Confirm Password Field */}
                {!byLogin ? (
                  <fieldset className="mb-[40px] w-full">
                    <div className="relative">
                      <input
                        type={passwordShown ? "text" : "password"}
                        name="confirmedPassword"
                        id="confirmedPassword"
                        placeholder="Confirm password"
                        value={confirmedPassword}
                        onChange={(e) => {
                          setConfirmedPassword(e.target.value);
                        }}
                        className="block w-full cursor-text rounded border border-gray-500 bg-primary px-10 py-3 text-sm text-white transition-all duration-200 placeholder:text-[#747778] focus:outline-none"
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 transform text-white">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                    </div>
                  </fieldset>
                ) : (
                  <></>
                )}

                {/* Submit button */}
                <fieldset className="w-full">
                  <button
                    type="submit"
                    className="flex h-[65px] w-full items-center justify-center rounded bg-accent text-[12px] font-[700] uppercase text-white transition-all duration-300 hover:bg-[#ffae1a]"
                  >
                    {byLogin ? "Sign in" : "Create account"}
                  </button>
                </fieldset>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
