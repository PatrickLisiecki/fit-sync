/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Form, redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardUser,
  faChartLine,
  faAppleWhole,
  faRobot,
  faPowerOff,
  faArrowLeftLong,
  faDumbbell,
  faChevronDown,
  faBookmark,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";

// Sidebar Data
const sidebarData = [
  {
    title: "Dashboard",
    link: "/dashboard",
    childPath: "",
    icon: (
      <FontAwesomeIcon icon={faChalkboardUser} className="h-[20px] w-[20px]" />
    ),
  },
  {
    title: "Workout Plan",
    link: "/dashboard/workouts",
    childPath: "/workouts",
    icon: <FontAwesomeIcon icon={faDumbbell} className="h-[20px] w-[20px]" />,
  },
  {
    title: "Progress",
    link: "/dashboard/progress",
    childPath: "/progress",
    icon: <FontAwesomeIcon icon={faChartLine} className="h-[20px] w-[20px]" />,
  },
  {
    title: "Nutrition",
    link: "/dashboard/nutrition",
    childPath: "/nutrition",
    icon: <FontAwesomeIcon icon={faAppleWhole} className="h-[20px] w-[20px]" />,
  },
];

export default function Sidebar({ toggleSidebar, isExpanded, currentPath }) {
  const { currentUser, logout } = useContext(AuthContext);

  const [openSubmenu, setOpenSubmenu] = useState(false);

  const toggleSubmenu = () => {
    if (
      isLinkActive(`/dashboard/ai/generate`) ||
      isLinkActive(`/dashboard/ai/saved`)
    ) {
      setOpenSubmenu(true);
    } else {
      setOpenSubmenu(!openSubmenu);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    redirect("/auth");
  };

  const isLinkActive = (linkPath) => {
    return currentPath === linkPath;
  };

  return (
    <nav
      className={`${
        isExpanded ? "left-0" : "-left-[250px]"
      } fixed z-[999] h-screen w-[250px] bg-sidebar shadow-2xl transition-all duration-500`}
    >
      {/* Header */}
      <div className="flex h-[100px] flex-col items-center justify-center p-4">
        <Link
          to="/"
          className="mb-0 text-[24px] font-bold uppercase text-white"
        >
          Flex <span className="text-accent">Fusion</span>
        </Link>
        <div className="mt-2 w-full border-b border-white"></div>
      </div>

      {/* Nav links for sidebar */}
      <div className="flex flex-col">
        {/* Nav link */}
        {sidebarData.map((item, index) => {
          return (
            <Link
              key={index}
              to={item.link}
              className={`${
                isLinkActive(`/dashboard${item.childPath}`)
                  ? "bg-accent hover:bg-accent/90"
                  : "bg-none hover:border-l-[5px] hover:border-l-accent hover:bg-secondary"
              } flex min-h-[60px] w-full cursor-pointer items-center p-4 text-white`}
            >
              <div className="ml-4 h-full w-full">
                {item.icon}
                <span className="ml-4 inline-block">{item.title}</span>
              </div>
            </Link>
          );
        })}

        <div
          onClick={toggleSubmenu}
          className="flex min-h-[60px] w-full cursor-pointer items-center bg-none p-4 text-white hover:border-l-[5px] hover:border-l-accent hover:bg-secondary"
        >
          <div className="relative ml-4 h-full w-full">
            <FontAwesomeIcon icon={faRobot} className="h-[20px] w-[20px]" />
            <span className="ml-4 inline-block">AI</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`${
                openSubmenu ? "rotate-180" : "rotate-0"
              } absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-300`}
            />
          </div>
        </div>

        {openSubmenu && (
          <>
            <Link
              to="/dashboard/ai/generate"
              className={`${
                isLinkActive(`/dashboard/ai/generate`)
                  ? "bg-accent hover:bg-accent/90"
                  : "bg-none hover:border-l-[5px] hover:border-l-accent hover:bg-secondary"
              } flex min-h-[60px] w-full cursor-pointer items-center p-4 text-white`}
            >
              <div className="ml-10 h-full w-full">
                <FontAwesomeIcon
                  icon={faScrewdriverWrench}
                  className="h-[20px] w-[20px]"
                />
                <span className="ml-4 inline-block">Generate</span>
              </div>
            </Link>
            <Link
              to="/dashboard/ai/saved"
              className={`${
                isLinkActive(`/dashboard/ai/saved`)
                  ? "bg-accent hover:bg-accent/90"
                  : "bg-none hover:border-l-[5px] hover:border-l-accent hover:bg-secondary"
              } flex min-h-[60px] w-full cursor-pointer items-center p-4 text-white`}
            >
              <div className="ml-10 h-full w-full">
                <FontAwesomeIcon
                  icon={faBookmark}
                  className="h-[20px] w-[20px]"
                />
                <span className="ml-4 inline-block">Saved</span>
              </div>
            </Link>
          </>
        )}

        {/* Logout */}
        <div className="flex min-h-[60px] w-full cursor-pointer items-center bg-none p-4 text-white hover:border-l-[5px] hover:border-l-accent hover:bg-secondary">
          {currentUser && (
            <Form
              method="post"
              onSubmit={handleLogout}
              className="ml-4 h-full w-full"
            >
              <button type="submit">
                <FontAwesomeIcon
                  icon={faPowerOff}
                  className="h-[20px] w-[20px]"
                />
                <span className="ml-4 inline-block">Logout</span>
              </button>
            </Form>
          )}
        </div>
      </div>

      {/* Toggle sidebar */}
      <div
        className="absolute bottom-0 flex h-[50px] w-full cursor-pointer items-center justify-center bg-accent text-white hover:bg-accent/90"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faArrowLeftLong} size="lg" />
      </div>
    </nav>
  );
}
