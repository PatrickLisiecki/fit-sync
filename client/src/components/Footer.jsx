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
            <footer className="bg-white shadow-bs w-full p-8">
                <div className="container mx-auto flex flex-row justify-between">
                    <p className="text-sm">
                        &copy; {currentYear} Flex Fusion. All rights reserved.
                    </p>
                    <div className="text-sm">
                        <a href="/policy" className="hover:text-accent transition-all duration-300">
                            Privacy Policy
                        </a>{" "}
                        |{" "}
                        <button
                            onClick={showModal}
                            className="hover:text-accent transition-all duration-300"
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
