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

  // Update form state as user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLectureData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file change for thumbnail and video
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "thumbnailFile") {
      setThumbnailFile(files[0]);
    } else if (name === "videoFile") {
      setVideoFile(files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Upload files to Cloudinary if they exist
      let thumbnailUrl = "";
      let videoUrl = "";

      if (thumbnailFile) {
        const thumbnailResponse = await uploadImage(thumbnailFile);
        if (thumbnailResponse.success) {
          thumbnailUrl = thumbnailResponse.resourceUrl;
        } else {
          throw new Error(thumbnailResponse.error);
        }
      }

      if (videoFile) {
        const videoResponse = await uploadVideo(videoFile);
        if (videoResponse.success) {
          videoUrl = videoResponse.resourceUrl;
        } else {
          throw new Error(videoResponse.error);
        }
      }
      const condata = {
        ...lectureData,
        thumbnailPicUrl: thumbnailUrl,
        videoUrl: videoUrl,
        isVideoLecture: true,
        isQuiz: false,
      }

      console.log(condata);

      // Send lecture data along with Cloudinary URLs to the server
      const response = await axios.post(`http://localhost:8080/api/v1/${id}/lecture/add`, {
        ...lectureData,
        thumbnailPicUrl: thumbnailUrl,
        videoUrl: videoUrl,
        isVideoLecture: true,
        isQuiz: false,
      });
      
      if (response.data.success) {
        navigate(`/courses/${id}`);
      } else {
        setError('Failed to add lecture');
      }
    } catch (err) {
      console.log(err)
      setError(err.message || 'Failed to add lecture');
    } finally {
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
          <label className="font-semibold mb-1">Thumbnail</label>
          <input
            type="file"
            name="thumbnailFile"
            onChange={handleFileChange}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
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
          disabled={loading}
        >
          {loading ? 'Adding Lecture...' : 'Add Lecture'}
        </button>
      </form>
    </div>
  );
};

export default AddLecture;
