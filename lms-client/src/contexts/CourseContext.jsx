// CourseContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getAllCourses } from '../api/courses'; // Import the API call

// Create the CourseContext
export const CourseContext = createContext();

// CourseContext Provider Component
export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourses(); // API call
        console.log(response.data); // Log the response
        setCourses(response.data.courses); // Assuming response.data is an array of courses
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
     setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <CourseContext.Provider value={{ courses, loading }}>
      {children}
    </CourseContext.Provider>
  );
};
