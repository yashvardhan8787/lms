import React, { useState, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import CreateCourseForm from "./CreateCourseForm";
import { CourseContext } from "../../contexts/CourseContext";

const ManageCourses = () => {
  const { courses } = useContext(CourseContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleCreateCourse = () => {
    setIsCreatingCourse(!isCreatingCourse);
  };

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50 p-6 overflow-scroll overflow-x-hidden overflow-y-hidden">
      <div className="p-6 bg-white shadow-lg rounded-3xl overflow-auto">
        {/* Search Bar */}
        <div className="bg-gray-200 p-4 rounded-lg flex items-center mb-10">
          <span className="text-gray-800 p-1 pr-10">
            <FaSearch size="24px" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
            className="bg-transparent flex-1 outline-none text-gray-700"
          />
        </div>

        {/* Create New Course Button */}
        <button
          onClick={toggleCreateCourse}
          className="mb-6 bg-[#5A4BA1] text-white py-3 px-6 rounded-lg text-lg hover:bg-[#704cb2] transition-all duration-300 shadow-md"
        >
          {isCreatingCourse ? "Close Create Course" : "Create New Course"}
        </button>

        {/* Create New Course Section */}
        {isCreatingCourse && (
          <div className="mb-8 p-6 bg-white border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">New Course Details</h2>
            <CreateCourseForm />
          </div>
        )}

        <h2 className="text-2xl font-semibold mb-6">Courses</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="relative bg-white shadow-lg rounded-lg overflow-hidden p-4"
            >
              <img
                src={course?.thumbnailUrl} // course.thumbnailUrl
                alt={course?.name}
                className="w-full h-80 object-cover"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {course?.name}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  {course?.description}
                </p>

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
                    Category: {course?.categories?.join(", ")}
                  </p>
                  <p className="text-sm text-gray-500">Level: {course.level}</p>
                  <p className="text-sm text-gray-500">
                    Lectures: {course?.totalLectures}
                  </p>
                  <p className="text-sm text-gray-500">
                    Duration: {Math?.floor(course.totalDuration / 60)}h{" "}
                    {course.totalDuration % 60}m
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      navigate(`/adminDashboard/edit/${course._id}`)
                    }
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition-all duration-200"
                  >
                    Edit Details
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/adminDashboard/add-lecture/${course._id}`)
                    }
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition-all duration-200"
                  >
                    Add Lecture
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/adminDashboard/add-quiz/${course._id}`)
                    }
                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition-all duration-200"
                  >
                    Add Quiz
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/adminDashboard/add-badge/${course._id}`)
                    }
                    className="bg-indigo-500 text-white py-1 px-3 rounded hover:bg-indigo-600 transition-all duration-200"
                  >
                    Add Badge
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageCourses;
