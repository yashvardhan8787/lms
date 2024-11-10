// CourseDetail.js

import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CourseContext } from '../../contexts/CourseContext';
import CourseHeader from './CourseHeader';
import CourseDescription from './CourseDescription';
import CourseCategories from './CourseCategories';
import CourseBenefits from './CourseBenefits';
import CourseLectures from './CourseLectures';
import ReviewSection from './ReviewSection';
import CourseRoadmap from './CourseRoadMap';

const CourseDetail = () => {
    const { courseId } = useParams();
    const { courses } = useContext(CourseContext);
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const foundCourse = courses.find((c) => c._id === courseId);
        setCourse(foundCourse);
    }, [courseId, courses]);

    if (!course) return <div>Loading...</div>;

    return (
        <div className="p-6 mx-auto bg-gray-100 max-h-screen h-[1000px]  border rounded-3xl overflow-scroll">
            <CourseHeader course={course} />
            <CourseDescription course={course} />
            <CourseCategories categories={course.categories} />
            <CourseBenefits benefits={course.benefits} />
            <CourseRoadmap roadmapPicUrl={course.roadmapPicUrl} />
            <CourseLectures lectures={course.lectures} courseId={course._id} />
            <ReviewSection courseId={course._id} />
        </div>
    );
};

export default CourseDetail;
