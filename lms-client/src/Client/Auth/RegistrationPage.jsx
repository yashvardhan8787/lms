import React, { useContext, useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { registerUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import icon from "../../../public/assets/images/Heroimg.png";
import logo from "../../../public/assets/images/image.png";
import toast from "react-hot-toast";
import LoadingScreen from "../../components/Loading";

const RegistrationPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const userRegistration = async (data) => {
    setError("");
    setLoading(true); // Set loading to true when the registration starts
    try {
      const response = await registerUser(data);
      setLoading(false); // Set loading to false once the registration response is received
      if (response?.status === 201) {
        const activationToken = response?.data?.activationToken;
        setToken(activationToken);
        setSuccess("Registration successful! Please check your email.");
        setTimeout(() => navigate("/confirm-email"), 2000);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setLoading(false); // Set loading to false if there is an error
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill out all fields.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    userRegistration(formData);
    toast.success("Successfully Registered");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl shadow-lg rounded-2xl overflow-hidden">
        {/* Right Section - Form */}
        <div className="w-full md:w-1/2 p-8 bg-white flex flex-col justify-center">
          <div className="text-center mb-6">
            <img src={logo} alt="Logo" className="w-12 h-12 mx-auto mb-2" />
            <h2 className="text-3xl font-semibold text-gray-800">Playground</h2>
            <p className="text-sm text-gray-500">Make Learning Easy</p>
          </div>

          <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">
            Create Your Account
          </h3>
          {error && (
            <div className="text-center text-red-500 mb-4">{error}</div>
          )}
          {success && (
            <div className="text-center text-green-500 mb-4">{success}</div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:border-purple-500"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:border-purple-500"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:border-purple-500"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
              </button>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-purple-700 text-white py-3 rounded-lg font-semibold hover:bg-purple-800 transition duration-200"
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <LoadingScreen/>
                  <span>Signing Up...</span>
                </div>
              ) : (
                "SIGN UP"
              )}
            </button>
          </form>

          {/* Social Login */}
          <div className="text-center text-gray-500 my-4">or</div>
          <button className="flex items-center justify-center w-full bg-white border border-gray-300 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
            <FaGoogle className="mr-2" /> Sign up with Google
          </button>

          {/* Redirect to Login */}
          <div className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:underline"
            >
              Log In
            </button>
          </div>
        </div>
        {/* Left Section - Image */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gray-50 p-16">
          <img src={icon} alt="Illustration" className="w-80 h-auto" />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
