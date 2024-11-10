import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddLecture = () => {
  const { courseId } = useParams(); // Get the course ID from URL params
  const navigate = useNavigate(); // Hook to redirect after adding lecture

  // State for lecture form data
  const [lectureData, setLectureData] = useState({
    title: '',
    description: '',
    thumbnailPicUrl: '',
    videoUrl: '',
    duration: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Update form state as user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLectureData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`/api/courses/${courseId}/lectures`, {
        ...lectureData,
        isVideoLecture: true, // Always true
        isQuiz: false, // Always false
      });

      setLoading(false);

      if (response.data.success) {
        navigate(`/courses/${courseId}`); // Redirect to course page after adding lecture
      }
    } catch (err) {
      setError('Failed to add lecture');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Add Lecture</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <p className="text-center">Loading...</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={lectureData.title}
            onChange={handleChange}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={lectureData.description}
            onChange={handleChange}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Thumbnail URL</label>
          <input
            type="text"
            name="thumbnailPicUrl"
            value={lectureData.thumbnailPicUrl}
            onChange={handleChange}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Video URL</label>
          <input
            type="text"
            name="videoUrl"
            value={lectureData.videoUrl}
            onChange={handleChange}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Duration</label>
          <input
            type="text"
            name="duration"
            value={lectureData.duration}
            onChange={handleChange}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="col-span-2 mt-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
        >
          Add Lecture
        </button>
      </form>
    </div>
  );
};

export default AddLecture;
