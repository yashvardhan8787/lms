import React, { useState } from 'react';
import { FaSave, FaTimesCircle, FaLock } from 'react-icons/fa'; // Icons

const ChangePassword = ({ onPasswordChange, onCancel }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [errors, setErrors] = useState({}); // To store form validation errors

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  // Form validation
  const validate = () => {
    const newErrors = {};
    if (!passwordData.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!passwordData.newPassword) newErrors.newPassword = 'New password is required';
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      newErrors.confirmNewPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onPasswordChange(passwordData); // Call parent function to change password
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

      {/* Current Password Input */}
      <div>
        <input
          type="password"
          name="currentPassword"
          value={passwordData.currentPassword}
          onChange={handleChange}
          className={`border p-2 rounded w-full ${errors.currentPassword && 'border-red-500'}`}
          placeholder="Current Password"
        />
        {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword}</p>}
      </div>

      {/* New Password Input */}
      <div>
        <input
          type="password"
          name="newPassword"
          value={passwordData.newPassword}
          onChange={handleChange}
          className={`border p-2 rounded w-full ${errors.newPassword && 'border-red-500'}`}
          placeholder="New Password"
        />
        {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
      </div>

      {/* Confirm New Password Input */}
      <div>
        <input
          type="password"
          name="confirmNewPassword"
          value={passwordData.confirmNewPassword}
          onChange={handleChange}
          className={`border p-2 rounded w-full ${errors.confirmNewPassword && 'border-red-500'}`}
          placeholder="Confirm New Password"
        />
        {errors.confirmNewPassword && <p className="text-red-500 text-sm">{errors.confirmNewPassword}</p>}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          <FaSave className="mr-2" /> Change Password
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
