/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function DashboardFooter({ isExpanded }) {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className={`${
                isExpanded ? "pl-[200px] lg:pl-[250px]" : "pl-0"
            }  w-full max-h-[100px] bg-white shadow-bs p-2 sm:p-8 transition-all duration-500 overflow-hidden`}
        >
            <div className="w-full container mx-auto flex flex-row justify-between text-[10px] sm:text-[14px]">
                <p className="">&copy; {currentYear} Flex Fusion. All rights reserved.</p>
                <ul className="hidden xs:flex flex-row gap-x-2">
                    <li>
                        <Link to="/dashboard">Support</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Help Center</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Privacy</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Terms</Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
