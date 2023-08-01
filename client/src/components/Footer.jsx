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

  return (
    <>
      <section>
        <footer className="bg-white shadow-bs text-black text-center py-4">
          <p className="text-sm">
            &copy; Copyright@2023 Flex Fusion |{" "}
            <a href="/policy" className="hover:text-orange-400">
              Privacy Policy
            </a>{" "}
            |{" "}
            <button
              onClick={showModal}
              className="hover:text-orange-400 focus:outline-none"
            >
              Report an Issue
            </button>{" "}
          </p>
        </footer>
      </section>

      <Modal isVisible={isModalVisible} hideModal={hideModal}>
        <ReportIssue />
      </Modal>
    </>
  );
};

export default Footer;
