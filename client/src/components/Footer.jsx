import { useState } from "react";
import ReportIssue from "./ReportIssue";
import Modal from "./Modal";

const Footer = () => {
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
      <footer className="w-full bg-white p-8 shadow-bs">
        <div className="flex flex-row justify-between lg:container lg:mx-auto">
          <p className="text-sm">
            &copy; {currentYear} Flex Fusion. All rights reserved.
          </p>
          <div className="text-sm">
            <a
              href="/policy"
              className="transition-all duration-300 hover:text-accent"
            >
              Privacy Policy
            </a>{" "}
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
};

export default Footer;
