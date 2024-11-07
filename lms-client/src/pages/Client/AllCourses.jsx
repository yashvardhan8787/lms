// AllCourses.jsx
import { useContext, useState } from "react";
import { CourseContext } from "../../contexts/CourseContext";
import CourseCard from "../../components/CourseCard";
import { FaSearch } from "react-icons/fa";
import React from 'react';

const AllCourses = () => {
  const { courses, loading } = useContext(CourseContext);
  console.log(courses);
  
  // State to manage the search input
  const [searchTerm, setSearchTerm] = useState('');

  // Filter courses based on the search term
  const filteredCourses = searchTerm === ''
    ? courses // Show all courses if searchTerm is empty
    : courses.filter((course) => {
        return course?.name?.toLowerCase().includes(searchTerm.toLowerCase().trim());
      });

  if (loading) return <p className="text-center text-xl">Loading courses...</p>;

  // Check if courses is an array
  if (!Array.isArray(courses)) {
    return <p className="text-center text-xl">No courses available</p>;
  }

  return (
    <div className="container mx-auto mt-6 px-4">
     

      {/* Search Bar */}
      <div className="flex items-center mb-6">
        <div className="relative w-full ">
          <input
            type="text"
            placeholder="            Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
            className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2  text-gray-500">
            <FaSearch />
          </span>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))
        ) : (
          <p className="text-center text-xl">No courses found matching "{searchTerm}"</p>
        )}
      </div>
    </div>
  );
};

export default AllCourses;
