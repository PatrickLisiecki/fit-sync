import { useState } from "react";
import UserExercisesList from "./userExerciseList";
import WorkoutList from "./workoutList";

const UserExercises = () => {
  const [updated, setUpdated] = useState(false);

  const handleExerciseUpdate = () => {
    setUpdated((prev) => !prev);
  };

  return (
    <div>
      <UserExercisesList updated={updated} />
      <WorkoutList onExerciseAdd={handleExerciseUpdate} />
    </div>
  );
};

export default UserExercises;
