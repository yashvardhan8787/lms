// UserProfile.js

import React, { useEffect, useState } from "react";
import { FaUserCircle, FaEdit, FaKey } from "react-icons/fa";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import PublicProfile from "./PublicProfile"; // Import PublicProfile
import { getUserInfo } from "../../api/auth";
import LoadingScreen from "../../components/Loading";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeForm, setActiveForm] = useState("view"); // Default to 'view' to show profile initially

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await getUserInfo();
        setUserData(res?.data?.user);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  const handleUpdateProfile = (updatedData) => {
    console.log("Updated User Data:", updatedData);  // Log the updated data
    setUserData(updatedData);  // Update the state
    setActiveForm("view");  // Switch back to 'view' mode
  };

  const handleChangePassword = (passwordData) => {
    console.log("Password changed:", passwordData);
    setActiveForm("view");
  };

  // Show loading spinner while loading user data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <LoadingScreen/>
      </div>
    );
  }

  // Show error message if there is an error
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="flex justify-center items-start h-screen overflow-x-hidden bg-gray-100 py-10">
      <div className="flex max-w-5xl w-full bg-white rounded-xl shadow-md">
        {/* Left Sidebar */}
        <div className="w-1/4 bg-gray-100 p-6 border-r">
          <div className="text-center">
            <FaUserCircle className="text-7xl text-blue-500 mx-auto" />
            <h2 className="mt-4 text-3xl font-semibold text-gray-800">
              {userData?.name}{" "}
            </h2>
            <h3>
              <span className="text-gray-500 text-xl">({userData.title})</span>
            </h3>
          </div>
          <div className="mt-8 space-y-4">
            <button
              onClick={() => setActiveForm("view")}
              className="w-full flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
            >
              View Profile
            </button>
            <button
              onClick={() => setActiveForm("edit")}
              className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200"
            >
              <FaEdit className="mr-2" /> Edit Profile
            </button>
            <button
              onClick={() => setActiveForm("password")}
              className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition duration-200"
            >
              <FaKey className="mr-2" /> Change Password
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-3/4 p-10 space-y-6">
          {activeForm === "view" ? (
            // Public Profile View
            <PublicProfile userData={userData} />
          ) : activeForm === "edit" ? (
            // Edit Profile Form
            <EditProfile
              userData={userData}
              onUpdate={handleUpdateProfile}
              onCancel={() => setActiveForm("view")}
            />
          ) : activeForm === "password" ? (
            // Change Password Form
            <ChangePassword
              onPasswordChange={handleChangePassword}
              onCancel={() => setActiveForm("view")}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
