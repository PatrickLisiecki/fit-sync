/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircleUser,
  faHouse,
  faBell,
  faSun,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

// Nav links
const navData = [
  {
    title: "Home",
    link: "/",
    icon: <FontAwesomeIcon icon={faHouse} size="lg" />,
  },
  {
    title: "Notifications",
    link: "/",
    icon: <FontAwesomeIcon icon={faBell} size="lg" />,
  },
  {
    title: "Mode",
    link: "/",
    icon: <FontAwesomeIcon icon={faSun} size="lg" />,
  },
];

export default function Navbar({ toggleSidebar, isExpanded }) {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav
      className={`${
        isExpanded ? "pl-0 md:pl-[250px]" : "pl-0"
      } w-full max-h-[100px] bg-white shadow-bs p-4 transition-all duration-500 overflow-hidden`}
    >
      <div className="mx-6 flex flex-row justify-start xs:justify-between items-center">
        {/* Toggle sidebar button */}
        <button
          className="p-2 flex justify-center items-center hover:text-accent transition-all duration-300"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} size="xl" />
        </button>

        {/* Nav links */}
        <div className="hidden xs:block">
          <ul className="flex flex-row">
            {/* Nav link */}
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

            {/* User greeting */}
            <li>
              <div className="mx-4 cursor-pointer hover:text-accent transition-all duration-300">
                <FontAwesomeIcon icon={faCircleUser} size="lg" />
                <span className="px-2 text-base">
                  Hi, <span className="font-semibold">{currentUser.username}</span>
                </span>
                <FontAwesomeIcon icon={faChevronDown} size="sm" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
