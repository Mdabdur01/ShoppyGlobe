import React from "react";
import { useRouteError, useNavigate } from "react-router-dom";

const Error = () => {
  const { status, statusText, data } = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center">
          <h1 className="text-9xl font-extrabold text-red-500">{status || "404"}</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">
            {statusText || "Page Not Found"}
          </h2>
          <p className="text-gray-600 mt-2">
            {data || "The page you're looking for doesn't exist or an error occurred."}
          </p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 w-full"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default Error;
