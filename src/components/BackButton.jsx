import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg shadow hover:bg-gray-200 transition duration-200"
    >
      <span className="text-blue-500">
        <i className="fa-solid fa-arrow-left"></i>
      </span>
      <span>Back</span>
    </button>
  );
};

export default BackButton;
