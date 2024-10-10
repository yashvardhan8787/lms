import React, { useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 shadow-lg rounded-xl">
        <h2 className="text-2xl font-semibold text-white text-center">
          Registration with ELearning
        </h2>

        <form className="mt-8 space-y-6">
          {/* Email Input */}
          <div className="relative">
            <label className="block text-gray-400 mb-2">Enter Your Name</label>
            <input
              type="text"
              placeholder="enter your name"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white outline-none border border-gray-600 focus:border-blue-400"
            />
          </div>
          <div className="relative">
            <label className="block text-gray-400 mb-2">Enter your Email</label>
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
              Register
            </button>
          </div>
        </form>

        {/* Social Login */}
        <div className="text-center text-gray-400">Or join with</div>
        <div className="flex justify-center space-x-6 text-white">
          <FaGoogle className="w-8 h-8 cursor-pointer" />
          <FaGithub className="w-8 h-8 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Registration;