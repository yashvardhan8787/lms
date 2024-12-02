import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { uploadImage, uploadVideo } from '../../utils/cloudUploadFunctions'; // Import the Cloudinary upload functions

const EditCourse = () => {
  const { id } = useParams(); // Get course ID from URL params
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    name: '',
    description: '',
    categories: '',
    price: '',
    thumbnailUrl: '', // will be updated after upload
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
  const [file, setFile] = useState(null); // For holding file to upload

  // Fetch course details when component mounts
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(import.meta.env.VITE_BASE_API_URL+`${id}`);
        setCourseData(response.data.course);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch course details');
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  // Handle file change for upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission for updating course details
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Upload file to Cloudinary if a file is selected
      if (file) {
        const uploadFunction = file.type.startsWith('image/') ? uploadImage : uploadVideo;
        const uploadResponse = await uploadFunction(file);

        if (uploadResponse.success) {
          courseData.thumbnailUrl = uploadResponse.resourceUrl; // Update thumbnail URL in course data
        } else {
          setError(uploadResponse.error);
          setLoading(false);
          return;
        }
      }

      // Step 2: Send updated course data to the server
      const response = await axios.put(import.meta.env.VITE_BASE_API_URL+`update/${id}`, courseData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setLoading(false);
      if (response.data.success) {
        setSuccess('Course details updated successfully.');
        navigate(`/adminDashboard/course/${id}`); // Redirect to course page after successful update
      }
    } catch (err) {
      setError('Failed to update course');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">Edit Course Details</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <p className="text-center">Loading...</p>}

      {!loading && (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Course Name</label>
            <input
              type="text"
              name="name"
              value={courseData?.name}
              onChange={handleChange}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col col-span-2">
            <label className="font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={courseData?.description}
              onChange={handleChange}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">  
            <label className="font-semibold mb-2">Categories</label>
            <input
              type="text"
              name="categories"
              value={courseData?.categories}
              onChange={handleChange}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={courseData?.price}
              onChange={handleChange}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Additional form fields */}
          <div className="flex flex-col col-span-2">
            <label className="font-semibold mb-2">Thumbnail Upload</label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-2">Tags</label>
            <input
              type="text"
              name="tags"
              value={courseData?.tags}
              onChange={handleChange}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-2">Level</label>
            <input
              type="text"
              name="level"
              value={courseData?.level}
              onChange={handleChange}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-2">Benefits</label>
            <input
              type="text"
              name="benefits"
              value={courseData?.benefits}
              onChange={handleChange}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-2">Prerequisites</label>
            <input
              type="text"
              name="prerequisites"
              value={courseData?.prerequisites}
              onChange={handleChange}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-2">Total Lectures</label>
            <input
              type="number"
              name="totalLectures"
              value={courseData?.totalLectures}
              onChange={handleChange}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-2">Total Quizzes</label>
            <input
              type="number"
              name="totalQuizzes"
              value={courseData?.totalQuizzes}
              onChange={handleChange}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col col-span-2">
            <label className="font-semibold mb-2">Total Duration</label>
            <input
              type="text"
              name="totalDuration"
              value={courseData?.totalDuration}
              onChange={handleChange}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* More form fields like tags, level, etc. can be added here as needed */}
          <button
            type="submit"
            className="col-span-2 mt-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
          >
            Update Course
          </button>

          {success && <p className="col-span-2 text-green-500 text-center mt-4">{success}</p>}
        </form>
      )}
    </div>
  );
};

export default EditCourse;
