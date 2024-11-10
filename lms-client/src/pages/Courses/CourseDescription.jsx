// CourseDescription.js

import React from "react";

const CourseDescription = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-2">Description</h2>
      <p className="text-gray-700 text-xl mb-4">{course.description}</p>
      <div className="flex items-center text-xl space-x-4">
        <p className="text-purple-600 font-semibold text-3xl">
          ${course.price}
        </p>
        <button className="bg-orange-400  rounded-2xl w-32 p-2 text-white text-xl hover:bg-orange-600 font-bold">
          Buy Now
        </button>
      </div>
      <div className="flex flex-col gap-5 mt-5 justify-center">
        <p className="text-gray-500">
          <span className="font-bold text-xl ">Level:</span> {course.level}
        </p>
        <p className="text-gray-500">
          <span className="font-bold text-xl">Purchased:</span> {course.purchased}
        </p>
      </div>
    </div>
  );
};

export default CourseDescription;
