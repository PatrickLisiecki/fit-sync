import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const UserExercisesList = () => {
  const { currentUser } = useContext(AuthContext);
  const { day } = useParams();
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    // Check if user is logged in and get the userId from the currentUser object
    if (currentUser && day) {
      const userId = currentUser.id;

      // Fetch exercises data from the server for the specified user and day
      fetch(`/api/exercises/user/${userId}/workout/day/${day}/exercises`)
        .then((response) => response.json())
        .then((data) => setExercises(data))
        .catch((error) => console.log(error));
    }
  }, [currentUser, day]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Exercises</h1>
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
