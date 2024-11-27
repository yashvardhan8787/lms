import { Request, Response } from 'express';
import { Course } from '../models/course.model';
import { Lecture } from '../models/course.model';
import { Quiz } from '../models/course.model';
import { Review } from '../models/course.model';
import userModel from '../models/user.model';
import { UserProgress } from '../models/course.model';
import NotificationModel from '../models/notification.Model';
import mongoose from 'mongoose';
// Create a new course
export const createCourse = async (req: Request, res: Response) => {
  try {
    const { name, description, categories, price, estimatedPrice, thumbnailUrl, tags, level, demoUrl, benefits, prerequisites, roadmapPicUrl } = req.body;
    
    const course = new Course({
      name,
      description,
      categories,
      price,
      estimatedPrice,
      thumbnailUrl,
      tags,
      level,
      demoUrl,
      benefits,
      prerequisites,
      roadmapPicUrl,
    });

    await course.save();
    res.status(201).json({ success: true, message: 'Course created successfully', course });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create course', error });
  }
};

// Add a lecture to a course
export const addLecture = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const { title, description, thumbnailPicUrl, isVideoLecture, videoUrl, quizId ,isQuiz, duration } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const lecture = new Lecture({
      title,
      description,
      thumbnailPicUrl,
      isVideoLecture,
      isQuiz,
      videoUrl,
      quiz: quizId,
      duration,
    });

    await lecture.save();
    course.lectures.push(lecture._id);
    await course.save();

    res.status(201).json({ success: true, message: 'Lecture added successfully', lecture });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add lecture', error });
  }
};

// Get all courses
export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find().populate('reviews').populate('lectures');
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch courses', error });
  }
};

// Get a single course by ID
export const getCourseById = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId).populate('reviews').populate('lectures');
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch course', error });
  }
};


// Update a course
// export const updateCourse = async (req: Request, res: Response) => {
//   try {
//     const courseId = req.params.id;
//     const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, { new: true });
//     if (!updatedCourse) {
//       return res.status(404).json({ success: false, message: 'Course not found' });
//     }
//     res.status(200).json({ success: true, message: 'Course updated successfully', updatedCourse });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to update course', error });
//   }
// };

// Delete a course
export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete course', error });
  }
};

// Get lectures for a course (with authorization check)
export const getLecturesForCourse = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId).populate('lectures');
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.status(200).json({ success: true, lectures: course.lectures });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch lectures', error });
  }
};

// Delete a lecture from a course
export const deleteLecture = async (req: Request, res: Response) => {
  try {
    const { lectureId, courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    await Lecture.findByIdAndDelete(lectureId);
    course.lectures = course.lectures.filter(lecture => lecture.toString() !== lectureId);
    await course.save();

    res.status(200).json({ success: true, message: 'Lecture deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete lecture', error });
  }
};


// Create a quiz
export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { questions, totalQuestions, passingScore } = req.body;

    const quiz = new Quiz({
      questions,
      totalQuestions,
      passingScore,
    });

    await quiz.save();
    res.status(201).json({ success: true, message: 'Quiz created successfully', quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create quiz', error });
  }
};

// Get a quiz by ID
export const getQuizById = async (req: Request, res: Response) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }
    res.status(200).json({ success: true, quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch quiz', error });
  }
};

// Delete a quiz
export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const quizId = req.params.id;
    await Quiz.findByIdAndDelete(quizId);
    res.status(200).json({ success: true, message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete quiz', error });
  }
};

// Evaluate quiz results
export const evaluateQuiz = async (req: Request, res: Response) => {
  try {
    const { quizId, answers } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        score += 1;
      }
    });

    const result = {
      totalQuestions: quiz.questions.length,
      correctAnswers: score,
      scorePercentage: (score / quiz.questions.length) * 100,
    };

    res.status(200).json({ success: true, message: 'Quiz evaluated successfully', result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to evaluate quiz', error });
  }
};




