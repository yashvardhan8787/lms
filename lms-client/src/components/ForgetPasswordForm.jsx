import React, { useState } from 'react';
import { forgetPassword } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();  // <-- Correct placement of useNavigate hook

  const handleForgetPasswordRequest = async (e) => {
    e.preventDefault();
  
    setError('');
    setSuccess('');
  
    // Simple email validation
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
  
    try {
      const response = await forgetPassword(email);
  
      if (response.data && response.data.success) {
        setSuccess('An OTP has been sent to your registered email address.');
        setTimeout(() => navigate("/reset-password"), 2000);  // <-- Correct use of navigate
      } else {
        setError(response.data.message || 'Something went wrong.');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Failed to send reset email. Please try again later.');
      } else {
        setError('Failed to send reset email. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 shadow-lg rounded-xl">
        <h2 className="text-3xl font-bold text-white text-center">
          Forgot your password?
        </h2>
        <p className="text-gray-400 text-center">
          Enter your registered email below and we'll send you a One-Time Password (OTP) to reset your password.
        </p>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {success && <div className="text-green-500 text-center mb-4">{success}</div>}

        <form className="space-y-6" onSubmit={handleForgetPasswordRequest}>
          {/* Email Input */}
          <div>
            <label className="block text-gray-400 mb-2">
              Registered Email Address
            </label>
            <input
              type="email"
              placeholder="youremail@example.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white outline-none border border-gray-600 focus:border-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
            >
              Send OTP
            </button>
          </div>
        </form>

        {/* Instructions */}
        <div className="text-gray-400 text-sm text-center mt-4">
          Remembered your password?{' '}
          <a href="/login" className="text-blue-400 hover:underline">
            Login here
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
