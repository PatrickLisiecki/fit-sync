import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Material Tailwind
import { Chip } from "@material-tailwind/react";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPencil } from "@fortawesome/free-solid-svg-icons";

export default function ExerciseLog() {
  const { exerciseId } = useParams();
  const [currentExercise, setCurrentExercise] = useState(null);
  const [logData, setLogData] = useState(null);

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
  const handleCreateSet = (newSetData) => {
    axios
      .post(`/api/sets/`, newSetData)
      .then((response) => {
        setLogData([...logData, response.data]);
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

      {/* Sets for an exercise */}
      <div className="flex w-full flex-col gap-x-4 px-6 py-4 sm:flex-row sm:px-24">
        {logData ? (
          logData.map((set, index) => (
            <div key={index} className="rounded-lg bg-white p-4 shadow-lg">
              {/* Exercise info */}
              <div className="my-4 flex flex-row flex-wrap items-center gap-x-4 gap-y-2">
                {/* Render editable fields or chips */}
                {editState[set.id] ? (
                  <>
                    <input
                      type="number"
                      className="rounded border px-2 py-1 focus:outline-none"
                      value={set.reps}
                      onChange={(e) =>
                        setLogData((prevData) => {
                          const newData = [...prevData];
                          newData[index].reps = e.target.value;
                          return newData;
                        })
                      }
                    />
                    <input
                      type="number"
                      className="rounded border px-2 py-1 focus:outline-none"
                      value={set.weight}
                      onChange={(e) =>
                        setLogData((prevData) => {
                          const newData = [...prevData];
                          newData[index].weight = e.target.value;
                          return newData;
                        })
                      }
                    />
                    <input
                      type="date"
                      className="rounded border px-2 py-1 focus:outline-none"
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
                    <Chip
                      variant="ghost"
                      size="sm"
                      color="cyan"
                      value={set.reps}
                    />
                    <Chip
                      variant="ghost"
                      size="sm"
                      color="cyan"
                      value={set.weight}
                    />
                    <Chip
                      variant="ghost"
                      size="sm"
                      color="cyan"
                      value={set.date}
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
    </div>
  );
}
