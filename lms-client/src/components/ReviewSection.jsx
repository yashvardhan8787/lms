import React, { useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { useContext } from 'react';

const ReviewSection = ({ courseId, lectureId }) => { // Removed token as it is not needed
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);
  const [reply, setReply] = useState({ reviewId: '', comment: '' });
  const { auth } = useContext(AuthContext);
  const user = JSON.parse(auth)

  useEffect(() => {
    fetchReviews();
  }, []);

  // Fetch reviews based on courseId or lectureId
  const fetchReviews = async () => {
    try {
      const url = courseId 
        ? `http://localhost:8080/api/v1/courses/${courseId}/reviews`
        : `http://localhost:8080/api/v1/lectures/${lectureId}/reviews`;
        
      const response = await axios.get(url);
      setReviews(response.data.reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  // Create a new review
  const createReview = async () => {
    if (!newReview.trim()) return;
    try {
      await axios.post(
        'http://localhost:8080/api/v1/review/create',
        { 
          userId: user._id,                // Use userId instead of user
          comment: newReview, 
          rating, 
          courseId, 
        }
      );
      setNewReview('');
      fetchReviews();
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

  // Reply to a review
  const handleReply = async () => {
    if (!reply.comment.trim()) return;

    try {
      await axios.post(
        'http://localhost:8080/api/v1/review/reply',
        { 
          reviewId: reply.reviewId, 
          user: user._id,           // Ensure you are using userId
          comment: reply.comment 
        }
      );
      setReply({ reviewId: '', comment: '' });
      fetchReviews();
    } catch (error) {
      console.error('Error replying to review:', error);
    }
  };

  // Delete a review
  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/review/${reviewId}`);
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>
      <div className="space-y-4">
        {reviews?.map((review) => (
          <div key={review?._id} className="p-4 border rounded-md">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-500">{review?.user?.username || 'Anonymous'}</p>
              <button
                onClick={() => deleteReview(review._id)}
                className="text-red-500 text-xs"
              >
                Delete
              </button>
            </div>
            <p className="text-gray-700">{review.comment}</p>
            <div className="text-xs text-yellow-500 mt-1">Rating: {review?.rating || 'N/A'}</div>
            {review?.commentReplies?.map((reply) => (
              <div key={reply._id} className="ml-4 mt-2 border-l-2 pl-2">
                <p className="text-sm text-gray-500">{reply?.user?.username || 'Anonymous'}</p>
                <p className="text-gray-600">{reply?.comment}</p>
              </div>
            ))}
            {/* Reply Input */}
            <div className="mt-2 flex items-center space-x-2">
              <input
                type="text"
                placeholder="Reply to this review..."
                className="border rounded-md p-1 w-full"
                value={reply.reviewId === review._id ? reply.comment : ''}
                onChange={(e) => setReply({ reviewId: review._id, comment: e.target.value })}
              />
              <button
                onClick={handleReply}
                className="bg-blue-500 text-white px-2 py-1 rounded-md"
              >
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Review Input */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Add a New Review</h3>
        <input
          type="text"
          placeholder="Write a review..."
          className="border rounded-md p-2 w-full mb-2"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        />
        <div className="flex items-center space-x-2 mb-4">
          <label className="text-sm">Rating:</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border rounded-md p-1 w-12"
          />
        </div>
        <button
          onClick={createReview}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ReviewSection;
