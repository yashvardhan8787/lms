import React, { useContext, useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfo, logoutUser } from "../../api/auth";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { auth, logout } = useContext(AuthContext);
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await getUserInfo();
        setUserData(res?.data?.user);
      } catch (err) {
        console.error(err.response?.data?.message || "An error occurred");
      }
    };
    fetchUserInfo();
  }, [auth]);

  useEffect(() => {
    if (userEmail) {
      setLoggedIn(true);
    }
  }, [userEmail]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      localStorage.removeItem("userEmail");
      setLoggedIn(false);
      toast.success("Successfully Logged Out");
      navigate("/");
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  };

  return (
    <header className="bg-gradient-to-r from-[#5A4BA1] to-[#704cb2] shadow-md sticky top-0 z-50 font-roboto">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <h1 className="text-lg sm:text-2xl font-extrabold text-white">
            Playground
          </h1>
        </Link>

        {/* Navigation */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          {loggedIn ? (
            <>
              {/* User Profile - Always Visible */}
              <Link
                to="/profile"
                className="flex items-center space-x-2 sm:space-x-1"
              >
                <FaRegUserCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white hover:text-[#FD8B51]" />
                <span className="hidden sm:inline text-xs sm:text-sm font-medium text-white hover:text-[#e67c3c]">
                  {userData?.name}
                </span>
              </Link>

              {/* Logout Button - Always Visible */}
              <button
                className="bg-[#FD8B51] rounded-xl sm:rounded-2xl w-20 sm:w-24 py-1 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm text-white font-bold transition-all duration-300 ease-in-out hover:bg-[#e67c3c]"
                onClick={handleLogout}
              >
                Logout
              </button>

              {/* Hidden on Small Screens */}
              <div className="hidden sm:flex items-center space-x-4">
                {/* Additional Items - Visible only on larger screens */}
                {/* Example: User Streaks or other icons */}
                <span className="h-8 w-16 bg-gray-100 rounded-full px-2 py-1 flex items-center justify-center">
                  {/* Replace with actual data */}
                  Streaks
                </span>
              </div>
            </>
          ) : (
            <Link to="/login">
              <button className="bg-[#FD8B51] rounded-xl sm:rounded-2xl w-20 sm:w-24 py-1 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm text-white font-bold transition-all duration-300 ease-in-out hover:bg-[#e67c3c]">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
