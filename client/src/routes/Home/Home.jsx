// Components
import Navbar from "../../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faDumbbell,
  faChartLine,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/Footer";

export default function Root() {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen flex flex-col justify-center items-center">
        <span className="text-2xl font-bold text-gray-800">Homepage</span>
      </div>
    </>
  );
}
