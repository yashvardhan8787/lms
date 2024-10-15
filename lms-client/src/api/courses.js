// courses.js
import axios from 'axios';

// Set base URL for all API requests
const API = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // Updated base URL to match backend endpoint
  withCredentials: true, // to include cookies for authentication
});

// Fetch all courses
export const getAllCourses = async () => {
  return await API.get('/getAll');
};

// Fetch a course by ID
export const getCourseById = async (courseId) => {
  return await API.get(`/${courseId}`);
};

// Create a new course (for Admin)
export const createCourse = async (courseData) => {
  return await API.post('/courses', courseData);
};

// Update a course (for Admin)
export const updateCourse = async (courseId, updatedData) => {
  return await API.put(`/courses/${courseId}`, updatedData);
};

// Delete a course (for Admin)
export const deleteCourse = async (courseId) => {
  return await API.delete(`/${courseId}`);
};

// Add a lecture to a course (for Admin)
export const addLecture = async (courseId, lectureData) => {
  return await API.post(`/${courseId}/lectures`, lectureData);
};

// Fetch all lectures for a course
export const getLecturesForCourse = async (courseId) => {
  return await API.get(`/${courseId}/lectures`);
};

// Track user progress for a lecture
export const trackUserProgress = async (progressData) => {
  return await API.post('/courses/progress', progressData);
};








/*

// Course Routes
router.post('/create',isAutheticated,authorizeRoles('admin'), createCourse);               // Create a new course
router.put('/update/:id', isAutheticated, updateCourse);            // Update an existing course
router.delete('/delete/:id', isAutheticated, deleteCourse);         // Delete a course
router.get('/getAll', getAllCourses);                                // Get all courses
router.get('/:id', getCourseById);                                   // Get a specific course by ID

// Lecture Routes
router.post('/:courseId/lecture/add', isAutheticated,  addLecture);      // Add a lecture to a course
router.get('/:courseId/lectures', isAutheticated, getLecturesForCourse); // Get all lectures of a course
router.delete('/:courseId/lecture/:lectureId', isAutheticated, deleteLecture); // Delete a lecture from a course

// User Progress Routes
router.post('/trackProgress', isAutheticated, trackUserProgress);    // Track user progress for a lecture

// Quiz Routes
router.post('/quiz/create', isAutheticated, createQuiz);              // Create a quiz
router.get('/quiz/:id', isAutheticated, getQuizById);                 // Get a quiz by ID
router.delete('/quiz/:id', isAutheticated, deleteQuiz);               // Delete a quiz
router.post('/quiz/evaluate',isAutheticated, evaluateQuiz);          // Evaluate a quiz

// Review Routes
router.post('/review/create',isAutheticated, createReview);          // Create a review
router.post('/review/reply',isAutheticated, replyToReview);          // Reply to a review
router.delete('/review/:id',isAutheticated, deleteReview); 
*/