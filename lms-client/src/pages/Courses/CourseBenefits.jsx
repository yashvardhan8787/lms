// CourseBenefits.js

import React from 'react';

const CourseBenefits = ({ benefits }) => {
    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-semibold">Benefits</h2>
            {benefits.length ? (
                <ul className="list-disc list-inside mt-2  text-xl text-gray-700">
                    {benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No benefits listed.</p>
            )}
        </div>
    );
};

export default CourseBenefits;
