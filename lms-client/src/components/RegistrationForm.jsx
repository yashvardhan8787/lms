import React, { useContext, useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
// import Cookies from "js-cookie"; 

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const {setToken} = useContext(AuthContext);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const userRegistration = async (data) => {
    setError("");
    try {
      const response = await registerUser(data);

      // Assuming a 201 status indicates success and token is sent as a cookie
      if (response?.status == 201) {
        const activationToken = response?.data?.activationToken;
        setToken(activationToken);
       
        setSuccess("Registration successful! Please check your email.");
        setError(""); // Clear errors if success
        setTimeout(() => navigate("/confirm-email"), 2000); // Redirect after 2s
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill out all fields.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Proceed with API registration
    userRegistration(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 shadow-lg rounded-xl">
        <h2 className="text-3xl font-bold text-white text-center">
          Join eLearning
        </h2>

        <p className="text-gray-400 text-center">
          Create your account to access thousands of courses.
        </p>

        {error && <div className="text-red-500 text-center">{error}</div>}
        {success && <div className="text-green-500 text-center">{success}</div>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="relative">
            <label className="block text-gray-400 mb-2">Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white outline-none border border-gray-600 focus:border-blue-400"
              required
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <label className="block text-gray-400 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="loginmail@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white outline-none border border-gray-600 focus:border-blue-400"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="block text-gray-400 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white outline-none border border-gray-600 focus:border-blue-400"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-4 flex items-center text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Must be at least 6 characters.
            </p>
          </div>

          {/* Register Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
            >
              Register
            </button>
          </div>
        </form>

        {/* Social Login */}
        <div className="text-center text-gray-400 mt-4">Or sign up with</div>
        <div className="flex justify-center space-x-6 mt-4">
          <button className="flex items-center space-x-2 bg-gray-700 p-2 rounded-lg hover:bg-gray-600 transition">
            <FaGoogle className="w-6 h-6 text-white" />
            <span className="text-white">Google</span>
          </button>
          <button className="flex items-center space-x-2 bg-gray-700 p-2 rounded-lg hover:bg-gray-600 transition">
            <FaGithub className="w-6 h-6 text-white" />
            <span className="text-white">GitHub</span>
          </button>
        </div>

        {/* Redirect to Login */}
        <div className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Log In
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
