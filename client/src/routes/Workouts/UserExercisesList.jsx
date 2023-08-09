
import axios from "axios";

import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ExerciseContext } from "../../contexts/ExerciseContext";

// Components
import Modal from "../../components/Modal";

// Material Tailwind
import { Button, Chip } from "@material-tailwind/react";

// Icons
import {
  faArrowLeftLong,
  faArrowRightLong,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserExercisesList({ updated }) {
  // Access the exercises array and setExercises function from the ExerciseContext
  const { exercises, setExercises } = useContext(ExerciseContext);
  const { currentUser } = useContext(AuthContext);
  const { workoutId, day, week } = useParams();

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

  useEffect(() => {
    
    if (currentUser && workoutId) {
      // Check if workoutId exists before making the request
      const userId = currentUser.id;

      // Fetch exercises data from the server for the specified user, workout, and day
      fetch(`/api/exercises/${userId}/${workoutId}/${week}/${day}`)
        .then((response) => response.json())
        .then((data) => {
          // Update the exercises array in the ExerciseContext using the setExercises function
          setExercises(data);
        })
        .catch((error) => console.log(error));
    }
  }, [currentUser, day, workoutId, week, updated, setExercises]);

  // Deleting an exercise from the user's workout
  const handleDeleteExercise = (exercise) => {
    const targetId = exercise.id;
    const authToken = currentUser.token; // Assuming you have a 'token' property in the currentUser object

    // Make a DELETE request to the backend API with the authorization header and withCredentials option
    axios
      .delete(`/api/exercises/${targetId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true, 
      })
      .then((response) => {
        console.log("Exercise deleted:", response.data);
        // After deleting an exercise, update the exercises in the ExerciseContext
        setExercises(exercises.filter((element) => element.id !== targetId));
      })
      .catch((error) => {
        console.error("Error deleting exercise:", error);
      });
  };

  return (
    <div className="px-6 py-4 sm:px-24">
      <div className="mb-2 flex w-full flex-row items-center justify-between">
        {/* Go back button */}
        <Link
          to="/dashboard/workouts"
          className="flex cursor-pointer items-center justify-center gap-x-2 rounded p-3 hover:bg-gray-300"
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
              className="rounded-lg bg-white p-4 shadow-lg"
            >
              {/* Exercise name and delete button */}
              <div className="flex w-full flex-row items-center justify-between">
                <span className="text-xl font-bold">{exercise.name}</span>
                <button
                  onClick={() => handleDeleteExercise(exercise)}
                  className="grid h-[40px] w-[40px] cursor-pointer place-items-center rounded-full text-black transition-all duration-200 hover:bg-red-500 hover:text-white"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              {/* Exercise info */}
              <div className="my-4 flex flex-row flex-wrap items-center gap-x-4 gap-y-2">
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
              </div>

              {/* Button to open exercise modal */}
              <Button
                onClick={() => handleOpen(exercise)}
                ripple={false}
                variant="filled"
                color="cyan"
                className="flex items-center justify-center gap-x-2"
              >
                <span className="text-white">View Info</span>
                <FontAwesomeIcon icon={faArrowRightLong} />
              </Button>
            </div>
          ))}
      </div>

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
              {selectedExercise.details}
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
