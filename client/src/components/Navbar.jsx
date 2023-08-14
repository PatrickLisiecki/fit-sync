/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faRightToBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

// Nav links
const navData = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Contact",
    link: "/contact",
  },
  {
    title: "Dashboard",
    link: "/dashboard",
  },
];

export default function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    redirect("/");
  };

  return (
    <header className="fixed z-[100] max-h-[100px] w-full bg-primary p-8 shadow-md">
      <div className="flex flex-row items-center justify-between lg:container lg:mx-auto">
        {/* Name / Logo */}
        <Link to="/">
          <div className="flex flex-row items-center justify-center gap-x-2 text-[28px] uppercase md:text-3xl">
            <img src="/logo.png" alt="Logo" width={40} height={40} />
            <span className="text-white">Flex</span>{" "}
            <span className="text-accent">Fusion</span>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="hidden lg:block">
          <ul className="flex flex-row">
            {navData.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    to={item.link}
                    className="mx-4 text-white transition-all duration-300 hover:text-accent"
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
            <li>
              {currentUser ? (
                <button
                  onClick={handleLogout}
                  className="mx-4 text-white transition-all duration-300 hover:text-accent"
                >
                  <FontAwesomeIcon icon={faRightToBracket} flip="horizontal" />
                  <span className="ml-2">Log Out</span>
                </button>
              ) : (
                <Link
                  to="/auth"
                  className="mx-4 text-white transition-all duration-300 hover:text-accent"
                >
                  <FontAwesomeIcon icon={faRightToBracket} />
                  <span className="ml-2">Log In</span>
                </Link>
              )}
            </li>
          </ul>
        </nav>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="flex items-center justify-center text-white transition-all duration-300 hover:text-accent"
          >
            <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <nav
        className={`${
          isOpen ? "left-0 w-full" : "-left-32 w-0"
        } fixed top-0 z-[999] flex h-screen items-center justify-center bg-white duration-500 lg:hidden`}
      >
        <button
          onClick={toggleMenu}
          className="absolute right-[4rem] top-[2rem] z-[999] cursor-pointer text-primary transition-all duration-300 hover:text-accent"
        >
          <FontAwesomeIcon icon={faXmark} className="h-8 w-8" />
        </button>

        {/* Links for mobile menu */}
        <ul className="flex min-w-[150px] flex-col gap-y-8">
          {navData.map((item, index) => {
            return (
              <li
                key={index}
                onClick={toggleMenu}
                className="flex items-center justify-center"
              >
                <a
                  href={item.link}
                  className="text-2xl font-semibold transition-all duration-300 hover:text-accent"
                >
                  {item.title}
                </a>
              </li>
            );
          })}
          <li onClick={toggleMenu} className="flex items-center justify-center">
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="mx-4 text-2xl font-semibold transition-all duration-300 hover:text-accent"
              >
                <FontAwesomeIcon icon={faRightToBracket} flip="horizontal" />
                <span className="ml-2">Log Out</span>
              </button>
            ) : (
              <Link
                to="/auth"
                className="mx-4 text-2xl font-semibold transition-all duration-300 hover:text-accent"
              >
                <FontAwesomeIcon icon={faRightToBracket} />
                <span className="ml-2">Log In</span>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
