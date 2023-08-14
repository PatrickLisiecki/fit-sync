/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ExerciseContext } from "../../contexts/ExerciseContext";

// API functions
import { getExercises, deleteExercise } from "../../api/exercises";

// Components
import Modal from "../../components/Modal";

// Material Tailwind
import { Button, Chip } from "@material-tailwind/react";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function UserExercisesList({ updated }) {
  // Access the exercises array and setExercises function from the ExerciseContext
  const { exercises, setExercises } = useContext(ExerciseContext);
  const { currentUser } = useContext(AuthContext);
  const { workoutId, day, week } = useParams();

  // State variables
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const handleOpen = (exercise) => {
    setSelectedExercise(exercise);
    setIsModalVisible(!isModalVisible);
  };

  // Get all the exercises
  useEffect(() => {
    async function fetchExercises() {
      if (currentUser && workoutId) {
        const userId = currentUser.id;

        // Fetch exercises from the server for the specified user, workout, week, and day
        const exercises = await getExercises(userId, workoutId, week, day);

        // Update the exercises array in the ExerciseContext using the setExercises function
        setExercises(exercises);
      }
    }

    fetchExercises();
  }, [currentUser, day, workoutId, week, updated, setExercises]);

  // Deleting an exercise
  const handleDeleteExercise = async (exercise) => {
    const targetId = exercise.id;
    const authToken = currentUser.token;

    // Make a DELETE request to the backend API with the authorization header
    await deleteExercise(targetId, authToken);

    // After deleting an exercise, update the exercises in the ExerciseContext
    setExercises(exercises.filter((exercise) => exercise.id !== targetId));
  };

  return (
    <div className="px-6 py-4 sm:px-24">
      <div className="mb-2 flex w-full flex-row items-center justify-between">
        {/* Go back button */}
        <Link
          to="/dashboard/workouts"
          className="flex cursor-pointer items-center justify-center gap-x-2 rounded p-3 hover:bg-gray-300 dark:hover:bg-primary"
        >
          <FontAwesomeIcon icon={faArrowLeftLong} />
          <span className="text-md hidden font-light sm:inline-block">
            Workouts
          </span>
        </Link>

        {/* Week and day header */}
        <span className="mb-0 text-[20px] font-semibold capitalize sm:text-[24px] md:text-[28px]">
          Week {week} - {day}&apos;s Workout
        </span>
      </div>

      {/* Exercises the user has for the day */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {exercises.length > 0 &&
          exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="rounded-lg bg-white p-4 shadow-md dark:bg-primary"
            >
              {/* Exercise name and delete button */}
              <div className="relative mb-4 flex w-full flex-row items-center justify-between">
                <span className="pr-[50px] text-xl font-bold">
                  {exercise.name}
                </span>
                <button
                  onClick={() => handleDeleteExercise(exercise)}
                  className="absolute right-0 top-0 flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full text-black transition-all duration-200 hover:bg-red-500 hover:text-white dark:text-white"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              {/* Exercise info */}
              <div className="my-4 flex flex-row flex-wrap items-center gap-x-4 gap-y-2">
                <Chip
                  variant="ghost"
                  size="sm"
                  color="orange"
                  className="font-poppins dark:text-white"
                  value={exercise.type}
                />
                <Chip
                  variant="ghost"
                  size="sm"
                  color="orange"
                  className="font-poppins dark:text-white"
                  value={exercise.muscle}
                />
                <Chip
                  variant="ghost"
                  size="sm"
                  color="orange"
                  className="font-poppins dark:text-white"
                  value={exercise.equipment}
                />
              </div>

              {/* Button to open exercise modal */}
              <Button
                onClick={() => handleOpen(exercise)}
                ripple={false}
                variant="filled"
                color="orange"
                className="flex items-center justify-center gap-x-2"
              >
                <span className="font-poppins tracking-wide text-white">
                  Details
                </span>
                <FontAwesomeIcon icon={faArrowRightLong} />
              </Button>
            </div>
          ))}
      </div>

      {/* Modal for exercise info */}
      {selectedExercise && (
        <Modal isVisible={isModalVisible} hideModal={hideModal}>
          <div className="flex shrink-0 items-center border-b border-primary p-4 dark:border-secondary">
            <span className="text-2xl font-semibold leading-snug text-primary antialiased dark:text-white">
              {selectedExercise.name}
            </span>
          </div>

          <div className="relative border-b border-primary p-4 antialiased dark:border-secondary">
            <p className="text-base font-light leading-relaxed text-secondary dark:text-white">
              {selectedExercise.details}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center justify-end p-4">
            <Button
              variant="text"
              color="red"
              ripple={false}
              onClick={() => handleOpen(null)}
              className="font-poppins"
            >
              Close
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
