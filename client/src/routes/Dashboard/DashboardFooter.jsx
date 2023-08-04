/* eslint-disable react/prop-types */
import { useState } from "react";
import ReportIssue from "../../components/ReportIssue";
import Modal from "../../components/Modal";

export default function DashboardFooter({ isExpanded }) {
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
            <footer
                className={`${
                    isExpanded ? "pl-[200px] lg:pl-[250px]" : "pl-0"
                }  w-full max-h-[100px] bg-white shadow-bs p-2 sm:p-8 transition-all duration-500 overflow-hidden`}
            >
                <div className="w-full container mx-auto flex flex-row justify-between text-[10px] sm:text-[14px]">
                    <p className="">&copy; {currentYear} Flex Fusion. All rights reserved.</p>
                    <ul className="hidden xs:flex flex-row gap-x-2">
                        <li>
                            <a
                                href="/policy"
                                className="hover:text-accent transition-all duration-300"
                            >
                                Privacy Policy
                            </a>
                        </li>{" "}
                        |{" "}
                        <li>
                            <button
                                onClick={showModal}
                                className="hover:text-accent transition-all duration-300"
                            >
                                Report an Issue
                            </button>
                        </li>
                    </ul>
                </div>
            </footer>

            <Modal isVisible={isModalVisible} hideModal={hideModal}>
                <ReportIssue />
            </Modal>
        </>
    );
}
