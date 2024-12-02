import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CourseContext } from "../../contexts/CourseContext";
import DescriptionTab from "./DescriptionTab";
import QuizTab from "./QuizTab";
import ReviewTab from "./ReviewTab";
import Faq from "./Faq";
import { MdOutlineOndemandVideo } from "react-icons/md";
import QuizSection from "../Courses/QuizSection";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const LecturePage = () => {
  const { courseId } = useParams();
  const {
    courses,
    lectures,
    fetchLectures,
    loadingCourses,
    loadingLectures,
    error,
  } = useContext(CourseContext);
  const { auth } = useContext(AuthContext);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [userProgress, setUserProgress] = useState([]);
  const userId = JSON.parse(auth)?._id;
  console.log(userId);
  // Fetch user progress
  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BASE_API_URL+`getprogress/${userId}/${courseId}`
        );
        setUserProgress(response.data.lectureProgress); // Assuming this is the progress structure
      } catch (error) {
        console.error("Error fetching user progress:", error);
      }
    };
    fetchUserProgress();
  }, [courseId, userId]);

  // Set initial course and lecture data
  useEffect(() => {
    const foundCourse = courses.find((course) => course._id === courseId);
    if (foundCourse) {
      setCurrentCourse(foundCourse);
      setCurrentLecture(foundCourse.lectures[0]);
    }
  }, [courseId, courses]);

  // Fetch lectures for the course
  useEffect(() => {
    if (courseId && currentCourse && lectures.length === 0) {
      fetchLectures(courseId);
    }
  }, [courseId, fetchLectures, currentCourse, lectures.length]);

  // Handle lecture change
  const handleLectureChange = (lecture) => {
    setCurrentLecture(lecture);
  };

  // Handle video completion
  const handleVideoEnd = async () => {
    if (currentLecture) {
      try {
        const progress = userProgress.find(
          (prog) => prog.lectureId === currentLecture._id
        );
        if (!progress || !progress.isCompleted) {
          // Update lecture progress in the backend
          await axios.post(import.meta.env.VITE_BASE_API_URL+"update-progress", {
            userId,
            courseId,
            lectureId: currentLecture._id,
            isCompleted: true,
            progressPercentage: 100, // Full completion
          });
          setUserProgress((prevProgress) => [
            ...prevProgress,
            { lectureId: currentLecture._id, isCompleted: true },
          ]);
        }
      } catch (error) {
        console.error("Error updating lecture progress:", error);
      }
    }
  };

  // Render active tab content
  const renderActiveTab = () => {
    switch (activeTab) {
      case "description":
        return <DescriptionTab description={currentLecture.description} />;
      case "quiz":
        return <QuizTab quizData={currentLecture.quizData} />;
      case "review":
        return <ReviewTab reviews={currentLecture._id} />;
      case "faq":
        return <Faq />;
      default:
        return null;
    }
  };

  // Loading state
  if (loadingCourses || loadingLectures || !currentCourse || !currentLecture) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex  h-screen bg-gray-50 overflow-y-scroll scrollbar-hide">
      {currentLecture?.isQuiz && (
        <QuizSection
          quizId={currentLecture?.quiz}
          lectureId={currentLecture._id}
          userId={userId}
          courseId={courseId}
          onQuizPass={() => {
            setUserProgress((prevProgress) => [
              ...prevProgress,
              { lectureId: currentLecture._id, isCompleted: true },
            ]);
          }}
        />
      )}

      {/* Left side: Current Lecture and Video */}
      {currentLecture.isVideoLecture && (
        <div className="flex-1 p-6 bg-white shadow-lg rounded-lg m-4 overflow-scroll overflow-x-hidden scrollbar-hide">
          <video
            controls
            src={currentLecture.videoUrl}
            className="w-full rounded-lg shadow-lg mb-4"
            onEnded={handleVideoEnd}
          />

          <div className="mt-6 overflow-hidden">
            <div className="flex space-x-4 text-2xl font-bold text-gray-600 mb-4">
              <button
                onClick={() => setActiveTab("description")}
                className={`focus:outline-none ${
                  activeTab === "description" ? "text-orange-600 underline" : ""
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("quiz")}
                className={`focus:outline-none ${
                  activeTab === "quiz" ? "text-orange-600 p-1 underline" : ""
                }`}
              >
                Quiz
              </button>
              <button
                onClick={() => setActiveTab("review")}
                className={`focus:outline-none ${
                  activeTab === "review" ? "text-orange-600 underline" : ""
                }`}
              >
                Review
              </button>
              <button
                onClick={() => setActiveTab("faq")}
                className={`focus:outline-none ${
                  activeTab === "faq" ? "text-orange-600 underline" : ""
                }`}
              >
                FAQ
              </button>
            </div>
            <div className="mt-2">{renderActiveTab()}</div>
          </div>
        </div>
      )}

      {/* Right side: List of other lectures */}
      <div className="w-1/3 bg-gray-100 p-6 overflow-y-auto rounded-lg m-4 shadow-lg  scrollbar-hide">
        <h3 className="text-2xl font-bold mb-4">Course content</h3>
        <ul className="space-y-4">
          {currentCourse.lectures.map((lecture) => {
            const isCompleted = userProgress.some(
              (prog) => prog.lectureId === lecture._id && prog.isCompleted
            );
            return (
              <li
                key={lecture._id}
                onClick={() => handleLectureChange(lecture)}
                className={`p-4 rounded-lg shadow cursor-pointer ${
                  isCompleted ? "bg-green-300" : "bg-white"
                }`}
              >
                <img
                  src={lecture.thumbnailPicUrl}
                  alt={lecture.title}
                  className="w-full h-20 object-cover rounded mb-2"
                />
                <h4 className="font-bold text-2xl">{lecture.title}</h4>
                <p className="text-sm text-gray-400 pt-3">
                  <span className="text-lg font-bold text-gray-600 flex items-center gap-2">
                    <MdOutlineOndemandVideo size="25px" />
                    Duration: {lecture.duration} min
                  </span>
                  {isCompleted && (
                    <span className="text-green-700 font-bold">Completed</span>
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default LecturePage;
