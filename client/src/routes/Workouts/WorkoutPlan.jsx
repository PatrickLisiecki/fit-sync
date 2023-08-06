/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

// Components
import Modal from "../../components/Modal";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faChevronLeft,
  faChevronRight,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";

export default function WorkoutPlan() {
  const { currentUser } = useContext(AuthContext);

  // Modal state and controls
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState("");
  const [newWorkoutName, setNewWorkoutName] = useState("");

  const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  useEffect(() => {
    // Check if user is logged in and get the userId from the currentUser object
    if (currentUser) {
      const userId = currentUser.id;

      // Fetch workouts data from the server for the specified user
      fetch(`/api/workouts/${userId}`)
        .then((response) => response.json())
        .then((data) => setWorkouts(data))
        .catch((error) => console.log(error));
    }
  }, [currentUser]);

  const handleWorkoutClick = (workout) => {
    setSelectedWorkout(workout);
  };

  const handlePrevWeek = () => {
    setSelectedWeek((prevWeek) => (prevWeek === 1 ? 1 : prevWeek - 1));
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

  const handleNewWorkoutNameChange = (event) => {
    setNewWorkoutName(event.target.value);
  };

  const handleSaveNewWorkout = () => {
    if (newWorkoutName.trim() !== "") {
      // Assuming you have an API route to create a new workout
      fetch(`/api/workouts/${currentUser.id}`, {
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
          setNewWorkoutName("");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      {/* Render the "Workout" heading only if no workout is selected */}
      {!selectedWorkout && (
        <div className="w-full p-4 text-center">
          <span className="h2 font-bold">Your Workouts</span>
        </div>
      )}

      {selectedWorkout ? (
        // Display only the selected workout
        <div className="relative w-full h-full flex flex-col items-center">
          {/* Go back button */}
          <button
            onClick={() => setSelectedWorkout(null)}
            className="absolute top-[15px] left-[20px] p-3 rounded flex items-center justify-center gap-x-2 cursor-pointer hover:bg-gray-300"
          >
            <FontAwesomeIcon icon={faArrowLeftLong} />
            <span className="text-md font-light">Workouts</span>
          </button>

          {/* Workout name header */}
          <div className="min-w-[300px] text-center p-4 mt-6 bg-white shadow-bs rounded">
            <span className="h3 font-bold">{selectedWorkout.name}</span>
          </div>

          {/* Week navigation */}
          <div className="flex flex-row justify-center items-center gap-x-10 my-6">
            {/* Previous week button */}
            <button
              className="max-w-[100px] flex justify-center items-center gap-x-2 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              onClick={handlePrevWeek}
            >
              <FontAwesomeIcon icon={faChevronLeft} size="sm" />
              Prev
            </button>

            {/* Display current week */}
            <span
              onClick={handleThisWeek}
              className="max-w-[150px] px-4 py-2 rounded cursor-pointer bg-gray-300 hover:bg-gray-400"
            >{`Week ${selectedWeek}`}</span>

            {/* Next week button */}
            <button
              className="max-w-[100px] flex justify-center items-center gap-x-2 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              onClick={handleNextWeek}
            >
              Next
              <FontAwesomeIcon icon={faChevronRight} size="sm" />
            </button>
          </div>

          {/* List of days */}
          <div className="w-full flex flex-col justify-center items-center gap-y-[10px]">
            {daysOfWeek.map((day, index) => (
              <div
                key={index}
                className="w-[50%] min-w-[250px] h-[75px] rounded-lg cursor-pointer bg-white shadow-md hover:shadow-xl transition-all duration-300"
              >
                <Link
                  to={`/dashboard/workouts/${selectedWorkout.id}/week/${selectedWeek}/${day}`}
                  className="w-full h-full flex flex-row justify-start items-center"
                >
                  <div
                    className="w-[50px] h-[50px] flex justify-center items-center mx-4 border border-primary rounded-full"
                    onClick={() => handleDayClick(day)}
                  >
                    <span className="text-lg capitalize font-bold">{day.slice(0, 3)}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Display the list of workouts when no workout is selected
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <button
            className="min-w-[250px] px-4 py-4 rounded flex items-center justify-center gap-x-2 text-white bg-green-500 hover:bg-green-500/90 cursor-pointer shadow-md"
            onClick={showModal}
          >
            <FontAwesomeIcon icon={faPlus} size="sm" />
            <span className="font-semibold">Add a Workout</span>
          </button>
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="h-[200px] grid place-items-center rounded cursor-pointer bg-white shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => handleWorkoutClick(workout)}
            >
              <span className="text-xl font-bold">{workout.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Create new workout form */}
      <Modal isVisible={isModalVisible} hideModal={hideModal}>
        <div className="flex flex-col items-center">
          <input
            type="text"
            className="w-[75%] text-base p-3 border border-secondary rounded mb-4 focus:outline-none"
            placeholder="Workout Name"
            value={newWorkoutName}
            onChange={handleNewWorkoutNameChange}
          />
          <button
            onClick={() => {
              handleSaveNewWorkout();
              hideModal();
            }}
            className="min-w-[135px] px-4 py-2 rounded flex items-center justify-center gap-x-2 text-white bg-green-500 hover:bg-green-500/90 cursor-pointer"
          >
            <FontAwesomeIcon icon={faPlus} size="sm" />
            <span className="font-semibold">Create Workout</span>
          </button>
        </div>
      </Modal>
    </div>
  );
}
