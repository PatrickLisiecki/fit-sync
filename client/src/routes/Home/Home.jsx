// Components
import Navbar from "../../components/Navbar";

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
