import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import BadgeImg from "../../Client/Badges/BadgeImg";

const CourseCard = ({ course }) => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <Link to={auth ? `/courses/${course?._id}` : `/login`}>
        <img
          src={course.thumbnailUrl || "/default-thumbnail.jpg"}
          alt={course?.name || "Course Thumbnail"}
          className="w-full h-52 sm:h-64 md:h-80 object-cover"
        />

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {course.name || "Untitled Course"}
          </h3>

          <p className="text-sm text-gray-500 mt-2 line-clamp-3">
            {course.description || "No description available."}
          </p>

          {course?.badges?.length > 0 && (
            <div className="flex items-center gap-2 mt-3">
              {course.badges.map((badge, index) => (
                <div
                  key={index}
                  className="tooltip"
                  data-tip={badge.name || "Badge"}
                >
                  <BadgeImg badgeId={badge} />
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 space-y-1">
            <p className="text-sm text-gray-500">
              <span className="font-medium">Category:</span>{" "}
              {course.categories?.join(", ") || "Uncategorized"}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Level:</span>{" "}
              {course.level || "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Lectures:</span>{" "}
              {course.totalLectures || 0}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Duration:</span>{" "}
              {course.totalDuration
                ? `${Math.floor(course.totalDuration / 60)}h ${
                    course.totalDuration % 60
                  }m`
                : "N/A"}
            </p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-bold text-purple-700">
              ${course.price || "Free"}
            </span>
            <button className="bg-orange-400 rounded-2xl px-4 py-2 text-white text-sm sm:text-base md:text-lg hover:bg-orange-600 font-bold">
              View Course
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
