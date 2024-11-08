// CourseHeader.js

import React from 'react';

const CourseHeader = ({ course }) => {
    return (
        <div className="relative mb-6">
            <img
                src={course.thumbnailUrl}
                alt={course.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-purple-600 bg-opacity-50 flex items-center justify-center rounded-lg">
                <h1 className="text-4xl font-bold text-white">{course.name}</h1>
            </div>
        </div>
    );
};

export default CourseHeader;
