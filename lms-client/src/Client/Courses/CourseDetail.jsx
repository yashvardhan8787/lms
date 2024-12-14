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
import LoadingScreen from '../../components/Loading';

const CourseDetail = () => {
  const { courseId } = useParams();
  const { courses, fetchLectures, loading } = useContext(CourseContext);
  const [course, setCourse] = useState(null);
  const [userData, setUserData] = useState(null);
  const [lecture, setLecture] = useState("");

  useEffect(() => {
    const foundCourse = courses.find((c) => c._id === courseId);
    setCourse(foundCourse);
  }, [courseId, courses]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await getUserInfo();
        setUserData(res?.data?.user);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
      }
    };
    fetchUserInfo();
  }, [userData]);

  if (loading || !course) return <LoadingScreen />; // Show loader if data is loading or course is not found

  return (
    <div className="p-6 mx-auto bg-gray-100 max-h-screen h-full border rounded-3xl overflow-y-auto scrollbar-hide">
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
