import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

const ReviewSection = ({ courseId, lectureId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);
  const [reply, setReply] = useState({ reviewId: '', comment: '' });

  const { auth } = useContext(AuthContext);
  const user = JSON.parse(auth);

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
      if(lectureId){
        await axios.post('http://localhost:8080/api/v1/review/create', {
          userId: user._id,
          comment: newReview,
          rating,
          lectureId,
        });
      }
      await axios.post('http://localhost:8080/api/v1/review/create', {
        userId: user._id,
        comment: newReview,
        rating,
        courseId,
      });
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
      await axios.post(import.meta.env.VITE_BASE_API_URL+'review/reply', {
        reviewId: reply?.reviewId,
        userId: user?._id,
        comment: reply?.comment,
      });
      setReply({ reviewId: '', comment: '' });
      fetchReviews();
    } catch (error) {
      console.error('Error replying to review:', error);
    }
  };

  // Delete a review
  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(import.meta.env.VITE_BASE_API_URL+`review/${reviewId}`);
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

      {/* Display Reviews */}
      <div className="space-y-6">
        {reviews?.map((review) => (
          <div key={review?._id} className="p-4 border flex  border-gray-200 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-600 font-semibold">{review?.user?.username || '  Anonymous  '}:</p>
              {user?._id === review?.user?._id && (
                <button
                  onClick={() => deleteReview(review?._id)}
                  className="text-red-500 text-xs"
                >
                  Delete
                </button>
              )}
            </div>
            
            <p className="text-gray-800">{review?.comment}</p>
            <p className="text-yellow-500 mt-1  right-0">Rating: {Array(review?.rating).fill("⭐")}</p>

            {/* Display Replies */}
            {review?.commentReplies?.map((reply) => (
              <div key={reply?._id} className="ml-6 mt-3 pl-3 border-l-2 border-gray-300">
                <p className="text-sm text-gray-600 font-semibold">{reply?.user?.username || 'Anonymous'}</p>
                <p className="text-gray-700">{reply?.comment}</p>
              </div>
            ))}

            {/* Reply Input */}
            {/* <div className="mt-3 flex items-center space-x-2">
              <input
                type="text"
                placeholder="Reply to this review..."
                className="border rounded-md p-2 w-full"
                value={reply?.reviewId === review._id ? reply.comment : ''}
                onChange={(e) => setReply({ reviewId: review?._id, comment: e.target.value })}
              />
              <button
                onClick={handleReply}
                className="bg-blue-500 text-white px-3 py-1 rounded-md"
              >
                Reply
              </button>
            </div> */}
          </div>
        ))}
      </div>

      {/* New Review Input */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Add a New Review</h3>
        <textarea
          placeholder="Write your review..."
          className="border rounded-md p-2 w-full mb-3 h-24 resize-none"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        ></textarea>
        <div className="flex items-center space-x-2 mb-4">
          <label className="text-sm">Rating:</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border rounded-md p-1 w-16 text-center"
          />
        </div>
        <button
          onClick={createReview}
          className="bg-green-600 text-white px-5 py-2 rounded-md"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ReviewSection;
