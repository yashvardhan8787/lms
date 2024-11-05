import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaEnvelope, FaEdit, FaKey } from 'react-icons/fa'; // Icons
import { MdVerified, MdNotInterested } from 'react-icons/md'; // More icons
import { GiAchievement } from 'react-icons/gi'; // Icon for badges
import { getUserInfo } from '../api/auth';
import EditProfile from '../components/EditProfile';  // Import EditProfile component
import ChangePassword from '../components/ChnagePassword';  // Import ChangePassword component

const UserProfile = () => {
  const [userData, setUserData] = useState(null); // User state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [activeForm, setActiveForm] = useState(''); // To control which form (Edit or Password) is shown

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await getUserInfo(); // Fetch user info from API
        setUserData(res?.data?.user); // Assuming the user data is in res.data.user
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  // Function to handle updating the user profile
  const handleUpdateProfile = (updatedData) => {
    setUserData(updatedData); // Update user data after profile edit
    setActiveForm(''); // Close the form after update
  };

  // Function to handle password change (implement API call if needed)
  const handleChangePassword = (passwordData) => {
    console.log('Password changed:', passwordData);
    setActiveForm(''); // Close the form after password change
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
       {activeForm === 'edit' ? (
        <EditProfile userData={userData} onUpdate={handleUpdateProfile} onCancel={() => setActiveForm('')} />
      ) : activeForm === 'password' ? (
        <ChangePassword onPasswordChange={handleChangePassword} onCancel={() => setActiveForm('')} />
      ): (
        <>
          {/* Profile Display */}
          <div className="flex items-center space-x-4 mb-6">
            <FaUserCircle className="text-7xl text-blue-500" /> {/* Avatar icon */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{userData?.name}</h2>
              <p className="text-xl text-gray-500">{userData?.title}</p>
              <p className="flex items-center text-sm text-gray-600">
                <FaEnvelope className="mr-2" /> {userData?.email}
              </p>
              <p className="flex items-center text-sm">
                {userData?.isVerified ? (
                  <span className="flex items-center text-green-600">
                    <MdVerified className="mr-1" /> Verified
                  </span>
                ) : (
                  <span className="flex items-center text-red-500">
                    <MdNotInterested className="mr-1" /> Not Verified
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* About Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">About Me</h3>
            <p className="text-gray-600">{userData?.about}</p>
          </div>

          {/* User Details: Role, Streaks, Badges */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Role</h4>
              <p className="text-blue-500">{userData?.role}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Streaks</h4>
              <p className="text-orange-500">{userData?.streaks} 🔥</p>
            </div>
            <div className="col-span-2">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Badges</h4>
              <div className="flex space-x-4">
                {userData?.badges.length > 0 ? (
                  userData?.badges.map((badge, index) => (
                    <span key={index} className="text-yellow-500">
                      <GiAchievement className="inline-block mr-1" /> {badge}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No badges earned yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* Courses Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Enrolled Courses</h3>
            {userData?.courses.length > 0 ? (
              userData?.courses.map((course, index) => (
                <p key={index} className="text-gray-600">
                  {course}
                </p>
              ))
            ) : (
              <p className="text-gray-500">No courses enrolled yet.</p>
            )}

            <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Completed Courses</h3>
            {userData?.completedCourses.length > 0 ? (
              userData?.completedCourses.map((course, index) => (
                <p key={index} className="text-gray-600">
                  {course}
                </p>
              ))
            ) : (
              <p className="text-gray-500">No completed courses yet.</p>
            )}
          </div>

          {/* Buttons for Profile Actions */}
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveForm('edit')}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            >
              <FaEdit className="mr-2" /> Edit Profile
            </button>
            <button
              onClick={() => setActiveForm('password')}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
            >
              <FaKey className="mr-2" /> Change Password
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
