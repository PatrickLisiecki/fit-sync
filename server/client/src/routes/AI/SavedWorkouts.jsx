import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

// API functions
import { getAIWorkouts } from "../../api/aiworkouts";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function SavedWorkouts() {
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(() => {
    const fetchSavedWorkouts = async () => {
      if (currentUser) {
        const userId = currentUser.id;

        try {
          const savedWorkouts = await getAIWorkouts(userId);
          setSavedWorkouts(savedWorkouts);
        } catch (error) {
          console.error("Error fetching saved workouts:", error);
        }
      }
    };

    fetchSavedWorkouts();
  }, [currentUser]);

  const handleDelete = async (workoutId) => {
    try {
      await axios.delete(`/api/aiworkouts/${workoutId}`);
      setSavedWorkouts(
        savedWorkouts.filter((workout) => workout.id !== workoutId),
      );
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  const handleWorkoutClick = (workout) => {
    setSelectedWorkout(selectedWorkout === workout ? null : workout);
  };

  return (
    <div className="mx-auto mb-8 w-full sm:w-[80%] md:w-[65%]">
      <div className="w-full p-4 text-center">
        <span className="h2">Saved Workouts</span>
      </div>
      <div className="w-full rounded-lg bg-white px-4 py-4 shadow-md dark:bg-secondary dark:shadow-none">
        {savedWorkouts.map((workout, index) => (
          <div
            key={index}
            className="mb-4 rounded-lg bg-gray-100 p-4 dark:bg-primary"
          >
            <div className="flex items-center justify-between">
              <span
                className="h3 mb-0 flex w-full cursor-pointer items-center font-semibold"
                onClick={() => handleWorkoutClick(workout)}
              >
                AI Workout {index + 1}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  size="xs"
                  className={`ml-2 transform transition-all duration-300 ${
                    selectedWorkout === workout ? "rotate-180" : ""
                  }`}
                />
              </span>
              <div className="flex flex-row items-center justify-end bg-transparent p-4">
                <button
                  onClick={() => handleDelete(workout.id)}
                  className="grid h-[50px] w-[50px] place-items-center rounded-full p-3 transition-all duration-300 hover:bg-red-500 dark:text-white"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            </div>
            {selectedWorkout === workout && (
              <div className="whitespace-pre-line">{workout.workout}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
