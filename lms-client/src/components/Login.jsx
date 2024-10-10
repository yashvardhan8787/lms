import React, { useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Registration from "./Registration"; // Import the Registration component

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registration, setRegistration] = useState(true); // Control login/registration views

  return (
    <div className={`min-h-screen flex items-center justify-center ${!registration ? "bg-gray-900 backdrop-blur-sm" : "bg-gray-900"}`}>
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 shadow-lg rounded-xl">
        {/* Conditional rendering for Login or Registration */}
        {registration ? (
          <>
            <h2 className="text-2xl font-semibold text-white text-center">
              Login with ELearning
            </h2>

            <form className="mt-8 space-y-6">
              {/* Email Input */}
              <div className="relative">
                <label className="block text-gray-400 mb-2">
                  Enter your Email
                </label>
                <input
                  type="email"
                  placeholder="loginmail@gmail.com"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white outline-none border border-gray-600 focus:border-blue-400"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <label className="block text-gray-400 mb-2">
                  Enter your password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="password!@%"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white outline-none border border-gray-600 focus:border-blue-400"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-4 flex items-center text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
                >
                  Login
                </button>
              </div>
            </form>

            {/* Social Login */}
            <div className="text-center text-gray-400">Or join with</div>
            <div className="flex justify-center space-x-6 text-white">
              <FaGoogle className="w-8 h-8 cursor-pointer" />
              <FaGithub className="w-8 h-8 cursor-pointer" />
            </div>

            {/* Sign up Link */}
            <div className="text-center text-gray-400">
              Not have any account?{" "}
              <button
                onClick={() => setRegistration(false)} // Switch to registration view
                className="text-blue-400 font-semibold hover:underline"
              >
                Sign up
              </button>
            </div>
          </>
        ) : (
          <div className="fixed inset-0 flex items-center justify-center w-full backdrop-blur-sm bg-gray-900 bg-opacity-70 z-10 ">
          <div className=" rounded-lg shadow-lg w-full z-20">
            <Registration/>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Login;
