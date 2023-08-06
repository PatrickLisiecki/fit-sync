/* eslint-disable react/prop-types */
import axios from "axios";

import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ExerciseContext } from "../../contexts/ExerciseContext";

// Components
import Modal from "../../components/Modal";

// Material Tailwind
import { Chip, Button } from "@material-tailwind/react";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowLeftLong, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

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
    // Check if user is logged in and get the userId from the currentUser object
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

  {
    /* Deleting an exercise from the user's workout */
  }
  const handleDeleteExercise = (exercise) => {
    const targetId = exercise.id;
    // Make a DELETE request to the backend API to delete the exercise from the user's workout
    axios
      .delete(`http://localhost:4000/api/exercises/exercises/${targetId}`)
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
    <div className="px-6 sm:px-24 py-4">
      <div className="w-full flex flex-row justify-between items-center mb-2">
        {/* Go back button */}
        <Link
          to="/dashboard/workouts"
          className="p-3 rounded flex items-center justify-center gap-x-2 cursor-pointer hover:bg-gray-300"
        >
          <FontAwesomeIcon icon={faArrowLeftLong} />
          <span className="hidden sm:inline-block text-md font-light">Workouts</span>
        </Link>

        {/* Week and day header */}
        <span className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold mb-0 capitalize">
          Week {week} - {day}&apos;s Workout
        </span>
      </div>

      {/* Exercises the user has for the day */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {exercises.length > 0 &&
          exercises.map((exercise) => (
            <div key={exercise.id} className="p-4 rounded-lg bg-white shadow-lg">
              {/* Exercise name and delete button */}
              <div className="w-full flex flex-row justify-between items-center">
                <span className="text-xl font-bold">{exercise.name}</span>
                <button
                  onClick={() => handleDeleteExercise(exercise)}
                  className="w-[40px] h-[40px] grid place-items-center rounded-full cursor-pointer text-black hover:bg-red-500 hover:text-white transition-all duration-200"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              {/* Exercise info */}
              <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2 my-4">
                <Chip variant="ghost" size="sm" color="cyan" value={exercise.type} />
                <Chip variant="ghost" size="sm" color="cyan" value={exercise.muscle} />
                <Chip variant="ghost" size="sm" color="cyan" value={exercise.equipment} />
              </div>

              {/* Button to open exercise modal */}
              <Button
                onClick={() => handleOpen(exercise)}
                ripple={false}
                variant="filled"
                color="cyan"
                className="flex justify-center items-center gap-x-2"
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
            <Button variant="text" color="red" ripple={false} onClick={() => handleOpen(null)}>
              Close
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
