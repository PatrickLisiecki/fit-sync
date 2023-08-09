import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faPlus,
  faBan,
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

  const TABLE_HEAD = ["Reps", "Weight", "Date", "Edit", "Delete"];

  return (
    <div className="flex h-full w-full flex-col items-center">
      {/* Header */}
      <div className="flex w-full flex-col items-center justify-center p-4">
        <span className="h2">Progress Tracker</span>

        {/* Display the exercise name */}
        {currentExercise && (
          <span className="h3">{currentExercise.name} Log</span>
        )}

        {/* Add a set button */}
        <button
          onClick={showModal}
          className="flex items-center justify-center gap-x-2 rounded bg-accent px-2 py-1 text-white hover:bg-accent/90 sm:px-4 sm:py-3"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span className="text-lg font-semibold">Add a Set</span>
        </button>
      </div>

      <div className="grid w-full place-items-center px-6 py-4 sm:px-24">
        <table className="w-full min-w-max table-auto rounded bg-gray-100 text-left shadow-md">
          {/* Column names */}
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={index}
                  className="border-b border-blue-gray-100 bg-gray-300 p-4"
                >
                  <span className="leading-none text-primary opacity-70">
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
                const isLast = index === logData.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    {/* Reps column */}
                    <td className={classes}>
                      {/* Edit reps */}
                      {editState[set.id] ? (
                        <input
                          type="number"
                          className="max-w-[150px] rounded border px-2 py-1 focus:outline-none"
                          value={set.reps}
                          onChange={(e) =>
                            setLogData((prevData) => {
                              const newData = [...prevData];
                              newData[index].reps = e.target.value;
                              return newData;
                            })
                          }
                        />
                      ) : (
                        <span className="text-secondary">{set.reps}</span>
                      )}
                    </td>

                    {/* Weight column */}
                    <td className={classes}>
                      {/* Edit weight */}
                      {editState[set.id] ? (
                        <input
                          type="number"
                          className="max-w-[150px] rounded border px-2 py-1 focus:outline-none"
                          value={set.weight}
                          onChange={(e) =>
                            setLogData((prevData) => {
                              const newData = [...prevData];
                              newData[index].weight = e.target.value;
                              return newData;
                            })
                          }
                        />
                      ) : (
                        <span className="text-secondary">{set.weight}</span>
                      )}
                    </td>

                    {/* Date column */}
                    <td className={classes}>
                      {/* Edit date */}
                      {editState[set.id] ? (
                        <input
                          type="date"
                          className="max-w-[150px] rounded border px-2 py-1 focus:outline-none"
                          value={set.date}
                          onChange={(e) =>
                            setLogData((prevData) => {
                              const newData = [...prevData];
                              newData[index].date = e.target.value;
                              return newData;
                            })
                          }
                        />
                      ) : (
                        <span className="text-secondary">{set.date}</span>
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
                            <FontAwesomeIcon icon={faBan} />
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
