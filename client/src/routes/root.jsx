import { Link } from "react-router-dom";
export default function Root() {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
            <span className="text-2xl font-bold text-gray-800">Homepage</span>
            <Link
                to="/auth"
                className="w-[100px] h-[50px] bg-gray-300 flex items-center justify-center text-black"
            >
                Log In
            </Link>
        </div>
    );
}
