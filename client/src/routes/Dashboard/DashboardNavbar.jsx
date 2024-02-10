/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from "react";
import { Link, Form, redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

// Material Tailwind
import { Tooltip } from "@material-tailwind/react";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircleUser,
  faHouse,
  faSun,
  faChevronDown,
  faMoon,
  faXmark,
  faGear,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

// Nav links
const navData = [
  {
    title: "Home",
    link: "/",
    icon: <FontAwesomeIcon icon={faHouse} />,
  },
];

export default function DashboardNavbar({ toggleSidebar, isExpanded }) {
  const { currentUser, logout } = useContext(AuthContext);

  const [darkMode, setDarkMode] = useState(true);
  const [profileView, setProfileView] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleProfileView = () => {
    setProfileView(!profileView);
  };

  // Toggle dark mode
  useEffect(() => {
    // Apply the selected mode's class to the root HTML element
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    redirect("/auth");
  };

  return (
    <nav
      className={`${
        isExpanded ? "pl-0 md:pl-[250px]" : ""
      } shadow-bs max-h-[100px] min-h-[60px] w-full bg-white p-[8px] transition-all duration-500 dark:bg-primary dark:text-white sm:p-4`}
    >
      <div className="flex h-full w-full flex-row items-center justify-between px-0 sm:px-[24px]">
        {/* Toggle sidebar button */}
        <Tooltip
          content="Menu"
          placement="bottom"
          className="bg-secondary font-poppins text-sm text-white dark:bg-black"
        >
          <button
            className="grid h-[50px] w-[50px] place-items-center rounded-full transition-all duration-300 hover:bg-gray-200 hover:text-accent dark:hover:bg-secondary"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </Tooltip>

        {/* Nav links */}
        <div className="flex flex-row items-center justify-center">
          {/* Nav link */}
          {navData.map((item, index) => {
            return (
              <Tooltip
                key={index}
                content={item.title}
                placement="bottom"
                className="bg-secondary font-poppins text-sm text-white dark:bg-black"
              >
                <Link
                  to={item.link}
                  className="mx-2 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:bg-gray-200 hover:text-accent dark:hover:bg-secondary"
                >
                  {item.icon}
                </Link>
              </Tooltip>
            );
          })}

          {/* Dark mode toggle */}
          <Tooltip
            content={darkMode ? "Light Mode" : "Dark Mode"}
            placement="bottom"
            className="bg-secondary font-poppins text-sm text-white dark:bg-black"
          >
            <button
              onClick={toggleDarkMode}
              className={`${
                darkMode ? "hover:text-accent" : "hover:text-blue-800"
              } mx-2 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:bg-gray-200 dark:hover:bg-secondary`}
            >
              {darkMode ? (
                <FontAwesomeIcon icon={faSun} />
              ) : (
                <FontAwesomeIcon icon={faMoon} />
              )}
            </button>
          </Tooltip>

          <div className="relative mx-2">
            {/* User greeting */}
            <div
              onClick={toggleProfileView}
              className="mx-2 flex cursor-pointer flex-row items-center justify-center transition-all duration-300 hover:text-accent"
            >
              <FontAwesomeIcon icon={faCircleUser} />
              <div className="flex flex-row items-center justify-center gap-x-2 px-2 text-[16px]">
                <span className="hidden sm:block">Hi, </span>
                <span className="hidden font-semibold sm:block">
                  {currentUser.username}
                </span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="hidden h-[15px] w-[15px] sm:block"
                />
              </div>
            </div>

            {/* User profile menu */}
            <div
              className={`${
                profileView ? "block" : "hidden"
              } z-[999] absolute right-0 mt-2 flex min-w-[300px] flex-col rounded bg-gray-200 p-4 shadow-md dark:bg-gray-600 dark:text-white`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">User Profile</span>{" "}
                <button
                  onClick={() => setProfileView(false)}
                  className="grid h-[50px] w-[50px] place-items-center rounded-full bg-none transition-all duration-300 hover:bg-gray-300 hover:text-accent dark:hover:bg-secondary"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              <div className="flex flex-row items-center justify-start gap-x-4 border-b border-secondary px-6 py-3 dark:border-white">
                <div className="h-[100px] w-[100px] rounded-full">
                  {/* <FontAwesomeIcon icon={faCircleUser} size="4x" /> */}
                  <img
                    src="https://placebear.com/150/150"
                    alt="Avatar"
                    className="h-full w-full rounded-full border-2 border-white shadow-xl"
                  />
                </div>
                <div className="flex flex-col items-start gap-y-2">
                  <span className="text-xl font-semibold text-primary dark:text-white">
                    {currentUser.username}
                  </span>
                  <span className="text-sm text-primary dark:text-white">
                    {currentUser.email}
                  </span>
                </div>
              </div>

              {/* Profile link */}
              <div className="flex flex-row items-center justify-start gap-x-4 border-b border-secondary px-6 py-3 hover:bg-gray-300 dark:border-white dark:hover:bg-secondary">
                <div className="grid place-items-center rounded bg-gray-400 p-3">
                  <FontAwesomeIcon
                    icon={faGear}
                    size="xl"
                    className="text-white"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-bold tracking-wide text-primary dark:text-white">
                    My Profile
                  </span>
                  <span className="text-sm text-primary dark:text-white">
                    Your Info
                  </span>
                </div>
              </div>

              {/* Logout */}
              <div className="flex items-center justify-center pt-3">
                {currentUser && (
                  <Form
                    method="post"
                    onSubmit={handleLogout}
                    className="w-full"
                  >
                    <button
                      type="submit"
                      className="flex w-full flex-row items-center justify-center gap-x-4 rounded bg-red-500 p-3 hover:bg-red-500/90"
                    >
                      <FontAwesomeIcon
                        icon={faPowerOff}
                        className="text-white"
                      />
                      <span className="text-xl text-white">Logout</span>
                    </button>
                  </Form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
