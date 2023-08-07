import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

// Components
import Modal from "../../components/Modal";

// Material Tailwind
import { Input, Textarea, Chip, Button } from "@material-tailwind/react";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

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

      // Fetch exercises data from the server for the specified user, workout, and day
      axios
        .get(`/api/exercises/${userId}`)
        .then((response) => setExercises(response))
        .catch((error) => console.log(error));
    }
  }, [currentUser]);

  // const handleAddToMyWorkout = (workout) => {
  //   // Make a POST request to the backend API to add the workout to the user's exercises
  //   axios
  //     .post(
  //       "/api/exercises/",
  //       {
  //         userId: currentUser.id,
  //         day: day,
  //         name: workout.name,
  //         type: workout.type,
  //         muscle: workout.muscle,
  //         equipment: workout.equipment,
  //         difficulty: workout.difficulty,
  //         details: workout.instructions,
  //         week: week,
  //         workoutId: workoutId,
  //       },
  //       { withCredentials: true },
  //     )

  //     .then((response) => {
  //       console.log("Workout added to My Workout:", response.data);
  //       // After adding a new exercise, update the exercises in the ExerciseContext
  //       setExercises((prevExercises) => [...prevExercises, response.data]);
  //       // Call the callback function to inform UserExercisesList that it needs to update
  //       onExerciseAdd();
  //     })
  //     .catch((error) => {
  //       console.error("Error adding workout:", error);
  //     });
  // };

  return (
    <>
      <div className="flex h-full w-full flex-col items-center">
        <div className="w-full p-4 text-center">
          <span className="h2">Progress Tracker</span>
        </div>
        <div className="">
          <button
            onClick={showModal}
            className="flex items-center justify-center gap-x-2 rounded bg-accent px-2 py-1 text-white hover:bg-accent/90 sm:px-4 sm:py-3"
          >
            <FontAwesomeIcon icon={faPlus} />
            <span className="text-lg font-semibold">Log an Exercise</span>
          </button>
        </div>
        {exercises.length > 0 &&
          exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="rounded-lg bg-white p-4 shadow-lg"
            >
              {/* Exercise name and delete button */}
              <div className="flex w-full flex-row items-center justify-between">
                <span className="text-xl font-bold">{exercise.name}</span>
                <button className="grid h-[40px] w-[40px] cursor-pointer place-items-center rounded-full text-black transition-all duration-200 hover:bg-red-500 hover:text-white">
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              {/* Exercise info */}
              <div className="my-4 flex flex-row flex-wrap items-center gap-x-4 gap-y-2">
                <Chip
                  variant="ghost"
                  size="sm"
                  color="cyan"
                  value={exercise.type}
                />
                <Chip
                  variant="ghost"
                  size="sm"
                  color="cyan"
                  value={exercise.muscle}
                />
                <Chip
                  variant="ghost"
                  size="sm"
                  color="cyan"
                  value={exercise.equipment}
                />
              </div>

              {/* Button to open exercise modal */}
              <Button
                
                ripple={false}
                variant="filled"
                color="cyan"
                className="flex items-center justify-center gap-x-2"
              >
                <span className="text-white">View Info</span>
                <FontAwesomeIcon icon={faArrowRightLong} />
              </Button>
            </div>
          ))}
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
            className="flex min-w-[135px] cursor-pointer items-center justify-center gap-x-2 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-500/90"
          >
            <FontAwesomeIcon icon={faPlus} size="sm" />
            <span className="font-semibold">Add Exercise</span>
          </button>
        </div>
      </Modal>
    </>
  );
}
