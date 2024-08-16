import { Link } from "react-router-dom";

const ConfirmEmail = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Email Confirmed!</h1>
        <p className="mb-4">Your email has been successfully confirmed.</p>
        <Link
          to="/login"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default ConfirmEmail;
