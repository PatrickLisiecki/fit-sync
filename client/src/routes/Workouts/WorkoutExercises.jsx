import UserExercisesList from "./userExerciseList";
import ExercisesList from "./ExercisesList"; // You should import the actual WorkoutList component file here

const UserExercises = () => {
  return (
    <>
      <UserExercisesList />
      <ExercisesList />
    </>
  );
};

export default UserExercises;
