/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

// Components
import Modal from "../../components/Modal";

// Material Tailwind
import { Input, Textarea, Chip, Button } from "@material-tailwind/react";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faXmark,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Progress() {
  // Get the current user
  const { currentUser } = useContext(AuthContext);

  // Exercise form state
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseDetails, setExerciseDetails] = useState("");

  // Exercises
  const [exercises, setExercises] = useState([]);

  // Modal state and controls
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    // Check if user is logged in and get the userId from the currentUser object
    if (currentUser) {
      const userId = currentUser.id;

      // Fetch exercises data from the server for the specified user
      axios.get(`/api/exercises/${userId}`).then((response) => {
        const data = response.data;
        setExercises(data);
      });
    }
  }, [currentUser]);

  return (
    <>
      <div className="flex h-full w-full flex-col items-center">
        <div className="w-full p-4 text-center">
          <span className="h2">Progress Tracker</span>
        </div>
        {/* Add a new exercise */}
        {/* <div className="">
          <button
            onClick={showModal}
            className="flex items-center justify-center gap-x-2 rounded bg-accent px-2 py-1 text-white hover:bg-accent/90 sm:px-4 sm:py-3"
          >
            <FontAwesomeIcon icon={faPlus} />
            <span className="text-lg font-semibold">Log an Exercise</span>
          </button>
        </div> */}

        {/* Display user's exercises */}
        {exercises.length > 0 ? (
          <div className="mt-4 grid gap-4 px-6 py-4 sm:px-24 md:grid-cols-2 lg:grid-cols-3">
            {exercises.map((exercise) => (
              <Link
                to={`/dashboard/progress/${exercise.id}`}
                key={exercise.id}
                className="rounded-lg bg-white p-4 shadow-lg"
              >
                {/* Exercise name and delete button
                <div className="flex w-full flex-row items-center justify-between">
                  <span className="text-xl font-bold">{exercise.name}</span>
                  <button className="grid h-[40px] w-[40px] cursor-pointer place-items-center rounded-full text-black transition-all duration-200 hover:bg-red-500 hover:text-white">
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </div> */}

                <span className="text-xl font-bold">{exercise.name}</span>

                {/* Exercise info */}
                <div className="my-4 flex flex-row flex-wrap items-center gap-x-4 gap-y-2">
                  <Chip
                    variant="ghost"
                    size="sm"
                    color="orange"
                    value={exercise.type}
                  />
                  <Chip
                    variant="ghost"
                    size="sm"
                    color="orange"
                    value={exercise.muscle}
                  />
                  <Chip
                    variant="ghost"
                    size="sm"
                    color="orange"
                    value={exercise.equipment}
                  />
                </div>

                {/* Button to open exercise modal */}
                <Button
                  ripple={false}
                  variant="filled"
                  color="orange"
                  className="flex items-center justify-center gap-x-2"
                >
                  <span className="text-white">Log</span>
                  <FontAwesomeIcon icon={faArrowRightLong} />
                </Button>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex flex-col">
              <span className="h3 mb-0">No exercises found...</span>
              <span className="text-center text-xl">
                Add an exercise{" "}
                <Link
                  to="/dashboard/workouts"
                  className="text-blue-500 hover:underline"
                >
                  here
                </Link>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Add an exercise form */}
      <Modal isVisible={isModalVisible} hideModal={hideModal}>
        <div className="flex flex-col items-center gap-y-4 px-12">
          {/* Exercise name input */}
          <Input
            color="orange"
            label="Name"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            className="font-poppins text-base text-secondary"
          />

          {/* Exercise description input */}
          <Textarea
            color="orange"
            label="Details"
            value={exerciseDetails}
            onChange={(e) => setExerciseDetails(e.target.value)}
            className="font-poppins text-base text-secondary"
          />

          {/* Submit button */}
          <button
            onClick={() => {
              hideModal();
            }}
            className="flex min-w-[135px] cursor-pointer items-center justify-center gap-x-2 rounded bg-accent px-4 py-2 text-white hover:bg-accent/90"
          >
            <FontAwesomeIcon icon={faPlus} size="sm" />
            <span className="font-semibold">Add Exercise</span>
          </button>
        </div>
      </Modal>
    </>
  );
}
