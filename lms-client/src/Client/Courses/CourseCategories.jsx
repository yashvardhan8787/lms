// CourseCategories.js

import React from 'react';

const CourseCategories = ({ categories }) => {
    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-2">Categories</h2>
            <div className="flex text-xl pt-4 flex-wrap gap-2">
                {categories.map((category, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-lg"
                    >
                        {category}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default CourseCategories;
