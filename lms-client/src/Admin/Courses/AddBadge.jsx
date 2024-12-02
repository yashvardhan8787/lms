import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import uploadImage from '../../utils/cloudUploadFunctions'; // Import the Cloudinary upload function

const AddBadge = () => {
  const { id } = useParams(); // Get the courseId from URL params
  const [success, setSuccess] = useState("");
  const [imageFile, setImageFile] = useState(null); // State for the image file
  const [badgeData, setBadgeData] = useState({
    badgeImageUrl: '',
    title: '',
    description: '',
    name: '',
    courseId: id,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBadgeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Validate form fields
  const validateForm = () => {
    if (!badgeData.title || !badgeData.description || !badgeData.name) {
      setError('Please fill out all fields.');
      return false;
    }
    if (!imageFile) {
      setError('Please select an image file.');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear any previous errors
    setSuccess(''); // Clear any previous success messages

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Step 1: Upload image to Cloudinary
      const cloudinaryResponse = await uploadImage(imageFile);
      if (!cloudinaryResponse.success) {
        throw new Error(cloudinaryResponse.error); // Stop if image upload fails
      }

      // Step 2: Send POST request to add badge using the Cloudinary URL
      const response = await axios.post(import.meta.env.VITE_BASE_API_URL+'add-badge-to-course', {
        ...badgeData,
        badgeImageUrl: cloudinaryResponse.resourceUrl,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        setSuccess("Badge added successfully!");
        setBadgeData({ title: '', description: '', name: '', badgeImageUrl: '', courseId: id });
        setImageFile(null);
      } else {
        setError("Failed to add badge.");
      }
    } catch (err) {
      console.error('Error adding badge:', err.message);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Add Badge to Course</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        
        {/* Image file upload */}
        <div className="flex flex-col col-span-2">
          <label className="font-semibold mb-1">Badge Image</label>
          <input
            type="file"
            name="badgeImage"
            onChange={handleImageChange}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            accept="image/*"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={badgeData.title}
            onChange={handleChange}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={badgeData.description}
            onChange={handleChange}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Badge Name</label>
          <input
            type="text"
            name="name"
            value={badgeData.name}
            onChange={handleChange}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className={`col-span-2 mt-4 py-2 text-white rounded-lg transition-all duration-200 ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={loading}
        >
          {loading ? 'Adding Badge...' : 'Add Badge'}
        </button>
      </form>
    </div>
  );
};

export default AddBadge;
