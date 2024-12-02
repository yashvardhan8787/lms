import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { uploadImage, uploadVideo } from '../../utils/cloudUploadFunctions'; // adjust path as necessary

const AddLecture = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lectureData, setLectureData] = useState({
    title: '',
    description: '',
    duration: '',
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ thumbnail: 0, video: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLectureData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "thumbnailFile") setThumbnailFile(files[0]);
    if (name === "videoFile") setVideoFile(files[0]);
  };

  const uploadFile = async (file, type) => {
    if (!file) return '';
    const uploadFunction = type === 'thumbnail' ? uploadImage : uploadVideo;
    const onUploadProgress = (progressEvent) => {
      const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      setUploadProgress((prev) => ({ ...prev, [type]: progress }));
    };
    const response = await uploadFunction(file, { onUploadProgress });
    if (!response.success) throw new Error(response.error);
    return response.resourceUrl;
  };

  const validateForm = () => {
    if (!lectureData.title || !lectureData.description || !lectureData.duration) {
      setError('All fields are required.');
      return false;
    }
    if (!videoFile) {
      setError('Please upload a video file.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const thumbnailUrl = thumbnailFile ? await uploadFile(thumbnailFile, 'thumbnail') : '';
      const videoUrl = await uploadFile(videoFile, 'video');

      const response = await axios.post(import.meta.env.VITE_BASE_API_URL+`${id}/lecture/add`, {
        ...lectureData,
        thumbnailPicUrl: thumbnailUrl,
        videoUrl,
        isVideoLecture: true,
        isQuiz: false,
      });

      if (response.data.success) {
        navigate(`/courses/${id}`);
      } else {
        setError('Failed to add lecture.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while adding the lecture.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Add New Lecture</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <p className="text-center">Uploading... Please wait.</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
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
          <label className="font-semibold mb-1">Thumbnail (optional)</label>
          <input
            type="file"
            name="thumbnailFile"
            onChange={handleFileChange}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {uploadProgress.thumbnail > 0 && <p className="text-xs text-gray-500">Uploading: {uploadProgress.thumbnail}%</p>}
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Video</label>
          <input
            type="file"
            name="videoFile"
            onChange={handleFileChange}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          {uploadProgress.video > 0 && <p className="text-xs text-gray-500">Uploading: {uploadProgress.video}%</p>}
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            value={lectureData.duration}
            onChange={handleChange}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className={`mt-4 py-2 bg-blue-500 text-white rounded-lg ${loading ? 'opacity-50' : 'hover:bg-blue-600'} transition-all duration-200`}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Add Lecture'}
        </button>
      </form>
    </div>
  );
};

export default AddLecture;
