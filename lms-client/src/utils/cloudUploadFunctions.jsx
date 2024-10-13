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
  // Use `import.meta.env` for Vite environment variables
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await axios.post(import.meta.env.VITE_CLOUDINARY_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return {
      resourceUrl: response.data.secure_url,
      error: "",
      success: true,
    };
  } catch (error) {
    return {
      resourceUrl: "",
      error: `Error: ${error.response?.data?.error?.message || 'Something went wrong'}`,
      success: false,
    };
  }
};

// Function for image upload
export const uploadImage = (file) => uploadToCloudinary(file);

// Function for video upload (can extend if needed, or use same as image upload)
export const uploadVideo = (file) => uploadToCloudinary(file);

export default uploadImage;
