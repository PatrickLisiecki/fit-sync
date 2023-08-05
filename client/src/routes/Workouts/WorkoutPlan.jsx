import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const WorkoutPlan = () => {
  const { currentUser } = useContext(AuthContext);

  const getCurrentDate = (separator = "/", offset) => {
    let newDate = new Date();
    let date = newDate.getDate() + offset;
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${month < 10 ? `0${month}` : `${month}`}${separator}${date}${separator}${year}`;
  };

  const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full p-4 flex justify-center items-center">
        {/* Username */}
        <span className="h3 text-[24px] sm:text-[30px] capitalize mb-0">
          {currentUser.username}&apos;s Workout Plan
        </span>
      </div>

      {/* Links for days of the week */}
      <div className="w-full flex flex-col justify-center items-center gap-6">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className="w-[50%] min-w-[250px] h-[75px] rounded-lg cursor-pointer bg-white shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* Use Link to navigate to the corresponding endpoint */}
            {currentUser && (
              <Link
                to={`/dashboard/workouts/${day}`}
                className="w-full h-full flex flex-row justify-start items-center"
              >
                <div className="w-[50px] h-[50px] flex justify-center items-center mx-4 border border-primary rounded-full text-lg capitalize font-bold">
                  {day.slice(0, 3)}
                </div>
                <div className="text-xl text-secondary">{getCurrentDate("/", index)}</div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutPlan;
