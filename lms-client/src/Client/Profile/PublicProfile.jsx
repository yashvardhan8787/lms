import React, { useContext, useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { MdVerified, MdNotInterested } from "react-icons/md";
import { GiAchievement } from "react-icons/gi";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { LuCoins } from "react-icons/lu";
import CourseCard from "../../components/Cards/CourseCard";
import { CourseContext } from "../../contexts/CourseContext";

const PublicProfile = ({ userData }) => {
  const { courses, loading } = useContext(CourseContext);
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  useEffect(() => {
    if (userData && userData.courses && Array.isArray(courses)) {
      const purchasedCourseIds = userData.courses.map((c) => c.courseId);
      const filteredCourses = courses.filter((course) =>
        purchasedCourseIds.includes(course._id)
      );
      setPurchasedCourses(filteredCourses);
    }
  }, [userData, courses]);

  return (
    <div className="text-center space-y-6">
      {/* Email and Verification Status */}
      <div className="text-center mt-6">
        <h3 className="text-3xl font-bold ">About Me</h3>
        <p className="text-gray-600 mt-2 text-xl">
          {userData?.about || "Hey there! I am a lifelong learner."}
        </p>
      </div>
      <p className="flex justify-center items-center text-gray-500 text-sm">
        <FaEnvelope className="mr-2" /> {userData?.email}
      </p>
      <p className="flex justify-center items-center text-sm">
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

      {/* Additional Details: Role, Streaks, Badges */}
      <div className="grid grid-cols-3 gap-8 mt-6 text-center">
        {/* Role */}
        <div className="flex items-center justify-center flex-col gap-2">
          <FaRegUser size="28px" />
          <h4 className="text-xl font-bold text-gray-700">Role</h4>
          <p className="text-blue-500 text-lg">{userData?.role || "Member"}</p>
        </div>

        {/* Streaks */}
        <div className="flex items-center justify-center flex-col gap-2">
          <AiFillThunderbolt size="28px" />
          <h4 className="text-xl font-bold text-gray-700">Streaks</h4>
          <p className="text-orange-500 text-lg">{userData?.streaks || 0} 🔥</p>
        </div>

        {/* Badges */}
        <div className="flex items-center justify-center flex-col gap-2">
          <LuCoins size="28px" />
          <h4 className="text-xl font-bold text-gray-700">Badges</h4>
          <div className="flex justify-center space-x-4 mt-2">
            {userData?.badges && userData?.badges.length > 0 ? (
              userData?.badges.map((badge, index) => (
                <span
                  key={index}
                  className="text-yellow-500 p-2 rounded-full bg-gray-100 shadow-sm"
                >
                  <GiAchievement className="inline-block mr-1" /> {badge.length}
                </span>
              ))
            ) : (
              <p className="text-gray-950">0</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-3xl font-bold mb-6">Badges</h1>
      </div>

      {/* Purchased Courses Section */}
      <div className="mt-10">
        <h1 className="text-3xl font-bold mb-6">Your Courses</h1>
        {loading ? (
          <p className="text-center text-xl">Loading courses...</p>
        ) : purchasedCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchasedCourses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        ) : (
          <p className="text-center text-xl">No purchased courses available</p>
        )}
      </div>
    </div>
  );
};

export default PublicProfile;
