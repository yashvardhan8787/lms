// CourseCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  console.log(course.thumbnail)
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2">
    <Link to={`/courses/${course._id}`} className="text-blue-500 hover:underline">
      <img src={course.thumbnailUrl} alt={course.title} className="w-full h-44 object-cover rounded-md" />
      <h3 className="text-lg font-semibold mt-2">{course.name}</h3>
      <p className="text-sm text-gray-600">{course.description}</p>
      <p className="font-bold mt-2">${course.price}</p>
      <button className="bg-blue-500 text-white px-4 py-2 mt-3 rounded-md hover:bg-blue-600">
        View Course
      </button>
      </Link>
    </div>
  );
};

export default CourseCard;
