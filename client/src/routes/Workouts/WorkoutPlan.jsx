import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

// API functions
import {
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from "../../api/workouts";

// Components
import Modal from "../../components/Modal";

// Material Tailwind
import { Button, ButtonGroup, Input } from "@material-tailwind/react";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faChevronLeft,
  faChevronRight,
  faPencil,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function WorkoutPlan() {
  const { currentUser } = useContext(AuthContext);

  // State
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [newWorkoutName, setNewWorkoutName] = useState("");

  // For editing a workout
  const [isEdit, setIsEdit] = useState(false);
  const [updatedName, setUpdatedName] = useState("");

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const handleWorkoutClick = (workout) => {
    setSelectedWorkout(workout);
  };

  const handlePrevWeek = () => {
    setSelectedWeek((prevWeek) => (prevWeek === 1 ? 1 : prevWeek - 1));
  };

  const handleNextWeek = () => {
    setSelectedWeek((prevWeek) => (prevWeek === 4 ? 4 : prevWeek + 1));
  };

  // Get all the workouts
  useEffect(() => {
    async function fetchWorkouts() {
      // Check if user is logged in and get the userId from the currentUser object
      if (currentUser) {
        const userId = currentUser.id;
        // Fetch workouts from the server for the specified user
        const userWorkouts = await getWorkouts(userId);
        setWorkouts(userWorkouts);
        console.log("Workouts fetched");
      }
    }

    fetchWorkouts();
  }, [currentUser]);

  // Create a new workout
  const handleCreateWorkout = async () => {
    if (newWorkoutName.trim() !== "") {
      // Get current user
      const userId = currentUser.id;

      const newName = newWorkoutName.trim();

      // Get the new workout back from the server
      const newWorkout = await createWorkout(userId, newName);

      // Add the new workout to the workouts state and select it
      setNewWorkoutName("");
      setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);
      setSelectedWorkout(newWorkout);
    }
  };

  // Updating an existing workout
  const handleUpdateWorkout = async (workout) => {
    if (updatedName.trim() !== "") {
      // Get workoutId
      const targetId = workout.id;

      // Get the updated workout back from the server
      const updatedWorkout = await updateWorkout(targetId, updatedName);

      // Update the states
      const updatedWorkouts = workouts.map((workout) =>
        workout.id === targetId ? { ...workout, name: updatedName } : workout,
      );

      setUpdatedName("");
      setWorkouts(updatedWorkouts);
      setSelectedWorkout(updatedWorkout);
    }
  };

  // Deleting an existing workout
  const handleDeleteWorkout = async (workout) => {
    // Get workoutId
    const targetId = workout.id;

    // Make a DELETE request to the backend API to delete the workout
    await deleteWorkout(targetId);

    // After deleting a workout, update the state
    setWorkouts(workouts.filter((workout) => workout.id !== targetId));
    setSelectedWorkout(null);
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
            <div className="mt-6 flex w-full flex-row items-center justify-between rounded bg-white p-4 shadow-md dark:bg-primary sm:w-[75%]">
              {/* Go back button */}
              <button
                onClick={() => {
                  setSelectedWorkout(null);
                  setIsEdit(false);
                }}
                className="flex cursor-pointer items-center justify-center gap-x-2 rounded p-3 hover:bg-gray-300 dark:hover:bg-secondary"
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
                    onChange={(e) => setUpdatedName(e.target.value)}
                    className="border-r-1 mb-0 max-w-[150px] rounded-none border border-accent px-2 py-1 focus:border-accent focus:outline-none dark:text-primary sm:rounded-l sm:border-r-0"
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
                  className="grid h-[40px] w-[40px] cursor-pointer place-items-center rounded-full text-black transition-all duration-200 hover:bg-accent hover:text-white dark:text-white"
                >
                  <FontAwesomeIcon icon={faPencil} />
                </button>

                <button
                  onClick={() => {
                    setIsEdit(false);
                    handleDeleteWorkout(selectedWorkout);
                  }}
                  className="grid h-[40px] w-[40px] cursor-pointer place-items-center rounded-full text-black transition-all duration-200 hover:bg-red-500 hover:text-white dark:text-white"
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
                className="flex items-center justify-center gap-x-2 bg-gray-300 font-poppins text-primary hover:bg-gray-400 active:bg-accent"
              >
                <FontAwesomeIcon icon={faChevronLeft} size="sm" />
                Prev
              </Button>

              {/* Display current week */}
              <Button
                onClick={() => setSelectedWeek(1)}
                className="bg-gray-300 font-poppins text-primary hover:bg-gray-400 active:bg-accent"
              >{`Week ${selectedWeek}`}</Button>

              {/* Next week button */}
              <Button
                onClick={handleNextWeek}
                className="flex items-center justify-center gap-x-2 bg-gray-300 font-poppins text-primary hover:bg-gray-400 active:bg-accent"
              >
                Next
                <FontAwesomeIcon icon={faChevronRight} size="sm" />
              </Button>
            </ButtonGroup>
            {/*flex w-full flex-col items-center justify-center gap-y-[10px] */}

            {/* List of days */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {daysOfWeek.map((day, index) => (
                <div
                  key={index}
                  className={`${
                    index === daysOfWeek.length - 1
                      ? "col-span-1 h-[100px] md:col-span-2 xl:col-span-3"
                      : "h-[100px] w-[300px] md:h-[200px] md:w-[200px]"
                  } grid cursor-pointer place-items-center rounded-lg bg-white shadow-md transition-all duration-300 hover:text-accent hover:shadow-xl dark:bg-primary dark:hover:bg-primary/60`}
                >
                  <Link
                    to={`/dashboard/workouts/${selectedWorkout.id}/week/${selectedWeek}/${day}`}
                    className="flex h-full w-full flex-row items-center justify-center"
                  >
                    <span className="text-lg font-bold uppercase tracking-wider sm:text-xl">
                      {day.slice(0, 3)}
                    </span>
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
                  onClick={() => handleWorkoutClick(workout)}
                  className="grid h-[200px] cursor-pointer place-items-center rounded bg-white shadow-md transition-all duration-300 hover:text-accent hover:shadow-xl dark:bg-primary dark:hover:bg-primary/60"
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
              onChange={(e) => setNewWorkoutName(e.target.value)}
              className="font-poppins text-base text-secondary dark:text-white"
            />
          </div>

          {/* Create the workout */}
          <button
            onClick={() => {
              handleCreateWorkout();
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
