import UserExercisesList from "./userExerciseList";
import WorkoutList from "./workoutList"; // You should import the actual WorkoutList component file here

const UserExercises = () => {
  return (
    <div>
      <UserExercisesList />
      <WorkoutList />
    </div>
  );
};

export default UserExercises;
