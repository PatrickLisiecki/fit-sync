/* eslint-disable no-unused-vars */

import { useState } from "react";
import { Link } from "react-router-dom";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBars, faRightToBracket, faXmark } from "@fortawesome/free-solid-svg-icons";

// Nav links
const navData = [
    {
        title: "Home",
        link: "/",
    },
    {
        title: "About",
        link: "/",
    },
    {
        title: "Features",
        link: "/",
    },
    {
        title: "Contact",
        link: "/",
    },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="w-full fixed z-[100] bg-white shadow-bs p-8">
            <div className="container mx-auto flex flex-row justify-between items-center">
                {/* Name / Logo */}
                <Link to="/" className="uppercase text-[28px] md:text-3xl">
                    <span className="text-primary">Flex</span>{" "}
                    <span className="text-accent">Fusion</span>
                </Link>

                {/* Nav links */}
                <div className="hidden lg:block">
                    <ul className="flex flex-row">
                        {navData.map((item, index) => {
                            return (
                                <li key={index}>
                                    <a
                                        href={item.link}
                                        className="mx-4 hover:text-accent transition-all duration-300"
                                    >
                                        {item.title}
                                    </a>
                                </li>
                            );
                        })}
                        <li>
                            <Link
                                to="/auth"
                                className="mx-4 hover:text-accent transition-all duration-300"
                            >
                                <FontAwesomeIcon icon={faRightToBracket} /> <span>Log In</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Mobile menu button */}
                <div className="lg:hidden">
                    <button
                        onClick={toggleMenu}
                        className="flex justify-center items-center text-primary hover:text-accent transition-all duration-300"
                    >
                        <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
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

                {/* Links for mobile menu */}
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
            </div>
        </nav>
    );
}
