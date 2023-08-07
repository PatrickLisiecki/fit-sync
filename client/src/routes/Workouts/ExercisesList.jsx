/* eslint-disable react/prop-types */
import axios from "axios";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ExerciseContext } from "../../contexts/ExerciseContext";

// Components
import Modal from "../../components/Modal";

// Material Tailwind
import { Button, Chip } from "@material-tailwind/react";

// Icons
import { faArrowRightLong, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ExercisesList({ onExerciseAdd }) {
  const { currentUser } = useContext(AuthContext);
  const { setExercises } = useContext(ExerciseContext);

  const { workoutId, week, day } = useParams();

  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMuscle, setSelectedMuscle] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [activeButton, setActiveButton] = useState(-1);

  // Modal state and controls
  const [isModalVisible, setIsModalVisible] = useState(false);

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const [selectedExercise, setSelectedExercise] = useState(null);
  const handleOpen = (exercise) => {
    setSelectedExercise(exercise);
    setIsModalVisible(!isModalVisible);
  };

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
      .post(
        "/api/exercises/",
        {
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
        },
        { withCredentials: true }
      )

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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col xl:flex-row gap-y-4 gap-x-10"
        >
          {/* Muscle group select */}
          <div className="flex flex-col lg:flex-row items-center">
            <label
              htmlFor="muscleSelect"
              className="block text-lg mb-0 font-light"
            >
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
                <option
                  key={muscle}
                  value={muscle}
                  className="capitalize hover:bg-accent"
                >
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
                      ? "text-white border-blue-500 bg-blue-500 hover:bg-blue-500/90"
                      : "bg-none text-primary border-primary hover:bg-primary/10"
                  } min-w-[135px] grid place-items-center py-2 border cursor-pointer`}
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
        <div className="w-full min-h-[150px] grid place-items-center">
          <svg
            aria-hidden="true"
            className="inline w-[50px] h-[50px] text-gray-400 animate-spin dark:text-gray-600 fill-accent"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workouts.map((exercise, index) => (
            <div key={index} className="p-4 rounded-lg bg-white">
              {/* Exercise name */}
              <div className="w-full flex flex-row justify-between items-center gap-x-2">
                <span className="text-xl font-bold">{exercise.name}</span>
                <button
                  onClick={() => handleAddToMyWorkout(exercise)}
                  className="w-[40px] h-[40px] grid place-items-center rounded-full cursor-pointer text-black hover:bg-green-500 hover:text-white transition-all duration-200"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>

              {/* Exercise info */}
              <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2 my-3">
                <Chip
                  variant="ghost"
                  size="sm"
                  color="cyan"
                  value={exercise.type}
                />
                <Chip
                  variant="ghost"
                  size="sm"
                  color="cyan"
                  value={exercise.muscle}
                />
                <Chip
                  variant="ghost"
                  size="sm"
                  color="cyan"
                  value={exercise.equipment}
                />
                <Chip
                  variant="ghost"
                  size="sm"
                  color="cyan"
                  value={exercise.difficulty}
                />
              </div>

              {/* Button to open exercise modal */}
              <Button
                onClick={() => handleOpen(exercise)}
                ripple={false}
                variant="gradient"
                color="orange"
                className="flex justify-center items-center gap-x-2"
              >
                <span className="text-white">View Info</span>
                <FontAwesomeIcon icon={faArrowRightLong} size="sm" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Modal for exercise info */}
      {selectedExercise && (
        <Modal isVisible={isModalVisible} hideModal={hideModal}>
          <div className="flex items-center shrink-0 p-4 border-b border-primary">
            <span className="text-primary antialiased text-2xl font-semibold leading-snug">
              {selectedExercise.name}
            </span>
          </div>
          <div className="relative p-4 antialiased border-b border-primary">
            <p className="text-secondary text-base font-light leading-relaxed">
              {selectedExercise.instructions}
            </p>
          </div>

          <div className="flex items-center justify-end shrink-0 flex-wrap p-4">
            <Button
              variant="text"
              color="red"
              ripple={false}
              onClick={() => handleOpen(null)}
            >
              Close
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
