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
      className="fixed inset-0 w-screen h-screen grid place-items-center bg-black bg-opacity-60 backdrop-blur-sm z-[9999]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white m-4 rounded-lg shadow-2xl antialiased text-base font-light leading-relaxed w-full md:w-3/4 lg:w-3/5 2xl:w-2/5 min-w-[90%] md:min-w-[75%] lg:min-w-[60%] 2xl:min-w-[40%] max-w-[90%] md:max-w-[75%] lg:max-w-[60%] 2xl:max-w-[40%]"
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