export const updateCourse = async (req: Request, res: Response) => {
  try {
    // Assuming your route is /api/courses/:id
    const { id } = req.params; // Use 'id' if route uses ':id'

    // Validate if the courseId (id) is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid course ID' });
    }

    // Find the course by its ID
    const course = await Course.findById(id); // Use 'id' here as well
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Proceed with updating the course (rest of the update logic)
    const {
      name, description, categories, price, thumbnailUrl, tags, level,
      benefits, prerequisites, lectures, badges, totalQuizzes,
      totalLectures, totalDuration
    } = req.body;

    // Update course fields
    if (name) course.name = name;
    if (description) course.description = description;
    if (categories) course.categories = categories;
    if (price) course.price = price;
    if (thumbnailUrl) course.thumbnailUrl = thumbnailUrl;
    if (tags) course.tags = tags;
    if (level) course.level = level;
    if (benefits) course.benefits = benefits;
    if (prerequisites) course.prerequisites = prerequisites;
    if (lectures) course.lectures = lectures;
    if (badges) course.badges = badges;
    if (totalQuizzes) course.totalQuizzes = totalQuizzes;
    if (totalLectures) course.totalLectures = totalLectures;
    if (totalDuration) course.totalDuration = totalDuration;

    // Save the updated course
    await course.save();

    return res.status(200).json({ success: true, message: 'Course updated successfully', course });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update course', error });
  }
};




// Create a review for a course or lecture
export const createReview = async (req: Request, res: Response) => {
  try {
    const { userId, comment, rating, courseId, lectureId } = req.body; // Include courseId or lectureId
    if (!courseId && !lectureId) {
      return res.status(400).json({ success: false, message: 'Either courseId or lectureId must be provided' });
    }

    const review = new Review({
      user: userId,
      comment,
      rating,
    });
    
    await review.save();

    // Associate review with course or lecture
    if (courseId) {
      await Course.findByIdAndUpdate(courseId, { $push: { reviews: review._id } });
    } else if (lectureId) {
      await Lecture.findByIdAndUpdate(lectureId, { $push: { reviews: review._id } });
    }

    res.status(201).json({ success: true, message: 'Review created successfully', review });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create review', error });
  }
};


// Reply to a review
export const replyToReview = async (req: Request, res: Response) => {
  try {
    const { reviewId, comment , user } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

 // Create a new reply review document
 const reply = new Review({
  user: user,
  comment,
  commentReplies: [], // Empty array for replies to this reply if any
  createdAt: new Date(),
  updatedAt: new Date()
});

// Save the reply
await reply.save();

// Add the reply ID to the commentReplies array of the parent review
review.commentReplies?.push(reply._id);
await review.save();

res.status(200).json({ success: true, message: 'Replied to review successfully', reply });
} catch (error) {
res.status(500).json({ success: false, message: 'Failed to reply to review', error });
}
};

// Delete a review
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const reviewId = req.params.id;
    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete review', error });
  }
};


// Get all reviews for a specific course or lecture
export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const { courseId, lectureId } = req.params;

    let reviews;
    if (courseId) {
      // Find reviews related to the specified course
      const course = await Course.findById(courseId).populate('reviews');
      if (!course) {
        return res.status(404).json({ success: false, message: 'Course not found' });
      }
      reviews = course.reviews;
    } else if (lectureId) {
      // Find reviews related to the specified lecture
      const lecture = await Lecture.findById(lectureId).populate('reviews');
      if (!lecture) {
        return res.status(404).json({ success: false, message: 'Lecture not found' });
      }
      reviews = lecture.reviews;
    } else {
      return res.status(400).json({ success: false, message: 'Either courseId or lectureId must be provided' });
    }

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch reviews', error });
  }
};


// Assume all models and schemas are imported and instantiated correctly

export const enrollInCourse = async (req: Request, res: Response) => {
  try {
    const { userId, courseId } = req.body;

    // Find the user and course by their IDs
    const user = await userModel.findById(userId);
    const course = await Course.findById(courseId);

    // Ensure both user and course exist
    if (!user || !course) {
      return res.status(404).json({ message: "User or Course not found" });
    }
    

    // Check if the user is already enrolled in this course
    const alreadyEnrolled = user.courses.some(
      (enrolledCourse: { courseId: { toString: () => any; }; }) => enrolledCourse.courseId.toString() === courseId
    );

    if (alreadyEnrolled) {
      return res.status(400).json({ message: "User is already enrolled in this course" });
    }

    // Add the course to the user's enrolled courses array
    user.courses.push({ courseId });
    
    // Increment the course's purchase count
    course.purchased += 1;

    // Save both user and course updates to the database
    await user.save();
    await course.save();

    // Create a UserProgress entry for tracking the user's progress in the course
    const userProgress = new UserProgress({
      userId: user._id,
      courseId: course._id,
      lectureProgress: [], // Initially empty, as user hasn't started any lectures
      totalCompletedLectures: 0,
      totalQuizzesPassed: 0,
      streakUpdated: false,
      earnedBadges: []
    });

    // Save the user progress document
    await userProgress.save();

    return res.status(200).json({
      message: "Enrollment successful",
      user,
      course,
      userProgress
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

