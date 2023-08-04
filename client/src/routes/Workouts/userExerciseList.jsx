import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const UserExercisesList = ({ updated }) => {
  const { currentUser } = useContext(AuthContext);
  const { workoutId, day } = useParams(); // Access the workoutId from URL parameter
  const [exercises, setExercises] = useState([]);
  console.log(workoutId);

  useEffect(() => {
    // Check if user is logged in and get the userId from the currentUser object
    if (currentUser) {
      // Check if workoutId exists before making the request
      const userId = currentUser.id;

      // Fetch exercises data from the server for the specified user, workout, and day
      fetch(
        `/api/workout/user/${userId}/workouts/${workoutId}/exercises/${day}`
      )
        .then((response) => response.json())
        .then((data) => setExercises(data))
        .catch((error) => console.log(error));
    }
  }, [currentUser, day, workoutId]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Exercises</h1>
      {exercises.map((exercise) => (
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
