import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const WorkoutPlan = () => {
  const { currentUser } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    // Check if user is logged in and get the userId from the currentUser object
    if (currentUser) {
      const userId = currentUser.id;

      // Fetch exercises data from the server for the specified user and day
      fetch(`/api/workout/${userId}`)
        .then((response) => response.json())
        .then((data) => setWorkouts(data))
        .catch((error) => console.log(error));
    }
  }, [currentUser]);

  const handleWorkoutClick = (workout) => {
    setSelectedWorkout(workout);
  };

  const handleDayClick = (day) => {
    // Do something when a day is clicked, e.g., navigate to the exercises for that day
    // You can use the 'day' parameter to determine which day was clicked
    console.log(`Clicked on ${day}`);
    if (selectedWorkout) {
      console.log(selectedWorkout.id); // This should now give the correct workoutId
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Workout</h1>
      {workouts.map((workout) => (
        <div
          key={workout.id}
          className="bg-white p-4 shadow rounded mb-4"
          onClick={() => handleWorkoutClick(workout)}
        >
          <h2 className="text-xl font-bold mb-2">{workout.name}</h2>
        </div>
      ))}

      {selectedWorkout && (
        <div className="grid grid-cols-3 gap-4">
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className="p-4 text-white bg-gray-800 rounded-lg shadow-lg text-center"
              onClick={() => handleDayClick(day)}
            >
              {/* Use Link to navigate to the corresponding endpoint */}
              {currentUser && (
                <Link to={`/dashboard/workouts/${selectedWorkout.id}/${day}`}>
                  <h2>{day}</h2>
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutPlan;
