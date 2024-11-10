import React, { useContext, useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { LuCoins } from "react-icons/lu";
import { FaBell } from "react-icons/fa";
import { logoutUser } from "../../api/auth";
import { AuthContext } from "../../contexts/AuthContext";
import  toast from "react-hot-toast"

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { auth, logout } = useContext(AuthContext);
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    if (userEmail) {
      setLoggedIn(true);
    }
  }, [userEmail]);

  const handleLogout = async () => {
    try {
      await logoutUser(); // Call API to log out
      logout();
      localStorage.removeItem("userEmail");
      setLoggedIn(false);
      toast.success("SucessFully Logout")
      navigate("/"); // Redirect to the home page after logout
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  };

  return (
    <div>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center">
            <button
              variant="ghost"
              size="icon"
              className="mr-2 md:mr-4 text-gray-800"
            >
              <IoMenu className="h-6 w-6" />
            </button>
            <Link to="/">
              <h1 className="text-5xl font-bold">Admin Dashdoard</h1>
              <span className="font-bold text-base md:text-lg text-gray-800" />
            </Link>
          </div>
          <div className="flex items-center justify-between gap-5">
            {/* <div className="flex flex-col ">
              <span className="font-medium">
                <FaBell className="h-6 w-6 md:h-6 md:w-6 mr-1 ml-1" />
              </span>
            </div>
            <div className="flex items-center justify-center h-10 w-20 bg-gray-100 rounded-full px-2 md:px-3 py-1">
              <LuCoins className="h-6 w-6 md:h-6 md:w-6 mr-1 ml-1 text-green-500 font-extrabold" />
              <span className="font-bold text-xl md:text-xl text-gray-800">
                0
              </span>
            </div> */}
            {loggedIn ? (
              <>
                {/* <Link  to="profile">
                  <button
                    variant="ghost"
                    size="icon"
                    className="flex items-center"
                  >
                    <FaRegUserCircle className="h-5 w-5 md:h-6 md:w-6" />
                  </button>
                </Link> */}
                <button
                  className="bg-purple-700 rounded-2xl w-32 p-2 text-white text-xl hover:text-orange-400 font-bold"
                  onClick=""
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login">
                <button className="bg-purple-700 rounded-2xl w-32 p-2 text-white text-xl hover:text-orange-400 font-bold">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
