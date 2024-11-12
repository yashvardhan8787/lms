import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CourseContext } from "../../contexts/CourseContext";
import DescriptionTab from "./DescriptionTab";
import QuizTab from "./QuizTab";
import ReviewTab from "./ReviewTab";
import Faq from "./Faq";
import { MdOutlineOndemandVideo } from "react-icons/md";
import QuizSection from "../Courses/QuizSection";

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
  const [currentLecture, setCurrentLecture] = useState(null);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("description"); // State to track the active tab

  // Find the current course by its ID
  useEffect(() => {
    const foundCourse = courses.find((course) => course._id === courseId);
    if (foundCourse) {
      setCurrentCourse(foundCourse);
      setCurrentLecture(foundCourse.lectures[0]);
    }
  }, [courseId, courses]);

  // Fetch the lectures when the courseId changes
  useEffect(() => {
    if (courseId && currentCourse && lectures.length === 0) {
      fetchLectures(courseId);
    }
  }, [courseId, fetchLectures, currentCourse, lectures.length]);

  // Handle lecture change
  const handleLectureChange = (lecture) => {
    setCurrentLecture(lecture);
  };

  // Render the active tab content
  const renderActiveTab = () => {
    switch (activeTab) {
      case "description":
        return <DescriptionTab description={currentLecture.description} />;
      case "quiz":
        return <QuizTab quizData={currentLecture.quizData} />;
      case "review":
        return <ReviewTab reviews={currentLecture.reviews} />;
      case "faq":
        return <Faq />;
      default:
        return null;
    }
  };

  if (loadingCourses || loadingLectures || !currentCourse || !currentLecture) {
    return <div>Loading...</div>;
   
  }
  console.log(currentLecture)
  
  return (
    <div className="flex h-screen bg-gray-50 overflow-scroll">
   
   {currentLecture?.isQuiz &&
   <QuizSection quizId={currentLecture?.quiz}></QuizSection>
   
   }


     {/* Left side: Current Lecture and Video */}
     {currentLecture.isVideoLecture &&
         <div className="flex-1 p-6 bg-white shadow-lg rounded-lg m-4 overflow-scroll overflow-x-hidden scrollbar-hide">
         {/* <h2 className="text-3xl font-bold mb-4">{currentLecture.title}</h2> */}
         <video
           controls
           src={currentLecture.videoUrl}
           className="w-full rounded-lg shadow-lg mb-4"
         />
 
         {/* Tabs for Description, Quiz, and Review */}
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
 
           {/* Render the active tab content */}
           <div className="mt-2">{renderActiveTab()}</div>
         </div>
       </div>
      }

      {/* Right side: List of other lectures */}
      <div className="w-1/3 bg-gray-100 p-6 overflow-y-auto rounded-lg m-4 shadow-lg">
        <h3 className="text-2xl font-bold mb-4">Course content</h3>
        <ul className="space-y-4">
          {currentCourse.lectures.map((lecture) => (
            <li
              key={lecture._id}
              onClick={() => handleLectureChange(lecture)}
              className={`p-4 bg-white rounded-lg shadow cursor-pointer ${
                currentLecture._id === lecture._id
                  ? "border-2 border-blue-500"
                  : ""
              }`}
            >
              <img
                src={lecture.thumbnailPicUrl}
                alt={lecture.title}
                className="w-full h-20 object-cover rounded mb-2"
              />
              <h4 className="font-bold text-2xl">{lecture.title}</h4>
              <p className="text-sm text-gray-400 pt-3">
                <span className="text-lg font-bold text-gray-600 flex items-center gap-2 ">
                  {" "}
                <MdOutlineOndemandVideo size="25px"/>
                  Duration:{" "}
                {lecture.duration} min
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default LecturePage;

