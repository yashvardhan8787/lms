import React, { useState, useContext } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { activateUser } from "../api/auth";
import { useNavigate } from "react-router-dom"; // Changed from Navigate to useNavigate
import { AuthContext } from "../contexts/AuthContext";

const EmailConfirmationForm = () => {
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { activationToken } = useContext(AuthContext);
  const navigate = useNavigate(); // Corrected to use useNavigate

  
  const verifyEmail = async (data) => {
    if (!activationToken) {
      setError("Activation token is missing. Please try registering again.");
      return;
    }
  
    try {
      const response = await activateUser(data, {
        headers: {
          Authorization: `Bearer ${activationToken}`, // Pass the token in the Authorization header
        },
      });
  
      if (response.status === 201) {
        setSuccess("Email is verified.");
        setError(""); // Clear errors if success
        setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
      } else {
        setError(response.data.message || "Something went wrong.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  const handleEmailConfirmation = (e) => {
    e.preventDefault();

    if (otp.length !== 4) {
      setError("OTP should be 4 digits.");
      setSuccess("");
      return;
    }

    // Proceed with email verification
    verifyEmail({
      "activation_code": otp,
      "activation_token": activationToken,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 shadow-lg rounded-xl">
        <h2 className="text-3xl font-bold text-white text-center">
          Confirm Your Email
        </h2>
        <p className="text-gray-400 text-center">
          Please enter the OTP sent to your email address.
        </p>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {success && <div className="text-green-500 text-center mb-4">{success}</div>}

        <form className="mt-8 space-y-6" onSubmit={handleEmailConfirmation}>
          {/* OTP Input */}
          <div className="relative">
            <label className="block text-gray-400 mb-2">Enter OTP</label>
            <div className="relative">
              <input
                type={showOtp ? "text" : "password"}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 4-digit OTP"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white outline-none border border-gray-600 focus:border-blue-400"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-4 flex items-center text-gray-400"
                onClick={() => setShowOtp(!showOtp)}
              >
                {showOtp ? <IoMdEye /> : <IoMdEyeOff />}
              </button>
            </div>
          </div>

          {/* Confirm Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
            >
              Confirm Email
            </button>
          </div>
        </form>

        {/* Additional Info */}
        <div className="text-gray-400 text-sm text-center mt-4">
          Didn’t receive an email?{" "}
          <a href="" className="text-blue-400 hover:underline">
            Resend OTP
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmationForm;
