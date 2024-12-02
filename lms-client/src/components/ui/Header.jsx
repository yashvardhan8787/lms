import React, { useContext, useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { LuCoins } from "react-icons/lu";
import { getUserInfo, logoutUser } from "../../api/auth";
import { AuthContext } from "../../contexts/AuthContext";
import ChatBot from "../../ChatBot/ChatBot";
import toast from "react-hot-toast";
import { RiRobot3Fill } from "react-icons/ri";
import { IoBagSharp } from "react-icons/io5";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { auth, logout } = useContext(AuthContext);
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await getUserInfo();
        setUserData(res?.data?.user);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
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
      
      <div className="flex items-center justify-between px-6 py-4">
        {/* Mobile Menu Button */}
        <button
          className="mr-4 text-white hover:text-[#FD8B51] focus:outline-none md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <IoMenu className="h-6 w-6" />
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <h1 className="text-4xl font-extrabold text-white">Playground</h1>
        </Link>

        {/* Navigation */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex items-center space-x-6`}
        >
          {loggedIn ? (
            <>
              {/* ChatBot Icon */}
              <button
                onClick={() => setIsChatBotOpen(true)}
                className="flex items-center space-x-2"
              >
                <RiRobot3Fill className="h-10 w-10 text-[#FD8B51] hover:text-[#FD8B51]" />
              </button>

              {/* User Streaks */}
              <div className="flex items-center justify-center h-10 w-20 bg-gray-100 rounded-full px-3 py-1">
                <LuCoins className="h-6 w-6 text-green-500 font-extrabold" />
                <span className="font-bold text-xl text-gray-800">
                  {userData?.streaks}
                </span>
              </div>

              {/* User Profile */}
              <Link to="/profile" className="flex items-center space-x-2">
                <FaRegUserCircle className="h-6 w-6 text-white hover:text-[#FD8B51]" />
                <span className="text-lg font-medium text-white hover:text-[#FD8B51]">
                  {userData?.name}
                </span>
              </Link>

              {/* Logout Button */}
              <button
                className="bg-[#FD8B51] rounded-2xl w-32 py-2 px-4 text-white text-lg font-bold transition-all duration-300 ease-in-out hover:bg-[#e67c3c]"
                onClick={handleLogout}
              >
                Logout
              </button>

              {/* Shopping Bag Icon */}
              <button className="flex items-center space-x-2">
                <IoBagSharp className="h-7 w-7 text-white " />
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="bg-[#FD8B51] rounded-2xl w-32 py-2 px-4 text-white text-lg font-bold transition-all duration-300 ease-in-out hover:bg-[#e67c3c]">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* ChatBot Modal */}
      {isChatBotOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <ChatBot onClose={() => setIsChatBotOpen(false)} />
        </div>
      )}
    </header>
  );
};

export default Header;
