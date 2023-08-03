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
    faChartPie,
    faRobot,
    faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

// Sidebar Data
const sidebarData = [
    {
        title: "Dashboard",
        link: "/dashboard",
        icon: <FontAwesomeIcon icon={faChalkboardUser} className="w-[20px] h-[20px]" />,
    },
    {
        title: "Workout Plan",
        link: "/dashboard/workouts",
        icon: <FontAwesomeIcon icon={faCalendarDays} className="w-[20px] h-[20px]" />,
    },
    {
        title: "Nutrition",
        link: "/dashboard/nutrition",
        icon: <FontAwesomeIcon icon={faChartPie} className="w-[20px] h-[20px]" />,
    },
    {
        title: "AI Workout",
        link: "/dashboard/ai",
        icon: <FontAwesomeIcon icon={faRobot} className="w-[20px] h-[20px]" />,
    },
];

export default function Sidebar({ isExpanded }) {
    const { currentUser, logout } = useContext(AuthContext);

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        redirect("/auth");
    };

    return (
        <nav
            className={`${
                isExpanded ? "left-0" : "-left-[200px] lg:-left-[250px]"
            } fixed w-[200px] lg:w-[250px] h-screen bg-sidebar transition-all duration-500`}
        >
            {/* Header */}
            <div className="flex justify-center items-center p-4">
                <Link to="/" className="text-[16px] lg:text-[24px] uppercase font-bold text-white mb-0">
                    Flex <span className="text-accent">Fusion</span>
                </Link>
            </div>

            {/* Nav links for sidebar */}
            <ul className="flex flex-col">
                {/* Nav link */}
                {sidebarData.map((item, index) => {
                    return (
                        <li
                            key={index}
                            className="w-full min-h-[60px] p-4 flex items-center text-white cursor-pointer hover:bg-secondary hover:border-l-[5px] hover:border-l-accent"
                        >
                            <div className="w-full h-full ml-4">
                                <Link to={item.link}>
                                    {item.icon}
                                    <span className="inline-block ml-4">{item.title}</span>
                                </Link>
                            </div>
                        </li>
                    );
                })}
                <li className="w-full min-h-[60px] p-4 flex items-center text-white cursor-pointer hover:bg-secondary hover:border-l-[5px] hover:border-l-accent">
                    {currentUser && (
                        <Form method="post" onSubmit={handleLogout} className="w-full h-full ml-4">
                            <button type="submit">
                                <FontAwesomeIcon icon={faPowerOff} />
                                <span className="inline-block ml-4">Logout</span>
                            </button>
                        </Form>
                    )}
                </li>
            </ul>
        </nav>
    );
}
