import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/Cards/CourseCard";
import { CourseContext } from "../../contexts/CourseContext";
import { FaSearch } from "react-icons/fa";
import { getUserInfo } from "../../api/auth";
import LoadingScreen from "../../components/Loading";

const MyCourses = () => {
  const { courses, loading } = useContext(CourseContext);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await getUserInfo();
        if (!res?.data?.user) {
          navigate("/login"); // Redirect to login if no user data
        } else {
          setUser(res.data.user);
        }
      } catch (err) {
        navigate("/login"); // Redirect to login if an error occurs
      }
    };
    fetchUserInfo();
  }, [navigate,user]);

  useEffect(() => {
    if (user && user.courses && Array.isArray(courses)) {
      const purchasedCourseIds = user.courses.map((c) => c._id);
      const filteredCourses = courses.filter((course) =>
        purchasedCourseIds.includes(course._id)
      );
      setPurchasedCourses(filteredCourses);
    }
  }, [user, courses]);

  const filteredCourses = searchTerm
    ? purchasedCourses.filter((course) =>
        course?.name?.toLowerCase().includes(searchTerm.toLowerCase().trim())
      )
    : purchasedCourses;

  if (loading) return <LoadingScreen />; // Show loader if loading is true

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
