import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CourseContext } from '../../contexts/CourseContext';
import ReviewSection from '../../components/ReviewSection';


const CourseDetail = () => {
    const { courseId } = useParams(); // Get the course ID from the URL
    const { courses } = useContext(CourseContext);
    const [course, setCourse] = useState(null);
   

    useEffect(() => {
        // Find the course by ID
        const foundCourse = courses.find((c) => c._id === courseId);
        setCourse(foundCourse);
    }, [courseId, courses]);

    if (!course) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-6">
            {/* Course Header with Poster */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                {/* Course Poster */}
                <div className="relative mb-6">
                    <img
                        src={course.thumbnailUrl}
                        alt={course.name}
                        className="w-full h-96 object-cover rounded-lg shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <h1 className="text-4xl font-bold text-white">{course.name}</h1>
                    </div>
                </div>

                {/* Course Details */}
                <div className="p-4">
                    <p className="text-gray-700 mb-4">{course.description}</p>
                    <div className="flex items-center space-x-4 mb-4">
                        <span className="text-blue-500 font-semibold">${course.price}</span>
                        <span className="text-gray-500">Level: {course.level}</span>
                        <span className="text-gray-500">Purchased: {course.purchased}</span>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Categories</h2>
                <div className="flex space-x-2 mb-4">
                    {course.categories.map((category, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                        >
                            {category}
                        </span>
                    ))}
                </div>
            </div>

            {/* Course Benefits */}
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Benefits</h2>
                {course.benefits.length ? (
                    <ul className="list-disc list-inside">
                        {course.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No benefits listed.</p>
                )}
            </div>

            {/* Roadmap Section */}
            {course.roadmapPicUrl && (
                <a href={course.roadmapPicUrl}>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">Course Roadmap</h2>
                    <img
                        src={course.roadmapPicUrl}
                        alt="Course Roadmap isn't avialable"
                        className="will-change-auto h-96 rounded-lg shadow-lg"
                    />
                </div>
                </a>
            )}

            {/* Lectures Section */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Lectures</h2>
                <div className="space-y-4">
                    {course.lectures.map((lecture) => (
                        <div
                            key={lecture._id}
                            className="bg-white rounded-lg shadow-lg p-4 flex items-center space-x-4"
                        >
                            <img
                                src={lecture.thumbnailPicUrl}
                                alt={lecture.title}
                                className="w-24 h-24 object-cover rounded-md"
                            />
                            <div>
                                <h3 className="text-lg font-semibold">{lecture.title}</h3>
                                <p className="text-gray-600">{lecture.description}</p>
                                <p className="text-sm text-gray-500">Duration: {lecture.duration} mins</p>
                                {lecture.isVideoLecture ? (
                                    <Link  to={`/course/${courseId}/lecture/${lecture._id}`}>
                                        Watch Lecture
                                    </Link>
                                ) : lecture.isQuiz ? (
                                    <p className="text-blue-500">Quiz</p>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

                {/* Reviews Section */}
                <ReviewSection
                 courseId = {course._id}
                ></ReviewSection>
        </div>
    );
};

export default CourseDetail;
