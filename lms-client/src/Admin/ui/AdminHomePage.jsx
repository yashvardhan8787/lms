import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import { FaUser, FaBook, FaDollarSign, FaBell } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";

const AdminHomePage = () => {
  const {
    notifications,
    loading,
    unreadCount,
    markAsRead,
  } = useContext(AdminContext);

  

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {loading ? (
          <div className="col-span-full flex justify-center items-center">
            <FiLoader className="animate-spin text-gray-500 text-3xl" />
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <FaUser className="text-blue-500 text-3xl mr-4" />
              <div>
                <h3 className="text-sm text-gray-600">Total Users</h3>
                <p className="text-xl font-semibold text-gray-800">{7}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <FaBook className="text-green-500 text-3xl mr-4" />
              <div>
                <h3 className="text-sm text-gray-600">Total Courses</h3>
                <p className="text-xl font-semibold text-gray-800">{100}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <FaDollarSign className="text-yellow-500 text-3xl mr-4" />
              <div>
                <h3 className="text-sm text-gray-600">Total Revenue</h3>
                <p className="text-xl font-semibold text-gray-800">${2500}</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Notifications Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center">
          <FaBell className="text-blue-500 mr-2" />
          Notifications
          {unreadCount > 0 && (
            <span className="ml-2 text-sm bg-red-500 text-white rounded-full px-2 py-1">
              {unreadCount}
            </span>
          )}
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-4">
          <FiLoader className="animate-spin text-gray-500 text-2xl" />
        </div>
      ) : notifications.length > 0 ? (
        <div className="max-h-64 overflow-y-auto">
          <ul className="space-y-3">
            {notifications.map((notification) => (
              <li
                key={notification._id}
                className={`bg-gray-50 rounded-lg p-4 shadow-sm border-l-4 ${
                  notification.status === "unread"
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
              >
                <p className="text-gray-700 font-semibold">{notification.title}</p>
                <p className="text-gray-600">{notification.message}</p>
                <small className="text-gray-500 block">
                  {new Date(notification.createdAt).toLocaleString()}
                </small>
                {notification.status === "unread" && (
                  <button
                    onClick={() => markAsRead(notification._id)}
                    className="mt-2 text-sm text-blue-500 hover:underline"
                  >
                    Mark as read
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500">No notifications available.</p>
      )}
    </div>
  );
};

export default AdminHomePage;
