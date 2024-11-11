import React, { useContext, useState, useEffect } from "react";
import CourseCard from "../../components/Cards/CourseCard";
import { CourseContext } from "../../contexts/CourseContext";
import { FaSearch } from "react-icons/fa";
import { getCourseById } from "../../api/courses"; // Import the getCourseById API
import { getUserInfo } from "../../api/auth";

const MyCourses = () => {
  const { courses, loading } = useContext(CourseContext); // Assuming user data is available in context
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await getUserInfo();
        setUser(res?.data?.user);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);
  useEffect(() => {
    // Filter the courses array based on purchased courses
    if (user && user.courses && Array.isArray(courses)) {
      const purchasedCourseIds = user.courses.map((c) => c.courseId);
      const filteredCourses = courses.filter((course) =>
        purchasedCourseIds.includes(course._id)
      );
      setPurchasedCourses(filteredCourses);
    }
  }, [user, courses]);

  // Filter courses based on search term
  const filteredCourses = searchTerm
    ? purchasedCourses.filter((course) =>
        course?.name?.toLowerCase().includes(searchTerm.toLowerCase().trim())
      )
    : purchasedCourses;

  if (loading) return <p className="text-center text-xl">Loading courses...</p>;

  return (
    <div className="p-6 bg-gray-100 max-h-screen h-[1000px] border rounded-3xl overflow-scroll">
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
        My Courses
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))
        ) : (
          <p className="text-center text-xl">No purchased courses available</p>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
