import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const WorkoutPlan = () => {
  const { currentUser } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState("");
  const [exercises, setExercises] = useState([]);
  const [creatingNewWorkout, setCreatingNewWorkout] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState("");

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

      // Fetch workouts data from the server for the specified user
      fetch(`/api/workout/${userId}/workouts`)
        .then((response) => response.json())
        .then((data) => setWorkouts(data))
        .catch((error) => console.log(error));
    }
  }, [currentUser]);

  useEffect(() => {
    // Check if user is logged in and get the userId from the currentUser object
    if (currentUser && selectedDay !== "") {
      const userId = currentUser.id;

      // Fetch exercises data from the server for the specified user, week, and day
      fetch(
        `/api/exercises/user/${userId}/week/${selectedWeek}/day/${selectedDay}/exercises`
      )
        .then((response) => response.json())
        .then((data) => setExercises(data))
        .catch((error) => console.log(error));
    }
  }, [currentUser, selectedWeek, selectedDay]);

  const handleWorkoutClick = (workout) => {
    setSelectedWorkout(workout);
  };

  const handlePrevWeek = () => {
    setSelectedWeek((prevWeek) => prevWeek - 1);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handleThisWeek = () => {
    setSelectedWeek(1);
  };

  const handleNextWeek = () => {
    setSelectedWeek((prevWeek) => prevWeek + 1);
  };

  const handleCreateNewWorkout = () => {
    setCreatingNewWorkout(true);
  };

  const handleNewWorkoutNameChange = (event) => {
    setNewWorkoutName(event.target.value);
  };

  const handleSaveNewWorkout = () => {
    if (newWorkoutName.trim() !== "") {
      // Assuming you have an API route to create a new workout
      fetch(`/api/workout/${currentUser.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newWorkoutName.trim(),
          userId: currentUser.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Add the new workout to the workouts state and select it
          setSelectedWorkout(data);
          setWorkouts((prevWorkouts) => [...prevWorkouts, data]);
          setCreatingNewWorkout(false);
          setNewWorkoutName("");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      {/* Render the "Workout" heading only if no workout is selected */}
      {!selectedWorkout && (
        <h1 className="text-2xl font-bold mb-4">Workouts</h1>
      )}
      {selectedWorkout ? (
        // Display only the selected workout
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3 p-4 bg-white shadow rounded mb-4">
            <h2 className="text-xl font-bold mb-2">{selectedWorkout.name}</h2>
          </div>

          {/* Week Navigation */}
          <div className="col-span-3 flex justify-center mb-4 space-x-4">
            <button
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              onClick={handlePrevWeek}
            >
              Prev Week
            </button>
            <button
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              onClick={handleThisWeek}
            >
              This Week
            </button>
            <button
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              onClick={handleNextWeek}
            >
              Next Week
            </button>
            <span className="px-4 py-2 bg-gray-300 rounded">{`Week ${selectedWeek}`}</span>
          </div>

          {/* List of Days */}
          <div className="col-span-3 flex justify-center">
            {daysOfWeek.map((day, index) => (
              <Link
                key={index}
                to={`/dashboard/workouts/${selectedWorkout.id}/${selectedWeek}/${day}`}
              >
                <div
                  className={`p-4 text-white bg-gray-800 rounded-lg shadow-lg text-center ${
                    day === selectedDay ? "bg-blue-600" : ""
                  } cursor-pointer hover:bg-blue-600`}
                  onClick={() => handleDayClick(day)}
                >
                  <h2>{day}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : creatingNewWorkout ? (
        // Display the form to create a new workout
        <div className="flex flex-col items-center">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded mb-4"
            placeholder="Workout Name"
            value={newWorkoutName}
            onChange={handleNewWorkoutNameChange}
          />
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={handleSaveNewWorkout}
          >
            Save Workout
          </button>
        </div>
      ) : (
        // Display the list of workouts when no workout is selected
        <div className="grid grid-cols-3 gap-4">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="bg-white p-4 shadow rounded mb-4 cursor-pointer hover:bg-gray-100"
              onClick={() => handleWorkoutClick(workout)}
            >
              <h2 className="text-xl font-bold mb-2">{workout.name}</h2>
            </div>
          ))}
          <button
            className="bg-blue-500 text-white p-4 shadow rounded"
            onClick={handleCreateNewWorkout}
          >
            Create New Workout
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlan;
