import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

// Components
import Modal from "../../components/Modal";

// Material Tailwind
import { Button, ButtonGroup, Input } from "@material-tailwind/react";

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
  const [newWorkoutName, setNewWorkoutName] = useState("");

  // For editing a workout
  const [isEdit, setIsEdit] = useState(false);
  const [updatedName, setUpdatedName] = useState("");

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

  const handleThisWeek = () => {
    setSelectedWeek(1);
  };

  const handleNextWeek = () => {
    setSelectedWeek((prevWeek) => (prevWeek === 4 ? 4 : prevWeek + 1));
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
        workout.id === targetId ? { ...workout, name: updatedName } : workout,
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
    <>
      <div className="flex h-full w-full flex-col items-center">
        {/* Render the "Workout" heading only if no workout is selected */}
        {!selectedWorkout && (
          <div className="w-full p-4 text-center">
            <span className="h2">Your Workouts</span>
          </div>
        )}

        {selectedWorkout ? (
          // Display only the selected workout
          <div className="flex h-full w-full flex-col items-center px-6 py-4 sm:px-24">
            {/* Workout header */}
            <div className="mt-6 flex w-full flex-row items-center justify-between rounded bg-white p-4 shadow-md sm:w-[75%]">
              {/* Go back button */}
              <button
                onClick={() => {
                  setSelectedWorkout(null);
                  setIsEdit(false);
                }}
                className="flex cursor-pointer items-center justify-center gap-x-2 rounded p-3 hover:bg-gray-300"
              >
                <FontAwesomeIcon icon={faArrowLeftLong} />
                <span className="text-md hidden font-light sm:inline-block">
                  Workouts
                </span>
              </button>

              {/* Edit workout name */}
              {isEdit ? (
                <div className="flex flex-col gap-y-2 sm:flex-row">
                  <input
                    type="text"
                    id="updatedName"
                    value={updatedName}
                    placeholder={selectedWorkout.name}
                    onChange={handleNameUpdate}
                    className="border-r-1 mb-0 max-w-[150px] rounded-none  border border-secondary px-2 py-1 focus:border-accent focus:outline-none sm:rounded-l sm:border-r-0"
                  />

                  {/* Confirm edit */}
                  <button
                    onClick={() => {
                      handleUpdateWorkout(selectedWorkout);
                      setIsEdit(false);
                    }}
                    className="rounded-none border border-accent bg-accent px-2 py-1 text-sm text-white hover:bg-accent/90 sm:rounded-r"
                  >
                    Update
                  </button>
                </div>
              ) : (
                <span className="mb-0 text-[18px] sm:text-[24px]">
                  {selectedWorkout.name}
                </span>
              )}

              {/* Edit and delete options */}
              <div className="flex items-center justify-center gap-x-2">
                <button
                  onClick={() => setIsEdit(!isEdit)}
                  className="grid h-[40px] w-[40px] cursor-pointer place-items-center rounded-full text-black transition-all duration-200 hover:bg-accent hover:text-white"
                >
                  <FontAwesomeIcon icon={faPencil} />
                </button>

                <button
                  onClick={() => {
                    setIsEdit(!isEdit);
                    handleDeleteWorkout(selectedWorkout);
                  }}
                  className="grid h-[40px] w-[40px] cursor-pointer place-items-center rounded-full text-black transition-all duration-200 hover:bg-red-500 hover:text-white"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            </div>

            {/* Week navigation */}
            <ButtonGroup
              variant="text"
              size="lg"
              ripple={false}
              className="my-6 divide-secondary"
            >
              {/* Previous week button */}
              <Button
                onClick={handlePrevWeek}
                className="flex items-center justify-center gap-x-2 bg-gray-300 text-primary hover:bg-gray-400 active:bg-accent/60"
              >
                <FontAwesomeIcon icon={faChevronLeft} size="sm" />
                Prev
              </Button>

              {/* Display current week */}
              <Button
                onClick={handleThisWeek}
                className="bg-gray-300 text-primary hover:bg-gray-400 active:bg-accent/60"
              >{`Week ${selectedWeek}`}</Button>

              {/* Next week button */}
              <Button
                onClick={handleNextWeek}
                className="flex items-center justify-center gap-x-2 bg-gray-300 text-primary hover:bg-gray-400 active:bg-accent/60"
              >
                Next
                <FontAwesomeIcon icon={faChevronRight} size="sm" />
              </Button>
            </ButtonGroup>

            {/* List of days */}
            <div className="flex w-full flex-col items-center justify-center gap-y-[10px]">
              {daysOfWeek.map((day, index) => (
                <div
                  key={index}
                  className="h-[75px] w-[50%] min-w-[250px] cursor-pointer rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl"
                >
                  <Link
                    to={`/dashboard/workouts/${selectedWorkout.id}/week/${selectedWeek}/${day}`}
                    className="flex h-full w-full flex-row items-center justify-start"
                  >
                    <div className="mx-4 flex h-[50px] w-[50px] items-center justify-center rounded-full border border-primary">
                      <span className="text-lg font-bold capitalize">
                        {day.slice(0, 3)}
                      </span>
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
              onClick={showModal}
              className="flex min-w-[250px] cursor-pointer items-center justify-center gap-x-2 rounded bg-accent px-4 py-4 text-white shadow-md transition-all duration-300 hover:bg-accent/90 hover:shadow-xl "
            >
              <FontAwesomeIcon icon={faPlus} size="sm" />
              <span className="font-semibold">Add Workout</span>
            </button>
            {workouts.length > 0 &&
              workouts.map((workout) => (
                <div
                  key={workout.id}
                  className="grid h-[200px] cursor-pointer place-items-center rounded bg-white shadow-md transition-all duration-300 hover:shadow-xl"
                  onClick={() => handleWorkoutClick(workout)}
                >
                  <span className="text-xl font-bold">{workout.name}</span>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Create new workout form */}
      <Modal isVisible={isModalVisible} hideModal={hideModal}>
        <div className="flex flex-col items-center gap-y-2 sm:gap-y-4">
          {/* Workout name input */}
          <div className="w-[75%]">
            <Input
              color="orange"
              label="Workout Name"
              value={newWorkoutName}
              onChange={handleNewWorkoutNameChange}
              className="font-poppins text-base text-secondary"
            />
          </div>

          {/* Create the workout */}
          <button
            onClick={() => {
              handleSaveNewWorkout();
              hideModal();
            }}
            className="flex w-[75%] cursor-pointer items-center justify-center gap-x-2 rounded bg-accent px-4 py-2 text-white hover:bg-accent/90"
          >
            <FontAwesomeIcon icon={faPlus} size="sm" />
            <span className="font-semibold">Create Workout</span>
          </button>
        </div>
      </Modal>
    </>
  );
}
