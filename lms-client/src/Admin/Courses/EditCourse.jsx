import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCourse = () => {
  const {id} = useParams(); // Get course ID from URL params
  const navigate = useNavigate(); 
  // Navigation hook to redirect after updating
  const [courseData, setCourseData] = useState({
    name: '',
    description: '',
    categories: '',
    price: '',
    thumbnailUrl: '',
    tags: '',
    level: '',
    benefits: '',
    prerequisites: '',
    lectures: '',
    badges: '',
    totalQuizzes: '',
    totalLectures: '',
    totalDuration: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  // Fetch course details when component mounts
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/v1/${id}`);
        setCourseData(response.data.course);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch course details');
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  // Update form state as user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:8080/api/v1/update/${id}`, courseData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      if (response.data.success) {
       setSuccess("Course Details Upadated Successfully ") // Redirect to course page after update
      }
    } catch (err) {
      console.log(err);
      setError('Failed to update course');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Edit Course Details</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <p className="text-center">Loading...</p>}

      {!loading && (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Course Name</label>
            <input
              type="text"
              name="name"
              value={courseData?.name}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={courseData?.description}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Categories</label>
            <input
              type="text"
              name="categories"
              value={courseData?.categories}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={courseData?.price}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Thumbnail URL</label>
            <input
              type="text"
              name="thumbnailUrl"
              value={courseData?.thumbnailUrl}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Tags</label>
            <input
              type="text"
              name="tags"
              value={courseData?.tags}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Level</label>
            <input
              type="text"
              name="level"
              value={courseData?.level}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Benefits</label>
            <input
              type="text"
              name="benefits"
              value={courseData?.benefits}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Prerequisites</label>
            <input
              type="text"
              name="prerequisites"
              value={courseData?.prerequisites}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Total Lectures</label>
            <input
              type="number"
              name="totalLectures"
              value={courseData?.totalLectures}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Total Quizzes</label>
            <input
              type="number"
              name="totalQuizzes"
              value={courseData?.totalQuizzes}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Total Duration</label>
            <input
              type="text"
              name="totalDuration"
              value={courseData?.totalDuration}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="col-span-2 mt-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
          >
            Update Course
          </button>

        <p className="text-green-500 text-center">{success}</p>
        </form>
      )}
    </div>
  );
};

export default EditCourse;
