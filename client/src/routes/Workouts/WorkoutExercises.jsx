import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserExercises = () => {
  const { userId, day } = useParams();
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    // Fetch exercises data from the server for the specified user and day
    fetch(`/api/exercises/user/${userId}/workout/day/${day}/exercises`)
      .then((response) => response.json())
      .then((data) => setExercises(data))
      .catch((error) => console.log(error));
  }, [userId, day]);

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

export default UserExercises;
