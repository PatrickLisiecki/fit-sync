import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Material Tailwind
import { Chip } from "@material-tailwind/react";

export default function ExerciseLog() {
  const { exerciseId } = useParams();
  const [logData, setLogData] = useState(null);

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
  }, []);

  //Create Set 
  const createSet = (newSetData) => {
    axios
      .post(`/api/sets/${exerciseId}`, newSetData)
      .then((response) => {
        setLogData([...logData, response.data]);
      })
      .catch((error) => {
        console.error("Error creating set:", error);
      });
  };

  //Update Set
  const updateSet = (setId, updatedSetData) => {
    axios
      .put(`/api/sets/${exerciseId}/${setId}`, updatedSetData)
      .then((response) => {

        const updatedLogData = logData.map((set) =>
          set.id === setId ? response.data : set
        );
        setLogData(updatedLogData);
      })
      .catch((error) => {
        console.error("Error updating set:", error);
      });
  };

  //Delete Set 
  const deleteSet = (setId) => {
    axios
      .delete(`/api/sets/${exerciseId}/${setId}`)
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
      <div className="w-full p-4 text-center">
        <span className="h2">Progress Tracker</span>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {logData ? (
          logData.map((set, index) => (
            <div key={index} className="rounded-lg bg-white p-4 shadow-lg">
              {/* Exercise info */}
              <div className="my-4 flex flex-row flex-wrap items-center gap-x-4 gap-y-2">
                <Chip variant="ghost" size="sm" color="cyan" value={set.reps} />
                <Chip
                  variant="ghost"
                  size="sm"
                  color="cyan"
                  value={set.weight}
                />
                <Chip variant="ghost" size="sm" color="cyan" value={set.date} />
              </div>
            </div>
          ))
        ) : (
          <span className="h3">No records found...</span>
        )}
      </div>
    </div>
  );
}
