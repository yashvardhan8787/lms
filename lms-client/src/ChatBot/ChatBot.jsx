import React, { useState, useEffect, useContext } from "react";
import { CourseContext } from "../contexts/CourseContext";
import Typewriter from "typewriter-effect";
import { FaTimes } from "react-icons/fa";

const ChatBot = ({ onClose }) => {
  const { courses, loading } = useContext(CourseContext);
  const [step, setStep] = useState(1);
  const [field, setField] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [expandedImage, setExpandedImage] = useState(null);

  // Define fields of interest
  const fieldsOfInterest = ["IT", "Business", "Engineering", "Fashion"];

  // Handle user's field selection
  const handleFieldSelection = (selectedField) => {
    setField(selectedField);
    setStep(2);

    // Filter courses based on the selected field
    const filtered = courses.filter((course) =>
      course.categories.includes(selectedField)
    );
    setFilteredCourses(filtered);
  };

  // Reset the chatbot when user revisits or changes field of interest
  useEffect(() => {
    setField("");
    setFilteredCourses([]);
  }, [courses]);

  if (loading) return <p>Loading chatbot...</p>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80">
      <div className="chatbot-container w-full max-w-lg p-6 shadow-lg rounded-lg bg-white text-purple-900 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          <FaTimes className="h-6 w-6 " />
        </button>
        
        <div className="header text-center font-bold text-2xl text-white mb-4">
          ChatBot
        </div>
        <div className="chat-area max-h-[70vh] overflow-y-auto">
          {step === 1 && (
            <div className="message bot-message mb-4">
              <div className="text-left mb-2">
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("Welcome to Our Platform!")
                      .pauseFor(1000)
                      .deleteAll()
                      .typeString("What is your field of interest?")
                      .start();
                  }}
                />
              </div>
              <div className="field-options mt-4 flex flex-wrap gap-2">
                {fieldsOfInterest.map((interest, index) => (
                  <button
                    key={index}
                    onClick={() => handleFieldSelection(interest)}
                    className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition"
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="message user-message text-right mb-4">
                <p className="bg-purple-200 inline-block p-2 rounded-lg text-sm">
                  {field}
                </p>
              </div>
              <div className="message bot-message text-left mb-4">
                <p className="text-lg font-semibold">
                  Here are some recommended courses in {field}:
                </p>
                <div className="course-suggestions mt-4">
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course, index) => (
                      <div
                        key={index}
                        className="course-card bg-gray-50 mb-3 shadow-md p-3 rounded-md border border-gray-200"
                      >
                        <h3 className="font-bold text-md mb-1">{course.name}</h3>
                        {course.roadmapPicUrl && (
                          <img
                            src={course.roadmapPicUrl}
                            alt={`${course.name} roadmap`}
                            className="w-full h-24 object-cover rounded-md cursor-pointer mb-2"
                            onClick={() => setExpandedImage(course.roadmapPicUrl)}
                          />
                        )}
                        <p className="text-sm text-gray-700">{course.description}</p>
                        <a
                          href={`/courses/${course._id}`}
                          className="text-purple-600 underline mt-2 inline-block"
                        >
                          View More
                        </a>
                      </div>
                    ))
                  ) : (
                    <p>No courses available in {field} at the moment.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Expanded roadmap image modal */}
        {expandedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setExpandedImage(null)}
          >
            <img
              src={expandedImage}
              alt="Expanded roadmap"
              className="max-w-full max-h-full rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
