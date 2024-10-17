import { useContext, useState } from "react";
import { CourseContext } from "../../contexts/CourseContext";
import CourseCard from "../../components/CourseCard";
import { FaSearch } from "react-icons/fa";
import { AiOutlineTrophy } from 'react-icons/ai'; // Leaderboard icon
import Leaderboard from '../../components/Leaderboard';

const Home = () => {
  // Sample user data and courses from your provided data
const user = {
  success: true,
  user: {
    _id: "670239447d0ef19300c5fe3d",
    name: "jay",
    title: "Newbie",
    about: "Hey there! I am a lifelong learner.",
    streaks: 5,
  },
};

const courses = [
  {
    _id: "67054fc6dc0ae74d8ec353a2",
    name: "React for Beginners",
    description: "Learn the basics of React.js and build dynamic web applications.",
    price: 49.99,
    thumbnailUrl: "https://example.com/react-image.jpg",
  },
  {
    _id: "67055129dc0ae74d8ec353a4",
    name: "Python for Beginners",
    description: "Get started with Python and develop a strong foundation in programming.",
    price: 59.99,
    thumbnailUrl: "https://example.com/python-image.jpg",
  },
];
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Welcome Section */}
      <section className="text-center mb-8">
        <h1 className="text-3xl font-semibold">Welcome, {user.name}!</h1>
        <p className="text-gray-600">Title: {user.title} | About: {user.about}</p>
      </section>

      {/* Leaderboard Section */}
      <section className="my-8">
        <h2 className="text-2xl font-bold flex items-center justify-center">
          <AiOutlineTrophy className="mr-2" /> Leaderboard
        </h2>
        <Leaderboard user={user} />
      </section>

      {/* Courses Section */}
      <section className="my-8">
        <h2 className="text-2xl font-bold text-center mb-4">Available Courses</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map(course => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
