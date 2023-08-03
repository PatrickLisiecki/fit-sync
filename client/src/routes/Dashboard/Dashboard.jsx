import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import DashboardFooter from "./DashboardFooter";
import DashboardNavbar from "./DashboardNavbar";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    // If the currentUser is null, it means the user is not logged in,
    // and we should redirect them to the authentication page.
    if (!currentUser) {
      setWorkoutPlanURL("/auth");
    }
  }, [currentUser]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="min-h-screen min-w-full flex flex-row">
      <Sidebar isExpanded={isExpanded} />
      <div className="w-full min-h-screen flex flex-col justify-between">
        <DashboardNavbar
          toggleSidebar={toggleSidebar}
          isExpanded={isExpanded}
        />
        <DashboardFooter isExpanded={isExpanded} />
      </div>
    </div>
  );
}
