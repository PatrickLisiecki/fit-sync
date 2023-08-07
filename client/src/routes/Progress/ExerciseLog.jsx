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
