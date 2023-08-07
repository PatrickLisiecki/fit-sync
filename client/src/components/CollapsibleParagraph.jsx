/* eslint-disable react/prop-types */
import { useState } from "react";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function CollapsibleParagraph({ title, content }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isRotated, setRotated] = useState(false);

  const handleRotate = () => {
    setRotated(!isRotated);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <button
        className="flex flex-row justify-center items-center px-4 py-2 text-sm bg-blue-500 text-white shadow-md rounded"
        onClick={() => {
          toggleCollapse();
          handleRotate();
        }}
      >
        {title}
        <div
          className={`${
            isRotated ? "rotate-180" : "rotate-0"
          } p-2 flex justify-center items-center transition-all duration-500`}
        >
          <FontAwesomeIcon icon={faChevronDown} size="sm" />
        </div>
      </button>

      {!isCollapsed && (
        <div className="my-2 p-4 bg-gray-200 rounded-md shadow-md">
          <p className="text-sm text-secondary">{content}</p>
        </div>
      )}
    </>
  );
}
