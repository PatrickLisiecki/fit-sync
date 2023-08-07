import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function DashboardHome() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="w-full h-full flex flex-col items-center">
      {/* Dashboard home header */}
      <div className="w-full p-4 text-center">
        <span className="h2">Welcome, {currentUser.username}!</span>
      </div>
    </div>
  );
}
