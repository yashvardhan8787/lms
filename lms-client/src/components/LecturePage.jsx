import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CourseContext } from '../contexts/CourseContext'; // Adjust the path to your CourseContext
import ReviewSection from '../pages/Courses/ReviewSection';

const LecturePage = () => {
  const { courseId } = useParams(); // Get the course ID from the URL
  const { courses, lectures, fetchLectures, loadingCourses, loadingLectures, error  } = useContext(CourseContext);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [currentCourse, setCurrentCourse] = useState(null);

  // Find the current course by its ID
  useEffect(() => {
    const foundCourse = courses.find((course) => course._id === courseId);
    if (foundCourse) {
      setCurrentCourse(foundCourse);
      setCurrentLecture(foundCourse.lectures[0]); // Set the first lecture as default
    }
  }, [courseId, courses]);

  // Fetch the lectures when the courseId changes
  useEffect(() => {
    if (courseId && currentCourse && lectures.length === 0) { // Only fetch lectures if none exist
      fetchLectures(courseId); // Fetch lectures for the course
    }
  }, [courseId, fetchLectures, currentCourse, lectures.length]);

  // Handle lecture change when a user selects a different lecture
  const handleLectureChange = (lecture) => {
    setCurrentLecture(lecture);
  };

  if (loadingCourses || loadingLectures || !currentCourse || !currentLecture) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Left side: Current Lecture and Video */}
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-4">{currentLecture.title}</h2>
        <video
          controls
          src={currentLecture.videoUrl}
          className="w-full rounded-lg shadow-lg mb-4"
        />
        <p className="text-gray-600">{currentLecture.description}</p>

          
       
      </div>

      {/* Right side: List of other lectures */}
      <div className="w-1/3 bg-gray-100 p-6 overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Other Lectures</h3>
        <ul className="space-y-4">
          {currentCourse.lectures.map((lecture) => (
            <li
              key={lecture._id}
              onClick={() => handleLectureChange(lecture)}
              className={`p-4 bg-white rounded-lg shadow cursor-pointer ${
                currentLecture._id === lecture._id
                  ? 'border-2 border-blue-500'
                  : ''
              }`}
            >
              <h4 className="font-bold text-lg">{lecture.title}</h4>
              <p className="text-gray-500">{lecture.description}</p>
            </li>
          ))}
        </ul>
         {/* Review Section */}
         
      </div>
    </div>
  );
};

export default LecturePage;
