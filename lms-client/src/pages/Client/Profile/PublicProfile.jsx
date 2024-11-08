// PublicProfile.js

import React from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { MdVerified, MdNotInterested } from 'react-icons/md';
import { GiAchievement } from 'react-icons/gi';

const PublicProfile = ({ userData }) => {
  return (
    <div className="text-center space-y-6">
      <h3 className="text-3xl font-semibold text-gray-800">{userData?.name}</h3>
      <p className="text-lg text-gray-500">{userData?.title}</p>
      
      {/* Email and Verification Status */}
      <p className="flex justify-center items-center text-gray-500 text-sm">
        <FaEnvelope className="mr-2" /> {userData?.email}
      </p>
      <p className="flex justify-center items-center text-sm mt-2">
        {userData?.isVerified ? (
          <span className="flex items-center text-green-500">
            <MdVerified className="mr-1" /> Verified
          </span>
        ) : (
          <span className="flex items-center text-red-500">
            <MdNotInterested className="mr-1" /> Not Verified
          </span>
        )}
      </p>

      {/* About Me Section */}
      <div className="text-center mt-6">
        <h3 className="text-2xl font-semibold text-gray-700">About Me</h3>
        <p className="text-gray-600 mt-2">{userData?.about || "Hey there! I am a lifelong learner."}</p>
      </div>

      {/* Additional Details: Role, Streaks, Badges */}
      <div className="grid grid-cols-2 gap-8 mt-6 text-center">
        {/* Role */}
        <div>
          <h4 className="text-xl font-semibold text-gray-700">Role</h4>
          <p className="text-blue-500 text-lg">{userData?.role || "Member"}</p>
        </div>
        
        {/* Streaks */}
        <div>
          <h4 className="text-xl font-semibold text-gray-700">Streaks</h4>
          <p className="text-orange-500 text-lg">{userData?.streaks || 0} 🔥</p>
        </div>

        {/* Badges */}
        <div className="col-span-2">
          <h4 className="text-xl font-semibold text-gray-700">Badges</h4>
          <div className="flex justify-center space-x-4 mt-2">
            {userData?.badges && userData?.badges.length > 0 ? (
              userData?.badges.map((badge, index) => (
                <span key={index} className="text-yellow-500 p-2 rounded-full bg-gray-100 shadow-sm">
                  <GiAchievement className="inline-block mr-1" /> {badge}
                </span>
              ))
            ) : (
              <p className="text-gray-400">No badges earned yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
