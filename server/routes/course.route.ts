// import express from "express";
// import {
//   addAnwser,
//   addQuestion,
//   addReplyToReview,
//   addReview,
//   deleteCourse,
//   editCourse,
//   generateVideoUrl,
//   getAdminAllCourses,
//   getAllCourses,
//   getCourseByUser,
//   getSingleCourse,
//   uploadCourse,
// } from "../controllers/course.controller";
// import { authorizeRoles, isAutheticated } from "../middleware/auth";
// const courseRouter = express.Router();

// courseRouter.post(
//   "/create-course",
//   isAutheticated,
//   authorizeRoles("admin"),
//   uploadCourse
// );

// courseRouter.put(
//   "/edit-course/:id",
//   isAutheticated,
//   authorizeRoles("admin"),
//   editCourse
// );

// courseRouter.get("/get-course/:id", getSingleCourse);

// courseRouter.get("/get-courses", getAllCourses);

// courseRouter.get(
//   "/get-admin-courses",
//   isAutheticated,
//   authorizeRoles("admin"),
//   getAdminAllCourses
// );

// courseRouter.get("/get-course-content/:id", isAutheticated, getCourseByUser);

// courseRouter.put("/add-question", isAutheticated, addQuestion);

// courseRouter.put("/add-answer", isAutheticated, addAnwser);

// courseRouter.put("/add-review/:id", isAutheticated, addReview);

// courseRouter.put(
//   "/add-reply",
//   isAutheticated,
//   authorizeRoles("admin"),
//   addReplyToReview
// );

// courseRouter.post("/getVdoCipherOTP", generateVideoUrl);

// courseRouter.delete(
//   "/delete-course/:id",
//   isAutheticated,
//   authorizeRoles("admin"),
//   deleteCourse
// );

// export default courseRouter;


import express from 'express';
import {
  createCourse,
  addLecture,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getLecturesForCourse,
  deleteLecture,
  createQuiz,
  getQuizById,
  deleteQuiz,
  evaluateQuiz,
  getAllReviews,
  createReview,
  replyToReview,
  deleteReview,
  enrollInCourse,
} from '../controllers/course.controller'; // Importing all controllers

import { authorizeRoles, isAutheticated } from "../middleware/auth";// Assuming you have authentication middleware

const router = express.Router();
// Course Routes
router.post('/create',
  //isAutheticated,authorizeRoles('admin'), 
  // isAutheticated,authorizeRoles('admin'), 
  createCourse); 
                // Create a new course
router.put('/update/:id', 
  // isAutheticated,
  // authorizeRoles('admin'), 
  updateCourse);            // Update an existing course
router.delete('/delete/:id', isAutheticated,authorizeRoles('admin'), deleteCourse);         // Delete a course
router.get('/getAll', getAllCourses);                                // Get all courses
router.get('/:id', getCourseById);                                   // Get a specific course by ID

// Lecture Routes
router.post('/:courseId/lecture/add',
  //  isAutheticated,
     addLecture);      // Add a lecture to a course
router.get('/:courseId/lectures', isAutheticated, getLecturesForCourse); // Get all lectures of a course
router.delete('/:courseId/lecture/:lectureId', isAutheticated, deleteLecture); // Delete a lecture from a course

//courseEnrollement api 
router.post('/enroll', enrollInCourse);

// Quiz Routes
router.post('/quiz/create', createQuiz);              // Create a quiz
router.get('/quiz/:id',
  //  isAutheticated,
    getQuizById); 
router.delete('/quiz/:id',
   isAutheticated,
    deleteQuiz);               // Delete a quiz
router.post('/quiz/evaluate',
  // isAutheticated,
   evaluateQuiz);          // Evaluate a quiz

// Review Routes
router.post('/review/create', createReview);          // Create a review
router.post('/review/reply', replyToReview);          // Reply to a review
router.delete('/review/:id', deleteReview);           // Delete a review
router.get('/courses/:courseId/reviews', getAllReviews);   // For course reviews
router.get('/lectures/:lectureId/reviews', getAllReviews); // For lecture reviews
export default router;

