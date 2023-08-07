/* eslint-disable no-unused-vars */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

// Components
import Modal from "../../components/Modal";

// Material Tailwind
import { Button, ButtonGroup } from "@material-tailwind/react";

// Icons
import {
  faArrowLeftLong,
  faChevronLeft,
  faChevronRight,
  faPencil,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  // For editing a workout
  const [isEdit, setIsEdit] = useState(false);
  const [updatedName, setUpdatedName] = useState("");

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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

  const handleNameUpdate = (event) => {
    setUpdatedName(event.target.value);
  };

  // Creating a new workout
  const handleSaveNewWorkout = async () => {
    if (newWorkoutName.trim() !== "") {
      try {
        // Send POST request to server
        const response = await axios.post(`/api/workouts/${currentUser.id}`, {
          name: newWorkoutName.trim(),
          userId: currentUser.id,
        });

        // Extract the data from the response
        const data = response.data;

        // Add the new workout to the workouts state and select it
        setSelectedWorkout(data);
        setWorkouts((prevWorkouts) => [...prevWorkouts, data]);
        setNewWorkoutName("");
      } catch (error) {
        console.log("Error saving new workout:", error);
      }
    }
  };

  // Updating an existing workout
  const handleUpdateWorkout = async (workout) => {
    const targetId = workout.id;
    try {
      const response = await axios.put(`/api/workouts/${targetId}`, {
        name: updatedName,
      });

      // Update the states
      const updatedWorkouts = workouts.map((workout) =>
        workout.id === targetId ? { ...workout, name: updatedName } : workout
      );
      setWorkouts(updatedWorkouts);

      setSelectedWorkout(response.data);
      setUpdatedName("");

      console.log("Updated workout:", response.data);
    } catch (error) {
      console.error("Error updating workout:", error);
    }
  };

  // Deleting an existing workout
  const handleDeleteWorkout = async (workout) => {
    // Make a DELETE request to the backend API to delete the workout
    const targetId = workout.id;
    try {
      const response = await axios.delete(`/api/workouts/${targetId}`);

      // After deleting a workout, update the state
      setWorkouts(workouts.filter((element) => element.id !== targetId));
      setSelectedWorkout(null);

      console.log("Workout deleted:", response.data);
    } catch (error) {
      console.error("Error deleting workout:", error);
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
        <div className="w-full h-full flex flex-col items-center px-6 sm:px-24 py-4">
          {/* Workout header */}
          <div className="w-full sm:w-[75%] flex flex-row justify-between items-center p-4 mt-6 bg-white shadow-md rounded">
            {/* Go back button */}
            <button
              onClick={() => {
                setSelectedWorkout(null);
                setIsEdit(false);
              }}
              className="p-3 rounded flex items-center justify-center gap-x-2 cursor-pointer hover:bg-gray-300"
            >
              <FontAwesomeIcon icon={faArrowLeftLong} />
              <span className="hidden sm:inline-block text-md font-light">Workouts</span>
            </button>

            {/* Edit workout name */}
            {isEdit ? (
              <div className="flex flex-col sm:flex-row">
                <input
                  type="text"
                  id="updatedName"
                  value={updatedName}
                  placeholder={selectedWorkout.name}
                  onChange={handleNameUpdate}
                  className="min-w-[100px] max-w-[150px] px-2 py-1 mb-0 border border-secondary border-r-1 sm:border-r-0 focus:outline-none"
                />
                <button
                  onClick={() => {
                    handleUpdateWorkout(selectedWorkout);
                    setIsEdit(false);
                  }}
                  className="px-2 py-1 bg-blue-500 border border-secondary text-white hover:bg-blue-500/90"
                >
                  Update
                </button>
              </div>
            ) : (
              <span className="text-[18px] sm:text-[24px] mb-0">{selectedWorkout.name}</span>
            )}

            {/* Edit and delete options */}
            <div className="flex justify-center items-center gap-x-2">
              <button
                onClick={() => setIsEdit(!isEdit)}
                className="w-[40px] h-[40px] grid place-items-center rounded-full cursor-pointer text-black hover:bg-orange-300 hover:text-white transition-all duration-200"
              >
                <FontAwesomeIcon icon={faPencil} />
              </button>

              <button
                onClick={() => handleDeleteWorkout(selectedWorkout)}
                className="w-[40px] h-[40px] grid place-items-center rounded-full cursor-pointer text-black hover:bg-red-500 hover:text-white transition-all duration-200"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </div>

          {/* Week navigation */}
          <ButtonGroup variant="text" size="lg" ripple={false} className="my-6 divide-secondary">
            {/* Previous week button */}
            <Button
              onClick={handlePrevWeek}
              className="flex justify-center items-center gap-x-2 bg-gray-300 hover:bg-gray-400 text-primary active:bg-accent/60"
            >
              <FontAwesomeIcon icon={faChevronLeft} size="sm" />
              Prev
            </Button>

            {/* Display current week */}
            <Button
              onClick={handleThisWeek}
              className="bg-gray-300 hover:bg-gray-400 text-primary active:bg-accent/60"
            >{`Week ${selectedWeek}`}</Button>

            {/* Next week button */}
            <Button
              onClick={handleNextWeek}
              className="flex justify-center items-center gap-x-2 bg-gray-300 hover:bg-gray-400 text-primary active:bg-accent/60"
            >
              Next
              <FontAwesomeIcon icon={faChevronRight} size="sm" />
            </Button>
          </ButtonGroup>

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
          {workouts.length > 0 &&
            workouts.map((workout) => (
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
