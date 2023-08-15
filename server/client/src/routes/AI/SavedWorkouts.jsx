import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

// API functions
import { getAIWorkouts } from "../../api/aiworkouts";

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
      <div className="w-full rounded-lg bg-white px-4 py-4 shadow-md dark:bg-secondary dark:shadow-none">
        {savedWorkouts.map((workout, index) => (
          <div key={index} className="mb-4">
            <span className="h3 font-semibold">Workout {index + 1}</span>
            <div className="whitespace-pre-line rounded-lg bg-gray-100 p-4 dark:bg-primary">
              {workout.workout} {/* Render the 'workout' string */}
            </div>
            <button
              onClick={() => handleDelete(workout.id)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedWorkouts;

