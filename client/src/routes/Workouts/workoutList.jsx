import axios from "axios";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ExerciseContext } from "../../contexts/ExerciseContext";

const WorkoutList = ({ onExerciseAdd }) => {
  const { currentUser } = useContext(AuthContext); // Access 'currentUser' from AuthContext
  const { workoutId, week, day } = useParams();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMuscle, setSelectedMuscle] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const { setExercises } = useContext(ExerciseContext);

  const muscleGroups = [
    "abdominals",
    "abductors",
    "adductors",
    "biceps",
    "calves",
    "chest",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "lower_back",
    "middle_back",
    "neck",
    "quadriceps",
    "traps",
    "triceps",
  ];

  const difficulties = ["beginner", "intermediate", "expert"];

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWorkouts();
  };

  const fetchWorkouts = () => {
    setLoading(true);
    axios
      .get("https://api.api-ninjas.com/v1/exercises", {
        headers: {
          "X-Api-Key": "8iEGI6IQMoO9RRPmguQztMrEwgUNxV9qETUa7a5t",
        },
        params: {
          muscle: selectedMuscle,
          difficulty: selectedDifficulty,
        },
      })
      .then((response) => {
        setWorkouts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching workout data:", error);
        setLoading(false);
      });
  };

  const handleAddToMyWorkout = (workout) => {
    // Make a POST request to the backend API to add the workout to the user's exercises
    axios
      .post("http://localhost:4000/api/exercises/exercises", {
        userId: currentUser.id,
        day: day,
        name: workout.name,
        type: workout.type,
        muscle: workout.muscle,
        equipment: workout.equipment,
        difficulty: workout.difficulty,
        instructions: workout.instructions,
        week: week,
        workoutId: workoutId,
      })
      .then((response) => {
        console.log("Workout added to My Workout:", response.data);
        // After adding a new exercise, update the exercises in the ExerciseContext
        setExercises((prevExercises) => [...prevExercises, response.data]);
        // Call the callback function to inform UserExercisesList that it needs to update
        onExerciseAdd();
      })
      .catch((error) => {
        console.error("Error adding workout:", error);
      }); // <-- Add the closing parenthesis here
  };

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Workout List</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex items-center mb-4">
          <label
            htmlFor="muscleSelect"
            className="block font-semibold text-lg text-gray-700 mr-4"
          >
            Select Muscle Group:
          </label>
          <select
            id="muscleSelect"
            className="block w-48 mt-1 p-2 rounded-lg border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
            value={selectedMuscle}
            onChange={(e) => setSelectedMuscle(e.target.value)}
          >
            <option value="">Select Muscle Group</option>
            {muscleGroups.map((muscle) => (
              <option key={muscle} value={muscle}>
                {muscle}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center mb-4">
          <label
            htmlFor="difficultySelect"
            className="block font-semibold text-lg text-gray-700 mr-4"
          >
            Select Difficulty:
          </label>
          <select
            id="difficultySelect"
            className="block w-48 mt-1 p-2 rounded-lg border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="">Select Difficulty</option>
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Submit
        </button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-md text-white"
            >
              <h2 className="text-xl font-semibold mb-2">{workout.name}</h2>
              <p>
                <span className="font-semibold">Type:</span> {workout.type}
              </p>
              <p>
                <span className="font-semibold">Muscle:</span> {workout.muscle}
              </p>
              <p>
                <span className="font-semibold">Equipment:</span>{" "}
                {workout.equipment}
              </p>
              <p>
                <span className="font-semibold">Difficulty:</span>{" "}
                {workout.difficulty}
              </p>
              <div>
                <span className="font-semibold">Instructions:</span>
                <div className="max-h-16 overflow-y-auto text-gray-300">
                  {workout.instructions}
                </div>
              </div>
              <button
                onClick={() => handleAddToMyWorkout(workout)}
                className="bg-blue-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg mt-4"
              >
                Add to My Workout
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutList;
