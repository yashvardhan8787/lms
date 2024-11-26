import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getAllCourses, getLecturesForCourse } from '../api/courses'; // Import the API call

// Create the CourseContext
export const CourseContext = createContext();

// CourseContext Provider Component
export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingLectures, setLoadingLectures] = useState(false); // Separate loading state for lectures
  const [error, setError] = useState(null);

  // Fetch courses when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourses(); // API call 
        setCourses(response.data.courses); // Assuming response.data is an array of courses
      } catch (error) {
        setError(error?.response?.data?.message || "Error fetching courses"); // Capture actual error message
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []);

  // Fetch lectures for a specific course
  const fetchLectures = useCallback(async (courseId) => {
    setLoadingLectures(true);
    setError(null);
    setLectures([]); // Clear previous lectures when fetching for a new course
    try {
      const response = await getLecturesForCourse(courseId);
      setLectures(response.data); // Assuming response.data contains lectures
    } catch (error) {
      setError(error?.response?.data?.message || 'Error fetching lectures');
    } finally {
      setLoadingLectures(false);
    }
  }, []);

  return (
    <CourseContext.Provider value={{ courses, lectures, fetchLectures, loadingCourses, loadingLectures, error }}>
      {children}
    </CourseContext.Provider>
  );
};
