import { useState } from "react";

// Components
import Modal from "../../components/Modal";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Progress() {
  // Exercise form state
  const [exerciseName, setExerciseName] = useState("");

  // Modal state and controls
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

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
      </div>

      {/* Add an exercise form*/}
      <Modal isVisible={isModalVisible} hideModal={hideModal}>
        <div className="flex flex-col items-center">
          <input
            type="text"
            className="mb-4 w-[75%] rounded border border-secondary p-3 text-base focus:outline-none"
            placeholder="Workout Name"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
          />
          <button
            onClick={() => {
              hideModal();
            }}
            className="flex min-w-[135px] cursor-pointer items-center justify-center gap-x-2 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-500/90"
          >
            <FontAwesomeIcon icon={faPlus} size="sm" />
            <span className="font-semibold">Create Workout</span>
          </button>
        </div>
      </Modal>
    </>
  );
}
