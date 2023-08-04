import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ExercisesList() {
  const { currentUser } = useContext(AuthContext); // Access 'currentUser' from AuthContext
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMuscle, setSelectedMuscle] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [activeButton, setActiveButton] = useState(-1);

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

  const handleDifficultySelect = (difficulty, button) => {
    setSelectedDifficulty(difficulty);
    setActiveButton(button);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWorkouts();
    console.log(workouts);
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

  const fetchExercises = () => {
    setLoading(true);
    axios
      .get(`/api/exercises/user/${currentUser.id}/workout/day/Monday/exercises`) // Replace 'day_name_here' with the actual day name
      .then((response) => {
        setWorkouts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching exercises:", error);
        setLoading(false);
      });
  };

  const handleAddToMyWorkout = (workout) => {
    // Make a POST request to the backend API to add the workout to the user's exercises
    axios
      .post("http://localhost:4000/api/exercises/exercises", {
        userId: currentUser.id, // Pass the user ID as part of the request body
        day: "Monday", // Replace "day_name_here" with the actual day name (e.g., "Monday")
        name: workout.name,
        type: workout.type,
        muscle: workout.muscle,
        equipment: workout.equipment,
        difficulty: workout.difficulty,
        instructions: workout.instructions,
        workoutId: 1, // Pass the workout ID as part of the request body
      })
      .then((response) => {
        console.log("Workout added to My Workout:", response.data);
        // Assuming you want to update the exercises list after adding the workout
        // You can fetch the updated exercises list from the server again
        fetchExercises();
      })
      .catch((error) => {
        console.error("Error adding workout:", error);
      });
  };

  return (
    <div className="p-4">
      {/* Search for exercises form */}
      <div className="p-4 flex flex-col bg-white shadow-lg rounded-lg mb-10">
        <span className="text-xl font-bold">Search for Exercises</span>

        {/* Form with selections */}
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-y-4 gap-x-10">
          {/* Muscle group select */}
          <div className="flex flex-col lg:flex-row items-center">
            <label htmlFor="muscleSelect" className="block text-lg mb-0 font-light">
              Target Muscle:
            </label>

            {/* Menu */}
            <select
              id="muscleSelect"
              className="ml-2 p-2 cursor-pointer rounded-lg border-primary focus:outline-none bg-gray-200"
              value={selectedMuscle}
              onChange={(e) => setSelectedMuscle(e.target.value)}
            >
              <option value="">Select Muscle Group</option>
              {muscleGroups.map((muscle) => (
                <option key={muscle} value={muscle} className="capitalize hover:bg-accent">
                  <span className="capitalize">{muscle}</span>
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty select */}
          <div className="flex flex-col lg:flex-row items-center">
            <span className="block text-lg mb-0 font-light">Difficulty:</span>

            <div className="ml-2 flex flex-row justify-start items-center gap-x-[20px]">
              {difficulties.map((difficulty, index) => (
                <div
                  key={index}
                  className={`${
                    activeButton === index
                      ? "text-white border-accent bg-accent hover:bg-accent/90"
                      : "bg-none text-primary border-primary hover:bg-primary/10"
                  } px-4 py-2 border transition-all duration-300 cursor-pointer`}
                  onClick={() => {
                    handleDifficultySelect(difficulty, index);
                  }}
                >
                  <span className="capitalize">{difficulty}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="text-lg py-2 px-4 text-white bg-green-500 hover:bg-green-500/90 cursor-pointer rounded-lg"
          >
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        // grid gap-4 md:grid-cols-2 lg:grid-cols-3
        <div className="flex flex-col gap-y-10">
          {workouts.map((workout, index) => (
            <div key={index} className="p-4 rounded-lg bg-white shadow-lg">
              {/* Exercise name */}
              <span className="text-xl font-bold">{workout.name}</span>
              {/* Exercise info */}
              <div className="flex flex-col text-lg">
                <span className="font-semibold">
                  Type: <span className="capitalize font-light text-secondary">{workout.type}</span>
                </span>

                <span className="font-semibold">
                  Muscle:{" "}
                  <span className="capitalize font-light text-secondary">{workout.muscle}</span>
                </span>

                <span className="font-semibold">
                  Equipment:{" "}
                  <span className="capitalize font-light text-secondary">{workout.equipment}</span>
                </span>

                <span className="font-semibold">
                  Difficulty:{" "}
                  <span className="capitalize font-light text-secondary">{workout.difficulty}</span>
                </span>

                <span className="font-semibold">Instructions:</span>
                <div className="max-h-16 overflow-y-auto p-2 border border-primary ">
                  <p className="text-sm font-light text-secondary">{workout.instructions}</p>
                </div>
              </div>

              <button
                onClick={() => handleAddToMyWorkout(workout)}
                className="text-lg px-4 py-2 mt-2 flex items-center justify-center gap-x-2 rounded-lg text-white bg-accent hover:bg-accent/90 cursor-pointer"
              >
                <FontAwesomeIcon icon={faPlus} size="md" />
                <span className="font-semibold">Add</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
