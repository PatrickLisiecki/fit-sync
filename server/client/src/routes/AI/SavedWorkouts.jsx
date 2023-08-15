import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";

const SavedWorkouts = () => {
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [selectedWorkout, setSelectedWorkout] = useState(null); 

  useEffect(() => {
    const fetchSavedWorkouts = async () => {
      if (currentUser) {
        const userId = currentUser.id;

        try {
          const response = await axios.get(`/api/aiworkouts/${userId}`);
          const fetchedWorkouts = response.data;
          setSavedWorkouts(fetchedWorkouts);
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
      setSavedWorkouts(savedWorkouts.filter(workout => workout.id !== workoutId));
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };
const handleWorkoutClick = (workout) => {
    setSelectedWorkout(selectedWorkout === workout ? null : workout);
  };

  return (
    <div className="mx-auto mb-8 w-full sm:w-[80%] md:w-[65%]">
      <div className="w-full rounded-lg bg-white px-4 py-4 shadow-md dark:bg-secondary dark:shadow-none">
        {savedWorkouts.map((workout, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-100 dark:bg-primary rounded-lg">
            <div className="flex justify-between items-center ">
              <span
                className="h3 mb-0 font-semibold cursor-pointer flex items-center"
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
              <div className="flex flex-row justify-end bg-transparent p-4 items-center">
                <button
                  onClick={() => handleDelete(workout.id)}
                  className="grid h-[50px] w-[50px] place-items-center rounded-full p-3 transition-all duration-300 hover:bg-red-500 dark:text-white"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            </div>
            {selectedWorkout === workout && (
              <div className="whitespace-pre-line">
                {workout.workout}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedWorkouts;

