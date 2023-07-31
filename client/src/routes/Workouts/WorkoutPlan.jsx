import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const WorkoutPlan = () => {
  const { currentUser } = useContext(AuthContext);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Workout Plan</h1>
      <div className="grid grid-cols-3 gap-4">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className="p-4 text-white bg-gray-800 rounded-lg shadow-lg text-center"
          >
            {/* Use Link to navigate to the corresponding endpoint */}
            {currentUser && (
              <Link to={`/user/${currentUser.id}/workout/day/${day}/exercises`}>
                <h2>{day}</h2>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutPlan;
