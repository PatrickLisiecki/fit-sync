/* eslint-disable react/prop-types */
import { useEffect } from "react";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Modal({ isVisible, hideModal, children }) {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      onClick={hideModal}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-[999]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[300px] sm:w-[500px] md:w-[600px] mx-auto flex flex-col bg-white rounded-lg shadow-lg transition-all duration-500"
      >
        <div className="flex flex-row justify-end bg-transparent p-4">
          <button
            onClick={hideModal}
            className="w-[50px] h-[50px] p-3 rounded-full grid place-items-center hover:bg-gray-200 hover:text-accent transition-all duration-300"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
