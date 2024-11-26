import React, { useState } from "react";
import uploadImage from "../utils/cloudUploadFunctions";

const CloudinaryUploadForm = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4"];
    if (!validTypes.includes(selectedFile?.type)) {
      setError("Invalid file type. Please upload an image or video.");
      setFile(null);
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (selectedFile.size > maxSize) {
      setError("File size exceeds 5MB. Please upload a smaller file.");
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setUploading(true);
    setError(""); // Clear previous error

    try {
      const response = await uploadImage(file);
      if (response.success) {
        setFileUrl(response.resourceUrl); // Set uploaded file URL
      } else {
        setError(response.error || "Upload failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred during the upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md bg-white shadow-lg rounded-md">
      <h1 className="text-2xl font-semibold text-center mb-4">
        Upload to Cloudinary
      </h1>

      <form onSubmit={handleUpload} className="space-y-4">
        {/* File Input */}
        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full border p-2 rounded"
            accept="image/*,video/*"
          />
        </div>

        {/* File Preview */}
        {file && file.type.startsWith("image/") && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-600">Preview:</h3>
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="max-w-full h-auto rounded-md shadow-md"
            />
          </div>
        )}

        {/* Upload Button */}
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded text-white font-semibold ${
            uploading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Uploaded File URL */}
      {fileUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Uploaded File URL:</h3>
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline break-all"
          >
            {fileUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default CloudinaryUploadForm;
