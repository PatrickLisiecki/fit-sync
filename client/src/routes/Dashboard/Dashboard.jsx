/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

// Components
import DashboardFooter from "./DashboardFooter";
import DashboardNavbar from "./DashboardNavbar";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative min-h-screen min-w-full flex flex-row">
      {/* Sidebar navigation */}
      <Sidebar toggleSidebar={toggleSidebar} isExpanded={isExpanded} currentPath={location.pathname} />

      {/* Main screen */}
      <div className="w-full min-h-screen flex flex-col justify-between overflow-hidden">
        {/* Navbar */}
        <DashboardNavbar toggleSidebar={toggleSidebar} isExpanded={isExpanded} />

        {/* Dynamic content based on path */}
        <div
          className={`${
            isExpanded ? "pl-0 lg:pl-[250px]" : "pl-0"
          } w-full h-full transition-all duration-500 bg-gray-200`}
        >
          <Outlet />
        </div>

        {/* Footer with specific styling for dashboard */}
        <DashboardFooter isExpanded={isExpanded} />
      </div>
    </div>
  );
}
