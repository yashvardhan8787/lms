import React from "react";
import Heroimg from "../assets/images/Heroimg.png";
import { FaSearch } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      {/* Main Container */}
      <div className="flex items-center space-x-10 px-10 py-20">
        {/* Left: Image Section */}
        <div className="relative">
          {/* Place your image URL here */}
          <img
            src={Heroimg}
            alt="Character working"
            className="w-96 h-auto rounded-full"
          />
        </div>

        {/* Middle: Search bar */}
        <div className="flex-1">
          <div className="flex items-center bg-gray-800 rounded-lg overflow-hidden shadow-md">
            <input
              type="text"
              placeholder="Search Courses..."
              className="w-full px-4 py-3 text-gray-300 bg-transparent outline-none"
            />
            <button className="p-3 bg-blue-500 text-white">
              <FaSearch />
            </button>
          </div>
          <div className="flex items-center mt-6 space-x-2">
            {/* Profile avatars */}
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Profile 1"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src="https://randomuser.me/api/portraits/men/45.jpg"
              alt="Profile 2"
              className="w-10 h-10 rounded-full border-2 border-white -ml-3"
            />
            <img
              src="https://randomuser.me/api/portraits/men/46.jpg"
              alt="Profile 3"
              className="w-10 h-10 rounded-full border-2 border-white -ml-3"
            />
            {/* Text */}
            <p className="text-white ml-4">
              <span className="text-teal-300 font-bold">500K+</span> People
              already trusted us.
              <span className="ml-2 text-green-400 font-bold cursor-pointer">
                View Courses
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
