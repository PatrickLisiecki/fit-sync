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
        <div className="w-full h-full flex flex-col items-center">
            <div className="w-full max-h-[65px] p-4 pl-8 mb-4">
                <span className="h3 text-[24px] sm:text-[30px] text-center capitalize">
                    {currentUser.username}&apos;s Workout Plan
                </span>
            </div>
            <div className="w-full flex flex-col justify-center items-center gap-5">
                {daysOfWeek.map((day, index) => (
                    <div
                        key={index}
                        className="max-h-[70px] min-w-[50%] p-6 flex justify-center items-center cursor-pointer border border-primary hover:bg-accent hover:text-white transition-all duration-300"
                    >
                        {/* Use Link to navigate to the corresponding endpoint */}
                        {currentUser && (
                            <Link to={`/dashboard/workouts/${day}`} className="w-full text-center">
                                <span className="text-xl uppercase font-bold">{day}</span>
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkoutPlan;
