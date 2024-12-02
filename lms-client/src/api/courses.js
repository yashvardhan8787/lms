// courses.js
import axios from 'axios';

// Set base URL for all API requests
const API = axios.create({
  baseURL:import.meta.env.VITE_BASE_API_URL, // Updated base URL to match backend endpoint
  withCredentials: true, // to include cookies for authentication
});

// Fetch all courses
export const getAllCourses = async () => {
  return await API.get(import.meta.env.VITE_BASE_API_URL+'getAll');
};

// Fetch a course by ID
export const getCourseById = async (courseId) => {
  return await API.get(import.meta.env.VITE_BASE_API_URL+`${courseId}`);
};

// Create a new course (for Admin)
export const createCourse = async (courseData) => {
  return await API.post(import.meta.env.VITE_BASE_API_URL+'courses', courseData);
};

// Update a course (for Admin)
export const updateCourse = async (courseId, updatedData) => {
  return await API.put(import.meta.env.VITE_BASE_API_URL+`courses/${courseId}`, updatedData);
};

// Delete a course (for Admin)
export const deleteCourse = async (courseId) => {
  return await API.delete(import.meta.env.VITE_BASE_API_URL+`${courseId}`);
};


// Fetch all lectures for a course
export const getLecturesForCourse = async (courseId) => {
  return await API.get(import.meta.env.VITE_BASE_API_URL+`${courseId}/lectures`);
};

// Track user progress for a lecture
export const trackUserProgress = async (progressData) => {
  return await API.post(import.meta.env.VITE_BASE_API_URL+'courses/progress', progressData);
};



