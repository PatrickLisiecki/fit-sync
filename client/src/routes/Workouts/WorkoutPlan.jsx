import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const WorkoutPlan = () => {
  const { currentUser } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState("");

  const [creatingNewWorkout, setCreatingNewWorkout] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState("");

  const getCurrentDate = (separator = "/", offset) => {
    let newDate = new Date();
    let date = newDate.getDate() + offset;
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}${separator}${year}`;
  };

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

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
                to={`/dashboard/workouts/${selectedWorkout.id}/week/${selectedWeek}/${day}`}
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
