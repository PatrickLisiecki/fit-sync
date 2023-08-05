import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ExerciseContext } from "../../contexts/ExerciseContext";

const UserExercisesList = ({ updated }) => {
  const { currentUser } = useContext(AuthContext);
  const { workoutId, day, week } = useParams();
  const { exercises, setExercises } = useContext(ExerciseContext); // Access the exercises array and setExercises function from the ExerciseContext

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

  return (
    <div className="px-6 sm:px-24 pt-4">
      <span className="text-2xl font-bold mb-4 capitalize">{day}&apos;s Workout</span>
      {exercises.length > 0 &&
        exercises.map((exercise) => (
          <div key={exercise.id} className="bg-white p-4 shadow rounded mb-4">
            <h2 className="text-xl font-bold mb-2">{exercise.name}</h2>
            <p>Type: {exercise.type}</p>
            <p>Muscle: {exercise.muscle}</p>
            <p>Equipment: {exercise.equipment}</p>
            <p>Difficulty: {exercise.difficulty}</p>
            <p>Instructions: {exercise.instructions}</p>
          </div>
        ))}
    </div>
  );
};

export default UserExercisesList;
