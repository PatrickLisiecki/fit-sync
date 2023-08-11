
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
    <div className="relative flex min-h-screen min-w-full flex-row">
      {/* Sidebar navigation */}
      <Sidebar
        toggleSidebar={toggleSidebar}
        isExpanded={isExpanded}
        currentPath={location.pathname}
      />

      {/* Main screen */}
      <div className="flex min-h-screen w-full flex-col justify-between overflow-hidden">
        {/* Navbar */}
        <DashboardNavbar
          toggleSidebar={toggleSidebar}
          isExpanded={isExpanded}
        />

        
        <div
          className={`${
            isExpanded ? "pl-0 xl:pl-[250px]" : "pl-0"
          } h-full w-full bg-gray-200 transition-all duration-500`}
        >
          <Outlet />
        </div>

        {/* Footer with specific styling for dashboard */}
        <DashboardFooter isExpanded={isExpanded} />
      </div>
    </div>
  );
}
