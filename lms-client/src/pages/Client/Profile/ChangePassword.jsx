import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ChangePassword = ({ onPasswordChange, onCancel }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPasswordChange(passwordData);
    toast.success("SuccessFully Change Password")
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-2xl font-semibold text-gray-700">Change Password</h3>
      <input
        type="password"
        name="currentPassword"
        value={passwordData.currentPassword}
        onChange={handleChange}
        placeholder="Current Password"
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        name="newPassword"
        value={passwordData.newPassword}
        onChange={handleChange}
        placeholder="New Password"
        className="w-full p-2 border rounded"
      />
      <div className="flex space-x-4">
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500">
          Change Password
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
