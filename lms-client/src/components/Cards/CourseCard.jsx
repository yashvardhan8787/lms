import React from "react";
import executioncontext from "../../../public/assets/images/execution-context.jpg";
import { Link } from "react-router-dom";

// CourseCard.js
const CourseCard = ({ course }) => {
  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden ">
      <Link to={`/courses/${course?._id}`}>
        <img
          src={executioncontext} //course.thumbnailUrl
          alt={course?.name}
          className="w-full h-80 object-cover"
        />

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{course.name}</h3>

          <p className="text-sm text-gray-500 mt-2">{course.description}</p>

          <div className="flex items-center gap-2 mt-2">
            {course?.badges?.map((badge, index) => (
              <span
                key={index}
                className="bg-purple-200 text-purple-700 text-xs font-semibold px-2 py-1 rounded-full"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Category: {course.categories.join(", ")}
            </p>
            <p className="text-sm text-gray-500">Level: {course.level}</p>
            <p className="text-sm text-gray-500">
              Lectures: {course.totalLectures}
            </p>
            <p className="text-sm text-gray-500">
              Duration: {Math.floor(course.totalDuration / 60)}h{" "}
              {course.totalDuration % 60}m
            </p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-bold text-purple-700">
              ${course.price}
            </span>

            <button className="bg-orange-400  rounded-2xl w-42 p-3 text-white text-xl hover:bg-orange-600 font-bold">
              View Course
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
