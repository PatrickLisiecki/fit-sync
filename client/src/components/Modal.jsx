import { useEffect } from "react";

function Modal({ isVisible, hideModal, children }) {
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
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-items-center items-center z-[110]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-2xl md:max-w-lg w-5/6 md:w-3/4  mx-auto flex flex-col bg-white text-gray-800 rounded-lg shadow-lg"
      >
        <button
          onClick={hideModal}
          className="text-black text-xl place-self-end bg-transparent p-2 rounded"
        >
          Close
        </button>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
