import React, { useContext, useState } from "react";
import { CourseContext } from "../../contexts/CourseContext";
import { FaSearch } from "react-icons/fa";
import CourseCard from "../../components/Cards/CourseCard";
import LoadingScreen from "../../components/Loading";

const Courses = () => {
  const { courses, loading } = useContext(CourseContext);
  // State to manage the search input
  const [searchTerm, setSearchTerm] = useState("");

  // Filter courses based on the search term
  const filteredCourses =
    searchTerm === ""
      ? courses // Show all courses if searchTerm is empty
      : courses.filter((course) => {
          return course?.name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase().trim());
        });

  if (loading) return <LoadingScreen />; // Show loader if loading is true

  // Check if courses is an array
  if (!Array.isArray(courses)) {
    return <p className="text-center text-xl">No courses available</p>;
  }

  return (
    <div className="p-6 bg-gray-100 max-h-screen overflow-y-auto scrollbar-hide">
      <div className="bg-gray-200 p-4 rounded-lg flex items-center mb-10">
         <span className="text-gray-800 p-1 pr-3 sm:pr-4">
          <FaSearch className="text-gray-800" size="20px" sm="24px" md="28px" />
        </span>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent flex-1 outline-none text-gray-700 text-sm sm:text-base md:text-lg py-1 sm:py-2 px-2 sm:px-3 md:px-4 rounded-md focus:ring-2 focus:ring-[#5A4BA1]"
        />
      </div>
      <h2 className="text-xl sm:text-4xl lg:text-5xl text-black font-bold mb-8 text-center">
        Courses
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6  scrollbar-hide">
        {filteredCourses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
