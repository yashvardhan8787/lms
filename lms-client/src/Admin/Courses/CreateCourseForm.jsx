import React, { useState } from 'react';
import uploadImage, { uploadVideo } from '../../utils/cloudUploadFunctions'; // assuming the function is in this file

const CreateCourseForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categories: '',
    price: '',
    estimatedPrice: '',
    tags: '',
    level: '',
    demoUrl: '',
    benefits: '',
    prerequisites: '',
    thumbnailUrl: null,
    roadmapPicUrl: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false); // Added submitSuccess state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      console.log("Form data updated:", { ...prevData, [name]: value }); // Log updated form data
      return { ...prevData, [name]: value };
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    console.log("File selected for", name, files[0]); // Log the selected file
    setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = 'Course name is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.categories) newErrors.categories = 'At least one category is required';
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) newErrors.price = 'Price must be a positive number';
    if (formData.estimatedPrice && (isNaN(formData.estimatedPrice) || formData.estimatedPrice <= 0)) {
      newErrors.estimatedPrice = 'Estimated price must be a positive number';
    }
    if (!formData.thumbnailUrl) newErrors.thumbnailUrl = 'Thumbnail image is required';
    if (!formData.roadmapPicUrl) newErrors.roadmapPicUrl = 'Roadmap image is required';

    setErrors(newErrors);
    console.log("Validation errors:", newErrors); // Log validation errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted, validating..."); // Log when submit is triggered
    if (!validateForm()) {
      console.log("Form validation failed, stopping submit"); // Log if validation fails
      return;
    }

    setLoading(true);
    try {
      // Upload thumbnail and roadmap images to Cloudinary
      console.log("Uploading thumbnail and roadmap images...");
      const thumbnailResponse = await uploadImage(formData.thumbnailUrl);
      const roadmapResponse = await uploadImage(formData.roadmapPicUrl);

      if (!thumbnailResponse.success || !roadmapResponse.success) {
        setErrors({
          thumbnailUrl: thumbnailResponse.error || 'Failed to upload thumbnail',
          roadmapPicUrl: roadmapResponse.error || 'Failed to upload roadmap image',
        });
        setLoading(false);
        console.log("Upload failed:", thumbnailResponse, roadmapResponse); // Log upload failure
        return;
      }

      // Construct final course data
      const courseData = {
        ...formData,
        thumbnailUrl: thumbnailResponse.resourceUrl,
        roadmapPicUrl: roadmapResponse.resourceUrl,
      };
      console.log("Course data to be submitted:", courseData); // Log the course data being sent

      // Send the API request to create a new course
      const response = await fetch(import.meta.env.VITE_BASE_API_URL+'create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });

      console.log("API response:", response); // Log the API response
      if (response.ok) {
        setSubmitSuccess(true);
        console.log("Course created successfully!"); // Log success
      } else {
        const errorData = await response.json();
        setErrors({ submit: errorData.message || 'Failed to create course' });
        console.log("Error response from API:", errorData); // Log error response from API
      }
    } catch (error) {
      console.error('Error creating course:', error);
      setErrors({ submit: 'Failed to create course, please try again' });
      console.log("Error during course creation:", error); // Log error during API call
    } finally {
      setLoading(false);
      console.log("Loading state finished"); // Log when loading finishes
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Create New Course</h2>
      
      <div className="grid grid-cols-3 gap-4">
        {/* Course Name */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Course Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 h-16" required />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        {/* Categories */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Categories</label>
          <input type="text" name="categories" value={formData.categories} onChange={handleChange} className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          {errors.categories && <p className="text-red-500 text-sm">{errors.categories}</p>}
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Price</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>

        {/* Estimated Price */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Estimated Price</label>
          <input type="number" name="estimatedPrice" value={formData.estimatedPrice} onChange={handleChange} className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          {errors.estimatedPrice && <p className="text-red-500 text-sm">{errors.estimatedPrice}</p>}
        </div>

        {/* Thumbnail Image */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Thumbnail Image</label>
          <input type="file" name="thumbnailUrl" accept="image/*" onChange={handleFileChange} className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          {errors.thumbnailUrl && <p className="text-red-500 text-sm">{errors.thumbnailUrl}</p>}
        </div>

        {/* Roadmap Image */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Roadmap Image</label>
          <input type="file" name="roadmapPicUrl" accept="image/*" onChange={handleFileChange} className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          {errors.roadmapPicUrl && <p className="text-red-500 text-sm">{errors.roadmapPicUrl}</p>}
        </div>

        {/* Additional Fields (Tags, Level, Demo URL, Benefits, Prerequisites) */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Tags</label>
          <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Level</label>
          <input type="text" name="level" value={formData.level} onChange={handleChange} className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Demo URL</label>
          <input type="url" name="demoUrl" value={formData.demoUrl} onChange={handleChange} className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Benefits</label>
          <input type="text" name="benefits" value={formData.benefits} onChange={handleChange} className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Prerequisites</label>
          <input type="text" name="prerequisites" value={formData.prerequisites} onChange={handleChange} className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
      </div>

      <button type="submit" className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors w-full" disabled={loading}>
        {loading ? 'Creating Course...' : 'Create Course'}
      </button>
      {errors.submit && <p className="text-red-500 text-sm mt-2">{errors.submit}</p>}
    </form>
  );
};

export default CreateCourseForm;
