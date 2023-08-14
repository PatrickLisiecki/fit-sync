import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const SavedWorkouts = () => {
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const { currentUser } = useContext(AuthContext);

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

  return (
    <div className="mx-auto mb-8 w-[65%]">
      <div className="w-full p-4 text-center">
        <span className="h2">Saved Workouts</span>
      </div>
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
