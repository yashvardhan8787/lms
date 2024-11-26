import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import BadgeImg from "../../Client/Badges/BadgeImg";

const CourseListItem = ({ course }) => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="flex flex-wrap items-center bg-white shadow-lg rounded-lg p-4 mb-4 hover:shadow-2xl transition-shadow duration-300">
      {/* Thumbnail */}
      <div className="w-full sm:w-60 h-28 flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
        <Link to={auth ? `/courses/${course?._id}` : `/login`}>
          <img
            src={course.thumbnailUrl || "/default-thumbnail.jpg"}
            alt={course.name || "Course Thumbnail"}
            className="w-full h-full object-cover rounded-lg"
          />
        </Link>
      </div>

      {/* Course Details */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {course.name || "Untitled Course"}
        </h3>

        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {course.description || "No description available."}
        </p>

        {/* Badges */}
        {course?.badges?.length > 0 && (
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {course.badges.map((badge, index) => (
              <span
                key={index}
                className="tooltip"
                data-tip={badge.name || "Badge"}
              >
                <BadgeImg badgeId={badge} />
              </span>
            ))}
          </div>
        )}

        {/* Price and View Button */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-purple-700">
            ${course.price || "Free"}
          </span>

          <Link to={auth ? `/courses/${course?._id}` : `/login`}>
            <button className="bg-orange-400 rounded-2xl px-4 py-2 text-white text-sm hover:bg-orange-600 font-bold">
              View Course
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseListItem;
