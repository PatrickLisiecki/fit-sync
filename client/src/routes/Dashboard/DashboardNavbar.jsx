/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useState } from "react";
import { Link } from "react-router-dom";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faBars,
    faMagnifyingGlass,
    faRightToBracket,
    faXmark,
    faCircleLeft,
    faCircleUser,
    faHouse,
    faBell,
    faSun,
} from "@fortawesome/free-solid-svg-icons";

// Nav links
const navData = [
    {
        title: "Home",
        link: "/",
        icon: <FontAwesomeIcon icon={faHouse} size="xl" />,
    },
    {
        title: "Notifications",
        link: "/",
        icon: <FontAwesomeIcon icon={faBell} size="xl" />,
    },
    {
        title: "User",
        link: "/",
        icon: <FontAwesomeIcon icon={faCircleUser} size="xl" />,
    },
    {
        title: "Mode",
        link: "/",
        icon: <FontAwesomeIcon icon={faSun} size="xl" />,
    },
];

export default function Navbar({ toggleSidebar, isExpanded }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isRotated, setRotated] = useState(false);

    const handleRotate = () => {
        setRotated(!isRotated);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav
            className={`${
                isExpanded ? "pl-[200px] lg:pl-[250px]" : "pl-0"
            } w-full max-h-[100px] bg-white shadow-bs p-4 transition-all duration-500 overflow-hidden`}
        >
            <div className="container mx-auto flex flex-row justify-start xs:justify-between items-center">
                {/* Sidebar button */}
                <button
                    className={`${
                        isRotated ? "rotate-180" : "rotate-0"
                    } p-2 flex justify-center items-center transition-all duration-500`}
                    onClick={() => {
                        toggleSidebar();
                        handleRotate();
                    }}
                >
                    <FontAwesomeIcon icon={faCircleLeft} size="xl" />
                </button>

                {/* Search bar */}
                <form className="hidden lg:block min-w-[250px] md:min-w-[400px] lg:min-w-[600px]">
                    <label
                        htmlFor="search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                        Search
                    </label>
                    <div className="relative">
                        <input
                            type="search"
                            id="search"
                            className="block w-full p-4 pr-10 text-sm rounded-lg bg-white border border-primary focus:outline-none"
                            placeholder="Search..."
                            required
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                        </div>
                    </div>
                </form>

                {/* Nav links */}
                <div className="hidden xs:block">
                    <ul className="flex flex-row">
                        {navData.map((item, index) => {
                            return (
                                <li key={index}>
                                    <a
                                        href={item.link}
                                        className="mx-4 hover:text-accent transition-all duration-300"
                                    >
                                        {item.icon}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Mobile menu button */}
                {/* <div className="lg:hidden">
                    <button
                        onClick={toggleMenu}
                        className="flex justify-center items-center text-primary hover:text-accent transition-all duration-300"
                    >
                        <FontAwesomeIcon icon={faBars} size="xl" />
                    </button>
                </div> */}
            </div>

            {/* Mobile menu
            <div
                className={`${
                    isOpen ? "left-0 w-full" : "-left-32 w-0"
                } lg:hidden h-screen fixed top-0 z-[999] flex justify-center items-center bg-white duration-500`}
            >
                <button
                    onClick={toggleMenu}
                    className="absolute top-[2rem] right-[4rem] cursor-pointer z-[999] text-primary hover:text-accent transition-all duration-300"
                >
                    <FontAwesomeIcon icon={faXmark} className="w-8 h-8" />
                </button>

                <ul className="min-w-[150px] flex flex-col gap-y-8">
                    {navData.map((item, index) => {
                        return (
                            <li
                                key={index}
                                onClick={toggleMenu}
                                className="flex justify-center items-center"
                            >
                                <a
                                    href={item.link}
                                    className="text-2xl font-semibold hover:text-accent transition-all duration-300"
                                >
                                    {item.title}
                                </a>
                            </li>
                        );
                    })}
                    <li onClick={toggleMenu} className="flex justify-center items-center">
                        <Link
                            to="/auth"
                            className="text-2xl font-semibold hover:text-accent transition-all duration-300"
                        >
                            <FontAwesomeIcon icon={faRightToBracket} /> <span>Log In</span>
                        </Link>
                    </li>
                </ul>
                </div> */}
        </nav>
    );
}
