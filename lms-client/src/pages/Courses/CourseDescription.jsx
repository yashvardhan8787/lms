// CourseDescription.js

import React from 'react';

const CourseDescription = ({ course }) => {
    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <p className="text-gray-700 mb-4">{course.description}</p>
            <div className="flex items-center space-x-4">
                <span className="text-purple-600 font-semibold">${course.price}</span>
                <span className="text-gray-500">Level: {course.level}</span>
                <span className="text-gray-500">Purchased: {course.purchased}</span>
            </div>
        </div>
    );
};

export default CourseDescription;
