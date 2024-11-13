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

  const fieldsOfInterest = ["IT", "Business", "Engineering", "Fashion"];

  const handleFieldSelection = (selectedField) => {
    setField(selectedField);
    setStep(2);

    const filtered = courses.filter((course) =>
      course.categories.includes(selectedField)
    );
    setFilteredCourses(filtered);
  };

  useEffect(() => {
    setField("");
    setFilteredCourses([]);
  }, [courses]);

  if (loading) return <p>Loading chatbot...</p>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 z-50">
      <div className="w-full max-w-lg p-6 shadow-lg rounded-lg bg-white text-gray-800 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          <FaTimes className="h-6 w-6" />
        </button>

        <div className="text-center font-extrabold text-2xl text-[#5A4BA1] mb-4">
          ChatBot
        </div>
        <div className="max-h-[70vh] overflow-y-auto">
          {step === 1 && (
            <div className="mb-4">
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
              <div className="mt-4 flex flex-wrap gap-2">
                {fieldsOfInterest.map((interest, index) => (
                  <button
                    key={index}
                    onClick={() => handleFieldSelection(interest)}
                    className="bg-gradient-to-r from-[#5A4BA1] to-[#704cb2] text-white px-4 py-2 rounded-full hover:from-[#704cb2] hover:to-[#5A4BA1] transition-all duration-300"
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="text-right mb-4">
                <p className="bg-gradient-to-r from-[#5A4BA1] to-[#704cb2] inline-block p-2 rounded-lg text-sm text-white">
                  {field}
                </p>
              </div>
              <div className="text-left mb-4">
                <p className="text-lg font-semibold">
                  Here are some recommended courses in {field}:
                </p>
                <div className="mt-4">
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 mb-3 shadow-md p-3 rounded-md border border-gray-200"
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
                        <p className="text-sm text-gray-700">
                          {course.description}
                        </p>
                        <a
                          href={`/courses/${course._id}`}
                          className="text-[#5A4BA1] underline mt-2 inline-block"
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
