/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

// Material Tailwind
import { Tooltip } from "@material-tailwind/react";

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
        <Tooltip content="Menu" placement="bottom" className="bg-secondary text-sm text-white">
          <button
            className="w-[50px] h-[50px] grid place-items-center rounded-full hover:bg-gray-200 hover:text-accent transition-all duration-300"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </Tooltip>

        {/* Nav links */}

        <div className="flex flex-row justify-center items-center">
          {/* Nav link */}
          {navData.map((item, index) => {
            return (
              <Tooltip
                key={index}
                content={item.title}
                placement="bottom"
                className="bg-secondary text-sm text-white"
              >
                <a href={item.link} className="mx-4 hover:text-accent transition-all duration-300">
                  {item.icon}
                </a>
              </Tooltip>
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
