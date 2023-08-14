import { useState } from "react";
import { Link } from "react-router-dom";

// Components
import ReportIssue from "./ReportIssue";
import Modal from "./Modal";

export default function Footer() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="w-full bg-white p-8 dark:bg-primary">
        <div className="flex flex-row justify-between lg:container lg:mx-auto">
          <p className="text-sm dark:text-white">
            &copy; {currentYear} Flex Fusion. All rights reserved.
          </p>
          <div className="text-sm dark:text-white">
            <Link
              to="/policy"
              className="transition-all duration-300 hover:text-accent"
            >
              Privacy Policy
            </Link>{" "}
            |{" "}
            <button
              onClick={showModal}
              className="transition-all duration-300 hover:text-accent"
            >
              Report an Issue
            </button>
          </div>
        </div>
      </footer>

      <Modal isVisible={isModalVisible} hideModal={hideModal}>
        <ReportIssue />
      </Modal>
    </>
  );
}
