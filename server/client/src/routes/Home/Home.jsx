import { useState, useEffect } from "react";

// Components
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Outlet
import { Outlet } from "react-router-dom";

// Material Tailwind
import { Tooltip } from "@material-tailwind/react";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export default function Root() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Toggle dark mode
  useEffect(() => {
    // Apply the selected mode's class to the root HTML element
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <main className="relative">
      <Navbar />
      <section className="bg-white pt-24 text-primary dark:bg-secondary dark:text-white">
        <Outlet />
      </section>
      <Footer />

      {/* Light/Dark mode button */}
      <Tooltip
        content={darkMode ? "Light Mode" : "Dark Mode"}
        placement="top"
        className="bg-secondary font-poppins text-sm text-white dark:bg-black"
      >
        <button
          onClick={toggleDarkMode}
          className={`${
            darkMode ? "hover:text-accent" : "hover:text-blue-800"
          } fixed bottom-8 right-8 z-[999] flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white shadow-xl transition-all duration-300`}
        >
          {darkMode ? (
            <FontAwesomeIcon
              icon={faSun}
              size="lg"
              className="hover:text-accent"
            />
          ) : (
            <FontAwesomeIcon
              icon={faMoon}
              size="lg"
              className="hover:text-blue-800"
            />
          )}
        </button>
      </Tooltip>
    </main>
  );
}
