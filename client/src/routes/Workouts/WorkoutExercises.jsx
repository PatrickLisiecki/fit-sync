import { useState } from "react";
import UserExercisesList from "./UserExercisesList";
import ExercisesList from "./ExercisesList"; 

const UserExercises = () => {
  const [updated, setUpdated] = useState(false);

  const handleExerciseUpdate = () => {
    setUpdated((prev) => !prev);
  };

  return (
    <>
      <UserExercisesList updated={updated} />
      <ExercisesList onExerciseAdd={handleExerciseUpdate} />
    </>
  );
};

export default UserExercises;
