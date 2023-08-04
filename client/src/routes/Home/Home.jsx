// Components
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Outlet
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <Navbar />
      <div className="pt-24">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
