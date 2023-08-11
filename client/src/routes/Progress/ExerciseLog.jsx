/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// API functions
import { getSets, createSet, updateSet, deleteSet } from "../../api/sets";
import { getExercise } from "../../api/exercises";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faPlus,
  faXmark,
  faCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

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

  useEffect(() => {
    // Fetch the log for the current exercise
    async function fetchData() {
      const allSets = await getSets(exerciseId);

      // Update state
      setLogData(allSets);

      const exercise = await getExercise(exerciseId);

      // Update state
      setCurrentExercise(exercise);
    }

    fetchData();
  }, []);

  // Create a set
  const handleCreateSet = async () => {
    const newSet = await createSet(newSetData);

    // Add the new set to the log
    setLogData([...logData, newSet]);

    // Reset the data state
    setNewSetData({
      reps: 0,
      weight: 0,
      date: "",
      exerciseId: exerciseId,
    });
  };

  // Update a Set
  const handleUpdateSet = async (setId, updatedSetData) => {
    const updatedSet = await updateSet(setId, updatedSetData);

    // Update state
    const updatedLogData = logData.map((set) =>
      set.id === setId ? updatedSet : set,
    );
    setLogData(updatedLogData);
  };

  // Delete a set
  const handleDeleteSet = async (setId) => {
    await deleteSet(setId);

    // Update state
    const updatedLogData = logData.filter((set) => set.id !== setId);
    setLogData(updatedLogData);
  };

  const TABLE_HEAD = ["Reps", "Weight", "Date", "Edit", "Delete"];

  return (
    <div className="flex h-full w-full flex-col items-center">
      {/* Header */}
      <div className="flex w-full flex-col items-center justify-center p-4">
        <span className="h2">Progress Tracker</span>

        {/* Display the exercise name */}
        {currentExercise && (
          <span className="h3 text-center">{currentExercise.name} Log</span>
        )}

        {/* Add a set button */}
        <button
          onClick={showModal}
          className="flex items-center justify-center gap-x-2 rounded bg-accent px-2 py-1 text-white hover:bg-accent/90 sm:px-4 sm:py-3"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span className="text-lg font-semibold">Add Set</span>
        </button>
      </div>

      <div className="w-full px-6 py-4 sm:px-24 ">
        <div className="overflow-x-auto">
          <table className="w-full rounded bg-gray-100 text-left shadow-md dark:bg-primary">
            {/* Column names */}
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={index}
                    className="border-b border-gray-400 bg-gray-300 p-2 dark:bg-gray-600"
                  >
                    <span className="leading-none text-primary opacity-70 dark:text-white">
                      {head}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Sets */}
            <tbody>
              {logData != null && logData.length > 0 ? (
                logData.map((set, index) => {
                  const classes = "p-2";

                  return (
                    <tr key={index}>
                      {/* Reps column */}
                      <td className={classes}>
                        {/* Edit reps */}
                        {editState[set.id] ? (
                          <input
                            type="number"
                            value={set.reps}
                            onChange={(e) =>
                              setLogData((prevData) => {
                                const newData = [...prevData];
                                newData[index].reps = e.target.value;
                                return newData;
                              })
                            }
                            className="max-w-[150px] rounded border px-2 py-1 focus:outline-none dark:text-primary"
                          />
                        ) : (
                          <span className="text-secondary dark:text-white">
                            {set.reps}
                          </span>
                        )}
                      </td>

                      {/* Weight column */}
                      <td className={classes}>
                        {/* Edit weight */}
                        {editState[set.id] ? (
                          <input
                            type="number"
                            value={set.weight}
                            onChange={(e) =>
                              setLogData((prevData) => {
                                const newData = [...prevData];
                                newData[index].weight = e.target.value;
                                return newData;
                              })
                            }
                            className="max-w-[150px] rounded border px-2 py-1 focus:outline-none dark:text-primary"
                          />
                        ) : (
                          <span className="text-secondary dark:text-white">
                            {set.weight}
                          </span>
                        )}
                      </td>

                      {/* Date column */}
                      <td className={classes}>
                        {/* Edit date */}
                        {editState[set.id] ? (
                          <input
                            type="date"
                            value={set.date}
                            onChange={(e) =>
                              setLogData((prevData) => {
                                const newData = [...prevData];
                                newData[index].date = e.target.value;
                                return newData;
                              })
                            }
                            className="max-w-[150px] rounded border px-2 py-1 focus:outline-none dark:text-primary"
                          />
                        ) : (
                          <span className="text-secondary dark:text-white">
                            {set.date}
                          </span>
                        )}
                      </td>

                      {/* Edit buttons */}
                      <td className={classes}>
                        {editState[set.id] ? (
                          <div className="flex flex-row items-center justify-start gap-x-2">
                            {/* Cancel edit button */}
                            <button
                              onClick={() => toggleEditState(set.id)}
                              className="grid place-items-center rounded bg-red-500 p-3 text-white hover:bg-red-500/90"
                            >
                              <FontAwesomeIcon icon={faXmark} />
                            </button>

                            {/* Confirm edit button */}
                            <button
                              onClick={() => saveSetData(set.id, set)}
                              className="grid place-items-center rounded bg-green-500 p-3 text-white hover:bg-green-500/90"
                            >
                              <FontAwesomeIcon icon={faCheck} />
                            </button>
                          </div>
                        ) : (
                          // Begin editing button
                          <button
                            onClick={() => toggleEditState(set.id)}
                            className="grid place-items-center rounded bg-orange-500 p-3 text-white hover:bg-orange-500/90"
                          >
                            <FontAwesomeIcon icon={faPencil} />
                          </button>
                        )}
                      </td>

                      {/* Delete button */}
                      <td className={classes}>
                        <button
                          onClick={() => handleDeleteSet(set.id)}
                          className="grid place-items-center rounded bg-red-500 p-3 text-white hover:bg-red-500/90"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="border-b border-blue-gray-50 p-4">
                    <span className="text-secondary">No records found..</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
            onChange={handleInputChange}
            className="w-[200px] rounded border px-2 py-1 focus:outline-none dark:text-primary"
          />

          {/* Weight input */}
          <input
            type="number"
            id="weight"
            name="weight"
            placeholder="Weight"
            onChange={handleInputChange}
            className="w-[200px] rounded border px-2 py-1 focus:outline-none dark:text-primary"
          />

          {/* Date input */}
          <input
            type="date"
            id="date"
            name="date"
            onChange={handleInputChange}
            className="w-[200px] rounded border px-2 py-1 focus:outline-none dark:text-primary"
          />

          {/* Submit button */}
          <button
            onClick={() => {
              handleCreateSet();
              hideModal();
            }}
            className="flex w-[200px] cursor-pointer items-center justify-center gap-x-2 rounded bg-accent px-4 py-2 text-white hover:bg-accent/90"
          >
            <FontAwesomeIcon icon={faPlus} size="sm" />
            <span className="font-semibold">Add Set</span>
          </button>
        </div>
      </Modal>
    </div>
  );
}
