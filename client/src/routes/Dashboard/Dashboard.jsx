import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard() {
  const { currentUser, logout, setCurrentUser } = useContext(AuthContext);
  // const [workoutPlanURL, setWorkoutPlanURL] = useState("/user/workout");
import { useState } from "react";
import { Outlet } from "react-router-dom";

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setCurrentUser(null); // Set currentUser to null after logout
  };
// Components
import DashboardFooter from "./DashboardFooter";
import DashboardNavbar from "./DashboardNavbar";
import Sidebar from "./Sidebar";

export default function Dashboard() {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

  useEffect(() => {
    // If the currentUser is null, it means the user is not logged in,
    // and we should redirect them to the authentication page.
    if (!currentUser) {
      setWorkoutPlanURL("/auth");
    }
  }, [currentUser]);
  return (
    <div className="w-full min-h-screen flex flex-row justify-start">
      <div className="min-w-[300px] h-screen flex flex-col items-center bg-gray-600">
        {/* Image */}
        <div className="w-full h-[200px] flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1636622433525-127afdf3662d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80"
            alt="Picture"
            className="h-[150px] w-[150px] rounded-full"
          />
        </div>

        {/* Nav Links */}
        <div className="w-full min-h-[400px] flex justify-center items-center">
          <ul className="w-full h-full flex flex-col justify-center items-center gap-y-2">
            <li className="w-[200px] p-4 text-sky-400 bg-gray-800 rounded-[20px]">
              Home
            </li>
            {currentUser ? (
              <Link
                to="/dashboard/workouts"
                className="w-[200px] p-4 text-sky-400 bg-gray-800 rounded-[20px]"
              >
                Workout Plan
              </Link>
            ) : null}
            <li className="w-[200px] p-4 text-sky-400 bg-gray-800 rounded-[20px]">
              Progress
            </li>
            <li className="w-[200px] p-4 text-sky-400 bg-gray-800 rounded-[20px]">
              AI Plan
            </li>
          </ul>
        </div>
        {currentUser && (
          <form
            method="post"
            onSubmit={handleLogout}
            className="w-full flex justify-center"
          >
            <button className="bg-none border border-white text-white min-w-[120px] max-w-[140px] md:max-w-[160px] px-4 py-3 transition-all duration-300 flex items-center justify-center overflow-hidden group">
              <span className="text-white group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500">
                Logout
              </span>
              <span
                icon="fa-solid fa-right-long"
                className="text-white -translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute"
              >
                Sure?
              </span>
            </button>
          </form>
        )}
      </div>
      <div className="w-full h-screen bg-gray-200"></div>
    </div>
  );
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
