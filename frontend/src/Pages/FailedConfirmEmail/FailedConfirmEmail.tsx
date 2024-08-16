import { Link } from "react-router-dom";

const FailedConfirmEmail = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Email Confirmation Failed</h1>
        <p className="mb-4">
          There was an issue confirming your email. Please try again.
        </p>
        <Link
          to="/login"
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default FailedConfirmEmail;
