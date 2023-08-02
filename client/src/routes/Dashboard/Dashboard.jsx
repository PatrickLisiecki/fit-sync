import { useState } from "react";
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
                <DashboardFooter isExpanded={isExpanded} />
            </div>
        </div>
    );
}
