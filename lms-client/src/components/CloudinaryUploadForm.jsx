import React, { useState } from 'react';
import uploadImage from '../utils/cloudUploadFunctions';

const CloudinaryUploadForm = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setUploading(true);
    setError(''); // Clear previous error message

    try {
      // Wait for the uploadImage function to return the response
      const response = await uploadImage(file);
      
      if (response.success) {
        setFileUrl(response.resourceUrl);  // Set the uploaded file URL
      } else {
        setError(response.error);  // Set the error message
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong during the upload.");
    } finally {
      setUploading(false);  // Stop the uploading state
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Upload a File to Cloudinary</h1>
      <form onSubmit={handleUpload}>
        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="border p-2 rounded w-full"
            accept="image/*,video/*"  // Ensure correct file type
          />
        </div>

        {uploading ? (
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded opacity-50 cursor-not-allowed"
            disabled
          >
            Uploading...
          </button>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Upload
          </button>
        )}
      </form>

      {/* Display the error message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Display the uploaded file URL */}
      {fileUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Uploaded File URL:</h3>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            {fileUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default CloudinaryUploadForm;
