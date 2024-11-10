// CourseRoadmap.js

import React from 'react';

const CourseRoadmap = ({ roadmapPicUrl }) => {
    if (!roadmapPicUrl) return null;

    return (
    
        <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Course Roadmap</h2>
            <a href={roadmapPicUrl}>
                <img
                    src={roadmapPicUrl}
                    alt="Course Roadmap"
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                />
            </a>
        </div>

    );
};

export default CourseRoadmap;
