import React from 'react';
import { Link } from 'react-router-dom';

const CourseLectures = ({ lectures, courseId }) => {
    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Lectures</h2>
            <div className="space-y-4">
                {lectures.map((lecture) => (
                    <div
                        key={lecture._id}
                        className="bg-gray-50 rounded-lg p-4 flex flex-row items-start sm:items-center space-y-4 sm:space-x-6 sm:space-y-0 shadow"
                    >
                        <img
                            src={lecture.thumbnailPicUrl}
                            alt={lecture.title}
                            className="w-24 h-14 sm:w-32 sm:h-22 object-cover rounded-md"
                        />
                        <div className=" ml-2 flex-1">
                            <h3 className="text-sm  sm:text-xl font-semibold text-gray-800">{lecture.title}</h3>
                            <p className="text-xs sm:text-sm text-gray-500">Duration: {lecture.duration} mins</p>
                            {/* {lecture.isVideoLecture ? (
                                <Link to={`/course/${courseId}/lecture/${lecture._id}`} className="text-purple-600 text-sm sm:text-lg mt-2 inline-block">
                                    Watch Lecture
                                </Link>
                            ) : lecture.isQuiz ? (
                                <Link to={`/course/${courseId}/lecture/${lecture._id}`} className="text-purple-600 text-sm sm:text-lg mt-2 inline-block">
                                    Start Quiz
                                </Link>
                            ) : null} */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseLectures;
