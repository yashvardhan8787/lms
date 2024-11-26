// CourseLectures.js

import React from 'react';
import { Link } from 'react-router-dom';

const CourseLectures = ({ lectures, courseId }) => {
    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Lectures</h2>
            <div className="space-y-4">
                {lectures.map((lecture) => (
                    <div
                        key={lecture._id}
                        className="bg-gray-50 rounded-lg p-4 flex items-center space-x-4 shadow"
                    >
                        <img
                            src={lecture.thumbnailPicUrl}
                            alt={lecture.title}
                            className="w-24 h-24 object-cover rounded-md"
                        />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">{lecture.title}</h3>
                            <p className="text-gray-600">{lecture.description}</p>
                            <p className="text-sm text-gray-500">Duration: {lecture.duration} mins</p>
                            {/* {lecture.isVideoLecture ? (
                                <Link to={`/course/${courseId}/lecture/${lecture._id}`} className="text-purple-600">
                                    Watch Lecture
                                </Link>
                            ) : lecture.isQuiz ? (
                                <Link to={`/course/${courseId}/lecture/${lecture._id}`} className="text-purple-600">
                                    start quiz
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
