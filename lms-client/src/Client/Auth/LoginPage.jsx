import React, { useState, useContext } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import logo from "../../../public/assets/images/Heroimg.png";
import icon from "../../../public/assets/images/image.png";
import toast from "react-hot-toast";
import LoadingScreen from "../../components/Loading";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [registration, setRegistration] = useState(true);
  const { login } = useContext(AuthContext);

  const loginUser = async (email, password) => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_API_URL+"Login",
        { email, password },
        { withCredentials: true }
      );

      setLoading(false); // Stop loading
      if (response?.status === 200 && response?.data?.success) {
        response.data.user.accessToken = response.data.accessToken;
        // Store user email in local storage
        localStorage.setItem("userEmail", response.data.user.email || "");
        // Set login context and navigate
        login(JSON.stringify(response.data.user), response.data.accessToken);
        if (response.data.user.role === "admin") {
          navigate("/adminDashboard");
        } else {
          navigate("/");
        }
      } else {
        setError(response.data.message || "Invalid credentials");
        toast.error("Invalid credentials");
      }
    } catch (err) {
      setLoading(false); // Stop loading
      setError(
        err.response?.data?.message || "An error occurred. Please try again later."
      );
      toast.error(err.response?.data?.message);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    loginUser(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl shadow-lg rounded-2xl overflow-hidden">
        {/* Left Section - Image */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gray-50 p-16">
          <img src={logo} alt="Illustration" className="w-80 h-auto" />
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-1/2 p-8 bg-white flex flex-col justify-center">
          <div className="text-center mb-6">
            <img src={icon} alt="Logo" className="w-12 h-12 mx-auto mb-2" />
            <h2 className="text-3xl font-semibold text-gray-800">Playground</h2>
            <p className="text-sm text-gray-500">Make Learning Easy</p>
          </div>

          {/* Login or Registration View */}
          {registration ? (
            <>
              <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">
                Login to Your Account
              </h3>
              {error && (
                <div className="text-center text-red-500 mb-4">{error}</div>
              )}

              {/* Show loader if loading */}
              {loading ? (
                <LoadingScreen />
              ) : (
                <form className="space-y-4" onSubmit={handleLogin}>
                  {/* Email Input */}
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:border-purple-500"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Password Input */}
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:border-purple-500"
                      onChange={(e) => setPassword(e.target.value)}
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

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="w-full bg-purple-700 text-white py-3 rounded-lg font-semibold hover:bg-purple-800 transition duration-200"
                  >
                    LOGIN
                  </button>
                </form>
              )}

              {/* Social Login */}
              <div className="text-center text-gray-500 my-4">or</div>
              <button className="flex items-center justify-center w-full bg-white border border-gray-300 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
                <FaGoogle className="mr-2" /> Login with Google
              </button>

              {/* Forgot Password & Sign Up */}
              <div className="flex justify-between text-sm mt-4">
                <button
                  onClick={() => navigate("/forgot-password")}
                  className="text-blue-500 hover:underline"
                >
                  Forgot Password?
                </button>
                <button
                  onClick={() => setRegistration(false)}
                  className="text-blue-500 hover:underline"
                >
                  Sign Up
                </button>
              </div>
            </>
          ) : (
            navigate("/register")
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
