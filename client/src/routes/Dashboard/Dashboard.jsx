import { useState } from "react";
import { Outlet } from "react-router-dom";

// Components
import DashboardFooter from "./DashboardFooter";
import DashboardNavbar from "./DashboardNavbar";
import Sidebar from "./Sidebar";

export default function Dashboard() {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="min-h-screen min-w-full flex flex-row">
            <Sidebar isExpanded={isExpanded} />
            <div className="w-full min-h-screen flex flex-col justify-between">
                <DashboardNavbar toggleSidebar={toggleSidebar} isExpanded={isExpanded} />
                <div
                    className={`${isExpanded ? "pl-[200px] lg:pl-[250px]" : "pl-0"} w-full h-full transition-all duration-500`}
                >
                    <Outlet />
                </div>
                <DashboardFooter isExpanded={isExpanded} />
            </div>
        </div>
    );
}
