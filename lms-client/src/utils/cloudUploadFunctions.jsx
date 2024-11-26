import axios from 'axios';

// General upload function to handle both images and videos
const uploadToCloudinary = async (file) => {
  if (!file) {
    return {
      resourceUrl: "",
      error: "Please select a file to upload.",
      success: false,
    };
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  try {
    // Make the POST request to Cloudinary
    const response = await axios.post(import.meta.env.VITE_CLOUDINARY_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Ensure the response data is valid before accessing it
    const resourceUrl = response?.data?.secure_url || "";
    return {
      resourceUrl,
      error: "",
      success: !!resourceUrl, // Ensure success is true if a URL is returned
    };
  } catch (error) {
    // Improved error handling
    const errorMessage = error.response?.data?.error?.message || 'Something went wrong';
    return {
      resourceUrl: "",
      error: `Error: ${errorMessage}`,
      success: false,
    };
  }
};

// Function for image upload
export const uploadImage = (file) => uploadToCloudinary(file);

// Function for video upload (uses the same logic as image upload)
export const uploadVideo = (file) => uploadToCloudinary(file);

export default uploadImage;
