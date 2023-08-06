/* eslint-disable react/prop-types */
import axios from "axios";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ExerciseContext } from "../../contexts/ExerciseContext";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// Components
import CollapsibleParagraph from "../../components/CollapsibleParagraph";

export default function UserExercisesList({ updated }) {
  // Access the exercises array and setExercises function from the ExerciseContext
  const { exercises, setExercises } = useContext(ExerciseContext);
  const { currentUser } = useContext(AuthContext);

  const { workoutId, day, week } = useParams();

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
      {/* Week and day header */}
      <span className="text-2xl font-bold mb-4 capitalize">
        Week {week} - {day}&apos;s Workout
      </span>

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
                  className="w-[40px] h-[40px] p-4 flex items-center justify-center rounded-full cursor-pointer text-black hover:bg-red-500 hover:text-white transition-all duration-200"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              {/* Exercise info */}
              <div className="flex flex-row flex-wrap items-center gap-x-4 my-2">
                <span className="capitalize font-light text-secondary">{exercise.type}</span>

                <span className="capitalize font-light text-secondary">{exercise.muscle}</span>

                <span className="capitalize font-light text-secondary">{exercise.equipment}</span>
              </div>

              {/* Collapsible instructions */}
              <CollapsibleParagraph title={"Instructions"} content={exercise.instructions} />
            </div>
          ))}
      </div>
    </div>
  );
}
