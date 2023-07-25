import { useContext } from "react";
import { Form, redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
export default function Root() {
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = (e) => {
    e.preventDefault();

    logout();

    redirect("/login");
  };

  return (
    <div className="w-full min-h-screen flex flex-col gap-y-10 justify-center items-center">
      <span className="text-6xl font-light text-gray-900">
        You are signed in! {currentUser.name}
      </span>
      {currentUser && (
        <Form
          method="post"
          onSubmit={handleLogout}
          className="w-full flex justify-center"
        >
          <button
            type="submit"
            className="w-3/12 px-4 py-3 text-2xl text-white text-center rounded-xl bg-sky-400 hover:bg-sky-500"
          >
            Logout
          </button>
        </Form>
      )}
    </div>
  );
}
