// Components


// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Progress() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full p-4 text-center">
        <span className="h2">Progress Tracker</span>
      </div>
      <div className="">
        <button className="flex items-center justify-center gap-x-2 px-2 py-1 sm:px-4 sm:py-3 rounded text-white bg-accent hover:bg-accent/90">
          <FontAwesomeIcon icon={faPlus} />
          <span className="text-lg font-semibold">Log a Workout</span>
        </button>
      </div>
    </div>
  );
}
