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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear any previous errors
    setSuccess(''); // Clear any previous success messages

    try {
      let badgeImageUrl = '';

      // Step 1: Upload image to Cloudinary
      if (imageFile) {
        const cloudinaryResponse = await uploadImage(imageFile);
        if (cloudinaryResponse.success) {
          badgeImageUrl = cloudinaryResponse.resourceUrl;
        } else {
          throw new Error(cloudinaryResponse.error); // Stop if image upload fails
        }
      } else {
        throw new Error('Please select an image file.');
      }

      // Step 2: Send POST request to add badge using the Cloudinary URL
      const response = await axios.post('http://localhost:8080/api/v1/add-badge-to-course', {
        ...badgeData,
        badgeImageUrl, // Use the URL from Cloudinary
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setSuccess("Badge added successfully");
      setLoading(false);
    } catch (err) {
      console.error('Error adding badge:', err.message);
      setError(err.message || 'Failed to add badge');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Add Badge to Course</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <p className="text-center">Loading...</p>}
      {<p className="text-center text-green-500">{success}</p>}

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
          className="col-span-2 mt-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
        >
          Add Badge
        </button>
      </form>
    </div>
  );
};

export default AddBadge;
