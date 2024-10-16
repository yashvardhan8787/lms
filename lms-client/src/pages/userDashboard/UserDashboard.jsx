import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaBell, FaUserCircle, FaHome, FaBook, FaSignOutAlt } from 'react-icons/fa'; // Importing icons from react-icons

const UserDashboard = ({ user, onLogout }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Side Navigation Bar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold flex items-center space-x-2">
          <FaBook className="text-blue-500" /> {/* Adding a book icon for the brand */}
          <span>E-learning</span>
        </div>
        <nav className="mt-10">
          <ul>
            <li className="p-3 hover:bg-gray-700 rounded-lg">
              <Link to="home" className="flex items-center space-x-2">
                <FaHome /> <span>Home</span>
              </Link>
            </li>
            <li className="p-3 hover:bg-gray-700 rounded-lg">
              <Link to="all-courses" className="flex items-center space-x-2">
                <FaBook /> <span>All Courses</span>
              </Link>
            </li>
            <li className="p-3 hover:bg-gray-700 rounded-lg">
              <Link to="my-courses" className="flex items-center space-x-2">
                <FaBook /> <span>My Courses</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Top Navigation Bar */}
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
          <div className="text-xl font-semibold">E-learning</div>
          <div className="flex items-center space-x-4">
            {/* Notification Button */}
            <button className="relative">
              <Link to="notification">
                <FaBell className="text-gray-600 text-2xl" />
              </Link>
            </button>
            {/* User Profile */}
            <Link to="profile" className="flex items-center space-x-2">
              <FaUserCircle className="text-gray-600 text-2xl" />
              <span className="text-gray-600 font-medium">{user?.name}</span>
            </Link>
            {/* Logout Button */}
            <button
              className="flex items-center space-x-2 text-red-600 hover:text-red-800"
              onClick={onLogout}
            >
              <FaSignOutAlt className="text-xl" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Content Area for Nested Routes */}
        <div className="p-6">
          <Outlet /> {/* This will render the nested route components */}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
