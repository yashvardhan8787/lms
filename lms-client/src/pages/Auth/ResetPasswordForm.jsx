import React, { useState } from 'react';
import { resetPassword } from '../../api/auth'; // Assuming the API call is defined here
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ResetPasswordForm = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!otp) {
      setError('Please enter the OTP.');
      setSuccess('');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      setSuccess('');
      return;
    }

    try {
      const response = await resetPassword(otp, newPassword);
      if (response.status === 201) {
        setSuccess('Your password has been successfully reset.');
        toast.success("Success Fully Reset Password")
        setError('');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(response.data?.message || 'Something went wrong.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Reset Password
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Enter the OTP and your new password
        </p>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {success && <div className="text-green-500 text-center mb-4">{success}</div>}

        <form onSubmit={handleResetPassword} className="space-y-4">
          {/* OTP Input */}
          <div>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full px-4 py-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          {/* New Password Input */}
          <div>
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-900 transition duration-200"
          >
            Reset Password
          </button>
        </form>

        {/* Link to Login */}
        <div className="text-center text-gray-500 text-sm mt-6">
          Remembered your password?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
