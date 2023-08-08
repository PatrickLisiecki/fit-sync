import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Material Tailwind
import { Chip } from "@material-tailwind/react";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";

// Components
import Modal from "../../components/Modal";

export default function ExerciseLog() {
  const { exerciseId } = useParams();
  const [currentExercise, setCurrentExercise] = useState(null);
  const [logData, setLogData] = useState(null);

  // Form for adding a set
  const [newSetData, setNewSetData] = useState({
    reps: 0,
    weight: 0,
    date: "",
    exerciseId: exerciseId,
  });

  const handleInputChange = (e) => {
    setNewSetData((newSetData) => {
      return {
        ...newSetData,
        [e.target.name]: e.target.value,
      };
    });
  };

  // Modal state and controls
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  // Editable state for each set
  const [editState, setEditState] = useState({});

  // Function to toggle edit state for a set
  const toggleEditState = (setId) => {
    setEditState((prevEditState) => ({
      ...prevEditState,
      [setId]: !prevEditState[setId],
    }));
  };

  // Save edited set data
  const saveSetData = (setId, updatedSetData) => {
    handleUpdateSet(setId, updatedSetData);
    toggleEditState(setId); // Turn off edit mode after saving
  };

  // Fetch the exercise data
  const fetchExercise = () => {
    axios
      .get(`/api/exercises/exercise/${exerciseId}`)
      .then((response) => {
        console.log(response.data);
        setCurrentExercise(response.data);
      })
      .catch((error) => {
        console.error("Error fetching exercise:", error);
      });
  };

  // Fetch the log for the current exercise
  const fetchSets = () => {
    axios
      .get(`/api/sets/${exerciseId}`)
      .then((response) => {
        console.log(response.data);
        setLogData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sets:", error);
      });
  };

  useEffect(() => {
    fetchSets();
    fetchExercise();
  }, []);

  // Create a Set
  const handleCreateSet = () => {
    axios
      .post(`/api/sets/`, newSetData)
      .then((response) => {
        setLogData([...logData, response.data]);
        setNewSetData({
          reps: 0,
          weight: 0,
          date: "",
          exerciseId: exerciseId,
        });
      })
      .catch((error) => {
        console.error("Error creating set:", error);
      });
  };

  // Update a Set
  const handleUpdateSet = (setId, updatedSetData) => {
    axios
      .put(`/api/sets/${setId}`, updatedSetData)
      .then((response) => {
        const updatedLogData = logData.map((set) =>
          set.id === setId ? response.data : set,
        );
        setLogData(updatedLogData);
      })
      .catch((error) => {
        console.error("Error updating set:", error);
      });
  };

  // Delete a set
  const handleDeleteSet = (setId) => {
    axios
      .delete(`/api/sets/${setId}`)
      .then(() => {
        const updatedLogData = logData.filter((set) => set.id !== setId);
        setLogData(updatedLogData);
      })
      .catch((error) => {
        console.error("Error deleting set:", error);
      });
  };

  return (
    <div className="flex h-full w-full flex-col items-center">
      {/* Header */}
      <div className="w-full p-4 text-center">
        <span className="h2">Progress Tracker</span>
      </div>

      {/* Display the exercise name */}
      {currentExercise && (
        <div className="w-full p-4 text-center">
          <span className="h3">{currentExercise.name} Log</span>
        </div>
      )}

      {/* Add a set button */}
      <div className="flex w-full items-center justify-center p-4">
        <button
          onClick={showModal}
          className="flex items-center justify-center gap-x-2 rounded bg-accent px-2 py-1 text-white hover:bg-accent/90 sm:px-4 sm:py-3"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span className="text-lg font-semibold">Add a Set</span>
        </button>
      </div>

      {/* Sets for an exercise */}
      <div className="grid gap-4 px-6 py-4 sm:flex-row sm:px-24 md:grid-cols-2 lg:grid-cols-3">
        {logData ? (
          logData.map((set, index) => (
            <div key={index} className="rounded-lg bg-white p-4 shadow-lg">
              {/* Exercise info */}
              <div className="my-4 flex flex-row flex-wrap items-center gap-x-4 gap-y-2">
                {/* Render editable fields or chips */}
                {editState[set.id] ? (
                  <>
                    {/* Edit reps */}
                    <input
                      type="number"
                      className="max-w-[175px] rounded border px-2 py-1 focus:outline-none"
                      value={set.reps}
                      onChange={(e) =>
                        setLogData((prevData) => {
                          const newData = [...prevData];
                          newData[index].reps = e.target.value;
                          return newData;
                        })
                      }
                    />

                    {/* Edit weight */}
                    <input
                      type="number"
                      className="max-w-[175px] rounded border px-2 py-1 focus:outline-none"
                      value={set.weight}
                      onChange={(e) =>
                        setLogData((prevData) => {
                          const newData = [...prevData];
                          newData[index].weight = e.target.value;
                          return newData;
                        })
                      }
                    />

                    {/* Edit date */}
                    <input
                      type="date"
                      className="w-[175px] rounded border px-2 py-1 focus:outline-none"
                      value={set.date}
                      onChange={(e) =>
                        setLogData((prevData) => {
                          const newData = [...prevData];
                          newData[index].date = e.target.value;
                          return newData;
                        })
                      }
                    />
                  </>
                ) : (
                  <>
                    {/* Set data */}
                    <Chip
                      variant="ghost"
                      size="lg"
                      color="orange"
                      value={`Reps: ${set.reps}`}
                    />
                    <Chip
                      variant="ghost"
                      size="lg"
                      color="orange"
                      value={`Weight: ${set.weight}`}
                    />
                    <Chip
                      variant="ghost"
                      size="lg"
                      color="orange"
                      value={`Date: ${set.date}`}
                    />
                  </>
                )}
              </div>

              {/* Update and Delete buttons */}
              <div className="flex flex-row gap-2">
                {/* Toggle edit mode */}
                <button
                  className={`${
                    editState[set.id]
                      ? "bg-red-500 hover:bg-red-500/90"
                      : "h-[40px] w-[40px] bg-orange-500 hover:bg-orange-500/90"
                  } rounded px-3 py-1 text-white`}
                  onClick={() => toggleEditState(set.id)}
                >
                  {editState[set.id] ? (
                    "Cancel"
                  ) : (
                    <FontAwesomeIcon icon={faPencil} />
                  )}
                </button>

                {/* Save button */}
                {editState[set.id] ? (
                  // Save the edited set
                  <button
                    className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-500/90"
                    onClick={() => saveSetData(set.id, set)}
                  >
                    Save
                  </button>
                ) : (
                  <>
                    {/* Delete button */}
                    <button
                      onClick={() => handleDeleteSet(set.id)}
                      className="h-[40px] w-[40px] rounded bg-red-500 px-3 py-1 text-white"
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex w-full items-center justify-center p-4">
            <span className="h3">No records found...</span>
          </div>
        )}
      </div>

      {/* Create set form */}
      <Modal isVisible={isModalVisible} hideModal={hideModal}>
        <div className="flex flex-col items-center gap-y-4 px-12">
          {/* Reps input */}
          <input
            type="number"
            id="reps"
            name="reps"
            placeholder="Reps"
            className="w-[200px] rounded border px-2 py-1 focus:outline-none"
            onChange={handleInputChange}
          />

          {/* Weight input */}
          <input
            type="number"
            id="weight"
            name="weight"
            placeholder="Weight"
            className="w-[200px] rounded border px-2 py-1 focus:outline-none"
            onChange={handleInputChange}
          />

          {/* Date input */}
          <input
            type="date"
            id="date"
            name="date"
            className="w-[200px] rounded border px-2 py-1 focus:outline-none"
            onChange={handleInputChange}
          />

          {/* Submit button */}
          <button
            onClick={() => {
              handleCreateSet();
              hideModal();
            }}
            className="flex min-w-[135px] cursor-pointer items-center justify-center gap-x-2 rounded bg-accent px-4 py-2 text-white hover:bg-accent/90"
          >
            <FontAwesomeIcon icon={faPlus} size="sm" />
            <span className="font-semibold">Add a Set</span>
          </button>
        </div>
      </Modal>
    </div>
  );
}
