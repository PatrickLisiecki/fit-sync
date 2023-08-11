import { useState } from "react";
import UserExercisesList from "./UserExercisesList";
import ExercisesList from "./ExercisesList";

export default function WorkoutExercises() {
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
}
