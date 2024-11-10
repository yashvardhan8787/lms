import React, { useState } from 'react';
import { forgetPassword } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

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
        toast.success("OTP send To Your E-mail")
        setTimeout(() => navigate("/reset-password"), 2000);
      } else {
        setError(response.data.message || 'Something went wrong.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl shadow-lg rounded-2xl overflow-hidden flex justify-center items-center  bg-white">
        

        <div className="w-full  p-8 bg-white flex flex-col justify-center ">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold text-gray-800 p-5">Forgot your password?</h2>
            <p className="text-sm text-gray-500">Enter your registered email, and we’ll send you an OTP to reset your password.</p>
          </div>

          {error && <div className="text-center text-red-500 mb-4">{error}</div>}
          {success && <div className="text-center text-green-500 mb-4">{success}</div>}

          <form className="space-y-4 flex justify-center items-center flex-col gap-2" onSubmit={handleForgetPasswordRequest}>
            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                placeholder="Registered Email Address"
                className="w-72 px-4 py-3 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:border-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-60 bg-purple-700 text-white py-3 rounded-lg font-semibold hover:bg-purple-800 transition duration-200"
            >
              Send OTP
            </button>
          </form>

          {/* Instructions */}
          <div className="text-gray-500 text-sm text-center mt-4">
            Remembered your password?{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              Login here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
