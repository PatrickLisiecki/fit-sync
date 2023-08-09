/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Form, redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardUser,
  faCalendarDays,
  faChartLine,
  faAppleWhole,
  faRobot,
  faPowerOff,
  faArrowLeftLong,
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
    icon: (
      <FontAwesomeIcon icon={faCalendarDays} className="h-[20px] w-[20px]" />
    ),
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
  {
    title: "AI Workout",
    link: "/dashboard/ai",
    childPath: "/ai",
    icon: <FontAwesomeIcon icon={faRobot} className="h-[20px] w-[20px]" />,
  },
];

export default function Sidebar({ toggleSidebar, isExpanded, currentPath }) {
  const { currentUser, logout } = useContext(AuthContext);

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
      } fixed z-[999] h-screen w-[250px] bg-sidebar transition-all duration-500`}
    >
      {/* Header */}
      <div className="flex flex-col items-center justify-center p-4">
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
