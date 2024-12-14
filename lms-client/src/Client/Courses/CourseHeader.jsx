import React from 'react';

const CourseHeader = ({ course }) => {
    return (
        <div className="relative mb-6">
            {/* Image */}
            <img
                src={course.thumbnailUrl}
                alt={course.name}
                className="w-full h-56 sm:h-72 md:h-96 object-cover rounded-lg shadow-lg"
            />
            
            {/* Overlay Text */}
            <div className="absolute inset-0 bg-purple-600 bg-opacity-50 flex items-center justify-center rounded-lg">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center px-4">{course.name}</h1>
            </div>
        </div>
    );
};

export default CourseHeader;
