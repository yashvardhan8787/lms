import React from "react";
import { Link } from "react-router-dom";

const CancelPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 md:p-16 max-w-4xl text-center transform transition-transform duration-300 hover:scale-105">
        {/* Cancel Icon */}
        <div className="flex justify-center items-center mb-8">
          <div className="text-red-500 bg-red-100 p-6 rounded-full shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-label="Payment Cancelled Icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">
          Payment Cancelled
        </h1>

        {/* Message */}
        <p className="text-base md:text-lg text-gray-600 mb-8">
          Your payment was not completed. If you need assistance or would like
          to try again, feel free to browse our courses or contact support.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
          <Link
            to="/"
            className="inline-block px-8 py-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-colors text-base md:text-lg font-semibold"
            aria-label="Back to Home"
          >
            Back to Home
          </Link>
          <Link
            to="/courses"
            className="inline-block px-8 py-4 bg-gray-300 text-gray-700 rounded-lg shadow-lg hover:bg-gray-400 transition-colors text-base md:text-lg font-semibold"
            aria-label="Browse Courses"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
