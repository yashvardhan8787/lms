import React, { useState } from 'react';
import { resetPassword } from '../api/auth'; // Assuming the API call is defined here
import { useNavigate } from 'react-router-dom';

const ResetPasswordForm = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();  // Use navigate at the top

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
      // Ensure you're passing the correct data structure
      const response = await resetPassword(otp, newPassword );
      
      if (response.status === 201) {
        setSuccess('Your password has been successfully reset.');
        setError('');
        
        // Redirect to login after success
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
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 shadow-lg rounded-xl">
        <h2 className="text-3xl font-bold text-white text-center">
          Reset your password
        </h2>
        <p className="text-gray-400 text-center">
          Enter the code you received in your email along with your new password.
        </p>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {success && <div className="text-green-500 text-center mb-4">{success}</div>}

        <form className="space-y-6" onSubmit={handleResetPassword}>
          {/* OTP Input */}
          <div>
            <label className="block text-gray-400 mb-2">
              Code Sent to Your Email
            </label>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white outline-none border border-gray-600 focus:border-blue-400"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          {/* New Password Input */}
          <div>
            <label className="block text-gray-400 mb-2">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white outline-none border border-gray-600 focus:border-blue-400"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
            >
              Reset Password
            </button>
          </div>
        </form>

        {/* Instructions */}
        <div className="text-gray-400 text-sm text-center mt-4">
          Back to{' '}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
