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
          details: workout.instructions,
          week: week,
          workoutId: workoutId,
        },
        { withCredentials: true },
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
    <div className="px-6 py-4 sm:px-24">
      {/* Search for exercises form */}
      <div className="mb-4 flex flex-col overflow-x-auto rounded-lg bg-white p-4 shadow-lg">
        <span className="mb-2 text-center text-xl font-bold sm:text-left">
          Search for Exercises
        </span>

        {/* Form with selections */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-x-10 gap-y-4 xl:flex-row"
        >
          {/* Muscle group select */}
          <div className="flex flex-col items-center lg:flex-row">
            <label
              htmlFor="muscleSelect"
              className="mb-0 block text-lg font-light"
            >
              Target Muscle:
            </label>

            {/* Menu */}
            <select
              id="muscleSelect"
              className="ml-2 cursor-pointer rounded-lg border-primary bg-gray-200 p-2 focus:outline-none"
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
          <div className="flex flex-col items-center lg:flex-row">
            <span className="mb-0 block text-lg font-light">Difficulty:</span>

            <div className="ml-2 flex flex-col items-center justify-center gap-x-[10px] gap-y-[10px] lg:flex-row">
              {difficulties.map((difficulty, index) => (
                <div
                  key={index}
                  className={`${
                    activeButton === index
                      ? "border-blue-500 bg-blue-500 text-white hover:bg-blue-500/90"
                      : "border-primary bg-none text-primary hover:bg-primary/10"
                  } grid min-w-[135px] cursor-pointer place-items-center border py-2`}
                  onClick={() => {
                    handleDifficultySelect(difficulty, index);
                  }}
                >
                  <span className="text-[18px] capitalize">{difficulty}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="min-w-[135px] cursor-pointer rounded-lg bg-accent py-2 text-lg text-white hover:bg-accent/90"
          >
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <div className="grid min-h-[150px] w-full place-items-center">
          <svg
            aria-hidden="true"
            className="inline h-[50px] w-[50px] animate-spin fill-accent text-gray-400 dark:text-gray-600"
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
            <div key={index} className="rounded-lg bg-white p-4">
              {/* Exercise name */}
              <div className="flex w-full flex-row items-center justify-between gap-x-2">
                <span className="text-xl font-bold">{exercise.name}</span>
                <button
                  onClick={() => handleAddToMyWorkout(exercise)}
                  className="grid h-[40px] w-[40px] cursor-pointer place-items-center rounded-full text-black transition-all duration-200 hover:bg-green-500 hover:text-white"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>

              {/* Exercise info */}
              <div className="my-3 flex flex-row flex-wrap items-center gap-x-4 gap-y-2">
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
                className="flex items-center justify-center gap-x-2"
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
          <div className="flex shrink-0 items-center border-b border-primary p-4">
            <span className="text-2xl font-semibold leading-snug text-primary antialiased">
              {selectedExercise.name}
            </span>
          </div>
          <div className="relative border-b border-primary p-4 antialiased">
            <p className="text-base font-light leading-relaxed text-secondary">
              {selectedExercise.instructions}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center justify-end p-4">
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
