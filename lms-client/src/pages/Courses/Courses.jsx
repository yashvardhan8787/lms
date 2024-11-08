import React from "react";
import CourseCard from "../../components/Cards/CourseCard";
import { useContext, useState } from "react";
import { CourseContext } from "../../contexts/CourseContext";
import { FaSearch } from "react-icons/fa";
const Courses = () => {
  const courses1 = [
    {
      _id: "67054fc6dc0ae74d8ec353a2",
      name: "React for Beginners",
      description:
        "Learn the basics of React.js and build dynamic web applications.",
      categories: ["Web Development", "JavaScript", "Frontend"],
      price: 49.99,
      thumbnailUrl: "https://example.com/react-image.jpg",
      tags: ["React", "JavaScript", "Web Development"],
      level: "Beginner",
      badges: ["React Beginner"],
      totalLectures: 12,
      totalDuration: 360, // minutes
    },
    {
      _id: "67055129dc0ae74d8ec353a4",
      name: "Python for Beginners",
      description:
        "Get started with Python and develop a strong foundation in programming.",
      categories: ["Programming", "Python", "Backend"],
      price: 59.99,
      thumbnailUrl: "https://example.com/python-image.jpg",
      tags: ["Python", "Backend", "Programming"],
      level: "Beginner",
      badges: ["Python Beginner"],
      totalLectures: 10,
      totalDuration: 300, // minutes
    },
    {
      _id: "67054fc6dc0ae74d8ec353a2",
      name: "React for Beginners",
      description:
        "Learn the basics of React.js and build dynamic web applications.",
      categories: ["Web Development", "JavaScript", "Frontend"],
      price: 49.99,
      thumbnailUrl: "https://example.com/react-image.jpg",
      tags: ["React", "JavaScript", "Web Development"],
      level: "Beginner",
      badges: ["React Beginner"],
      totalLectures: 12,
      totalDuration: 360, // minutes
    },
    {
      _id: "67055129dc0ae74d8ec353a4",
      name: "Python for Beginners",
      description:
        "Get started with Python and develop a strong foundation in programming.",
      categories: ["Programming", "Python", "Backend"],
      price: 59.99,
      thumbnailUrl: "https://example.com/python-image.jpg",
      tags: ["Python", "Backend", "Programming"],
      level: "Beginner",
      badges: ["Python Beginner"],
      totalLectures: 10,
      totalDuration: 300, // minutes
    },
    {
      _id: "67054fc6dc0ae74d8ec353a2",
      name: "React for Beginners",
      description:
        "Learn the basics of React.js and build dynamic web applications.",
      categories: ["Web Development", "JavaScript", "Frontend"],
      price: 49.99,
      thumbnailUrl: "https://example.com/react-image.jpg",
      tags: ["React", "JavaScript", "Web Development"],
      level: "Beginner",
      badges: ["React Beginner"],
      totalLectures: 12,
      totalDuration: 360, // minutes
    },
    {
      _id: "67055129dc0ae74d8ec353a4",
      name: "Python for Beginners",
      description:
        "Get started with Python and develop a strong foundation in programming.",
      categories: ["Programming", "Python", "Backend"],
      price: 59.99,
      thumbnailUrl: "https://example.com/python-image.jpg",
      tags: ["Python", "Backend", "Programming"],
      level: "Beginner",
      badges: ["Python Beginner"],
      totalLectures: 10,
      totalDuration: 300, // minutes
    },
    {
      _id: "67054fc6dc0ae74d8ec353a2",
      name: "React for Beginners",
      description:
        "Learn the basics of React.js and build dynamic web applications.",
      categories: ["Web Development", "JavaScript", "Frontend"],
      price: 49.99,
      thumbnailUrl: "https://example.com/react-image.jpg",
      tags: ["React", "JavaScript", "Web Development"],
      level: "Beginner",
      badges: ["React Beginner"],
      totalLectures: 12,
      totalDuration: 360, // minutes
    },
    {
      _id: "67055129dc0ae74d8ec353a4",
      name: "Python for Beginners",
      description:
        "Get started with Python and develop a strong foundation in programming.",
      categories: ["Programming", "Python", "Backend"],
      price: 59.99,
      thumbnailUrl: "https://example.com/python-image.jpg",
      tags: ["Python", "Backend", "Programming"],
      level: "Beginner",
      badges: ["Python Beginner"],
      totalLectures: 10,
      totalDuration: 300, // minutes
    },
    // Add more courses here
  ];

  const { courses, loading } = useContext(CourseContext);
  console.log(courses);

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

  if (loading) return <p className="text-center text-xl">Loading courses...</p>;

  // Check if courses is an array
  if (!Array.isArray(courses)) {
    return <p className="text-center text-xl">No courses available</p>;
  }

  return (
    <div className="p-6 bg-gray-100 max-h-screen h-[1000px]  border rounded-3xl overflow-scroll">
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
      <h2 className="text-2xl font-semibold mb-6">Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
