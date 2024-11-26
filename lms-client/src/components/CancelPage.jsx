import React from "react";

const CancelPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-16 max-w-4xl text-center transform transition-all duration-300 hover:scale-105">
        <div className="flex justify-center items-center mb-8">
          <div className="text-red-500 bg-red-100 p-6 rounded-full shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 13l3 3L22 4M6 6l4 4-4-4m16 16L4 4"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          Payment Cancelled
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your payment was not completed. If you need assistance or would like
          to try again, feel free to visit the courses page or contact our
          support team.
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="/"
            className="inline-block px-10 py-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-colors text-lg font-semibold"
          >
            Back to Home
          </a>
          <a
            href="/courses"
            className="inline-block px-10 py-4 bg-gray-300 text-gray-700 rounded-lg shadow-lg hover:bg-gray-400 transition-colors text-lg font-semibold"
          >
            Browse Courses
          </a>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
