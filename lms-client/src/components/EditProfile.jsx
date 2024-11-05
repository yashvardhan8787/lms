import React, { useState } from 'react';
import { FaSave, FaTimesCircle, FaCamera } from 'react-icons/fa'; // Icons for save, cancel, and camera icon

const EditProfile = ({ userData, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    title: userData.title,
    about: userData.about,
  });
  
  const [avatar, setAvatar] = useState(userData.avatar || ''); // Avatar URL or file
  const [avatarPreview, setAvatarPreview] = useState(userData.avatar || ''); // Preview for the avatar
  const [errors, setErrors] = useState({}); // To store form validation errors

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle avatar file upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type (only image files)
      if (!file.type.startsWith('image/')) {
        setErrors({ avatar: 'Only image files are allowed' });
        return;
      }

      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file)); // Create a preview of the image
    }
  };

  // Form validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.about) newErrors.about = 'About section cannot be empty';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Update profile including the avatar
      onUpdate({ ...formData, avatar });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Cancel Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center text-red-600 hover:text-red-800"
        >
          <FaTimesCircle className="mr-1" /> Cancel
        </button>
      </div>

      {/* Avatar Preview and Upload */}
      <div className="flex flex-col items-center relative">
        {/* Avatar Preview */}
        {avatarPreview ? (
          <img
            src={avatarPreview}
            alt="Avatar Preview"
            className="w-32 h-32 rounded-full object-cover mb-4 shadow-lg"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-300 rounded-full mb-4 flex items-center justify-center shadow-lg">
           <img
           
            src={avatarPreview}
            alt="Avatar Preview"
            className="w-32 h-32 rounded-full object-cover mb-4 shadow-lg"
          />
          </div>
        )}

        {/* Change Avatar Button */}
        <label
          htmlFor="avatarInput"
          className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 cursor-pointer"
        >
          <FaCamera className="text-lg" />
        </label>
        <input
          id="avatarInput"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="hidden" // Hide the file input element
        />
        {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar}</p>}
      </div>

      {/* Name Input */}
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`border p-2 rounded w-full ${errors.name && 'border-red-500'}`}
          placeholder="Name"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* Email Input */}
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`border p-2 rounded w-full ${errors.email && 'border-red-500'}`}
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* Title Input */}
      <div>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`border p-2 rounded w-full ${errors.title && 'border-red-500'}`}
          placeholder="Title"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>

      {/* About Input */}
      <div>
        <textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
          className={`border p-2 rounded w-full ${errors.about && 'border-red-500'}`}
          placeholder="About Me"
          rows="4"
        />
        {errors.about && <p className="text-red-500 text-sm">{errors.about}</p>}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          <FaSave className="mr-2" /> Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
