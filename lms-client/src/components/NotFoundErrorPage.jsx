// src/components/NotFoundErrorPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import page_not_found from "../../public/assets/images/page_not_found.png" ;

const NotFoundErrorPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center bg-gray-100">
      <h1 className="text-6xl font-bold text-blue-600">Something Went Wrong</h1>
      <h2 className="text-3xl font-semibold mt-4 text-gray-700">Oops! Page Not Found</h2>
      <p className="text-lg mt-2 text-gray-600">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Optional image or icon */}
      <img 
        src={page_not_found}
        alt="404 illustration"
        className="mt-6 w-3/4 sm:w-1/2 max-w-md mx-auto" // Responsive image
        onError={(e) => e.target.src = "/path/to/default-image.jpg"}  // Fallback image
      />

      <div className="mt-6 space-x-4">
        <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out">
          Go to Homepage
        </Link>
        <Link to="/courses" className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300 ease-in-out">
          Browse Courses
        </Link>
      </div>
    </div>
  );
};

export default NotFoundErrorPage;
