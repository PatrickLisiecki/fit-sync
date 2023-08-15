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
      className="fixed inset-0 z-[9999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative m-4 w-full min-w-[90%] max-w-[90%] rounded-lg bg-white text-base font-light leading-relaxed antialiased shadow-2xl dark:bg-primary md:w-3/4 md:min-w-[75%] md:max-w-[75%] lg:w-3/5 lg:min-w-[60%] lg:max-w-[60%] 2xl:w-2/5 2xl:min-w-[40%] 2xl:max-w-[40%]"
      >
        <div className="flex flex-row justify-end bg-transparent p-4">
          <button
            onClick={hideModal}
            className="grid h-[50px] w-[50px] place-items-center rounded-full p-3 transition-all duration-300 hover:bg-red-500 dark:text-white"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
