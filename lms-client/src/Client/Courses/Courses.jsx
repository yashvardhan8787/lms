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
    <div className="p-6 bg-gray-100 max-h-screen h-[1000px] border rounded-3xl overflow-scroll scrollbar-hide">
      <div className="bg-gray-200 p-4 rounded-lg flex items-center mb-10">
        <span className="text-gray-800 p-1 pr-10">
          <FaSearch size="24px" />
        </span>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent flex-1 outline-none text-gray-700"
        />
      </div>
      <h2 className="text-5xl text-black font-bold mb-16 text-center">
        Courses
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
