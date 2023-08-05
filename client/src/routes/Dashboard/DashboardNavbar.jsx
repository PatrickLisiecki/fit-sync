/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext } from "react";
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
    icon: <FontAwesomeIcon icon={faHouse} />,
  },
  {
    title: "Notifications",
    link: "/",
    icon: <FontAwesomeIcon icon={faBell} />,
  },
  {
    title: "Mode",
    link: "/",
    icon: <FontAwesomeIcon icon={faSun} />,
  },
];

export default function Navbar({ toggleSidebar, isExpanded }) {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav
      className={`${
        isExpanded ? "pl-0 md:pl-[250px]" : ""
      } w-full min-h-[60px] max-h-[100px] bg-white shadow-bs p-[8px] sm:p-4 transition-all duration-500`}
    >
      <div className="w-full h-full px-0 sm:px-[24px] flex flex-row justify-between items-center">
        {/* Toggle sidebar button */}
        <button
          className="relative p-3 grid place-items-center rounded-full hover:bg-gray-200 hover:text-accent transition-all duration-300 group"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} />
          <span className="absolute z-[9999] top-14 px-2 py-1 bg-secondary text-white text-sm rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Menu
          </span>
        </button>

        {/* Nav links */}

        <div className="flex flex-row justify-center items-center">
          {/* Nav link */}
          {navData.map((item, index) => {
            return (
              <a
                key={index}
                href={item.link}
                className="relative mx-4 hover:text-accent transition-all duration-300 group"
              >
                {item.icon}
              </a>
            );
          })}

          {/* User greeting */}
          <div className="flex flex-row items-center justify-center p-[8px] cursor-pointer hover:text-accent transition-all duration-300">
            <FontAwesomeIcon icon={faCircleUser} />
            <span className="text-center text-[16px] px-2">
              Hi, <span className="font-semibold">{currentUser.username}</span>
            </span>
            <FontAwesomeIcon icon={faChevronDown} className="w-[15px] h-[15px]" />
          </div>
        </div>
      </div>
    </nav>
  );
}
