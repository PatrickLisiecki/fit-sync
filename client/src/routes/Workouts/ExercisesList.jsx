/* eslint-disable react/prop-types */
import axios from "axios";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ExerciseContext } from "../../contexts/ExerciseContext";

// Components
import CollapsibleParagraph from "../../components/CollapsibleParagraph";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ExercisesList({ onExerciseAdd }) {
  const { currentUser } = useContext(AuthContext);
  const { setExercises } = useContext(ExerciseContext);

  const { workoutId, week, day } = useParams();

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
      });
  };

  return (
    <div className="px-6 sm:px-24 py-4">
      {/* Search for exercises form */}
      <div className="p-4 flex flex-col bg-white shadow-lg rounded-lg mb-4 overflow-x-auto">
        <span className="text-center sm:text-left text-xl font-bold mb-2">
          Search for Exercises
        </span>

        {/* Form with selections */}
        <form onSubmit={handleSubmit} className="flex flex-col xl:flex-row gap-y-4 gap-x-10">
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
                  {muscle}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty select */}
          <div className="flex flex-col lg:flex-row items-center">
            <span className="block text-lg mb-0 font-light">Difficulty:</span>

            <div className="ml-2 flex flex-col lg:flex-row justify-center items-center gap-y-[10px] gap-x-[10px]">
              {difficulties.map((difficulty, index) => (
                <div
                  key={index}
                  className={`${
                    activeButton === index
                      ? "text-white border-accent bg-accent hover:bg-accent/90"
                      : "bg-none text-primary border-primary hover:bg-primary/10"
                  } min-w-[135px] grid place-items-center py-2 border transition-all duration-200 cursor-pointer`}
                  onClick={() => {
                    handleDifficultySelect(difficulty, index);
                  }}
                >
                  <span className="capitalize text-[18px]">{difficulty}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="min-w-[135px] py-2 text-lg text-white bg-green-500 hover:bg-green-500/90 cursor-pointer rounded-lg"
          >
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workouts.map((exercise, index) => (
            <div key={index} className="p-4 rounded-lg bg-white">
              {/* Exercise name */}
              <div className="w-full flex flex-row justify-between items-center">
                <span className="text-xl font-bold">{exercise.name}</span>
                <button
                  onClick={() => handleAddToMyWorkout(exercise)}
                  className="w-[40px] h-[40px] grid place-items-center rounded-full cursor-pointer text-black hover:bg-green-500 hover:text-white transition-all duration-200"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>

              {/* Exercise info */}
              <div className="flex flex-row flex-wrap items-center gap-x-4 my-2">
                <span className="capitalize font-light text-secondary">{exercise.type}</span>

                <span className="capitalize font-light text-secondary">{exercise.muscle}</span>

                <span className="capitalize font-light text-secondary">{exercise.equipment}</span>

                <span className="capitalize font-light text-secondary">{exercise.difficulty}</span>
              </div>

              {/* Collapsible instructions */}
              <CollapsibleParagraph title={"Instructions"} content={exercise.instructions} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
