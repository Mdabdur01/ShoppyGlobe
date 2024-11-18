import React from "react";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/home");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-sm mx-auto">
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-16 h-16 mx-auto text-green-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-4xl font-extrabold text-green-600 mb-4">
          Order Placed!
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Your order has been successfully placed. Thank you for shopping with ShoppyGlobe. We will notify you when your order ships!
        </p>

        <button
          onClick={handleGoHome}
          className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-lg hover:from-green-500 hover:to-blue-600 transition duration-300 transform hover:scale-105"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
