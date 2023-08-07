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
      } max-h-[100px] min-h-[60px] w-full bg-white p-[8px] shadow-bs transition-all duration-500 sm:p-4`}
    >
      <div className="flex h-full w-full flex-row items-center justify-between px-0 sm:px-[24px]">
        {/* Toggle sidebar button */}
        <Tooltip
          content="Menu"
          placement="bottom"
          className="bg-secondary text-sm text-white"
        >
          <button
            className="grid h-[50px] w-[50px] place-items-center rounded-full transition-all duration-300 hover:bg-gray-200 hover:text-accent"
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
                className="bg-secondary text-sm text-white"
              >
                <a
                  href={item.link}
                  className="mx-4 transition-all duration-300 hover:text-accent"
                >
                  {item.icon}
                </a>
              </Tooltip>
            );
          })}

          {/* User greeting */}
          <div className="flex cursor-pointer flex-row items-center justify-center p-[8px] transition-all duration-300 hover:text-accent">
            <FontAwesomeIcon icon={faCircleUser} />
            <span className="px-2 text-center text-[16px]">
              Hi, <span className="font-semibold">{currentUser.username}</span>
            </span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="h-[15px] w-[15px]"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
