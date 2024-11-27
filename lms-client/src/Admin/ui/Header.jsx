import React, { useContext, useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/auth";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { auth ,logout } = useContext(AuthContext);
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(!!userEmail);
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
    <header className="bg-gradient-to-r from-gray-100 to-gray-300 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button className="mr-4 text-gray-800 hover:text-[#FD8B51] focus:outline-none">
            <IoMenu className="h-6 w-6" />
          </button>
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight hover:text-[#FD8B51] transition-colors duration-200">
              Admin Dashboard
            </h1>
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          {loggedIn ? (
            <>
              <Link to="/adminDashboard/profile" className="flex items-center space-x-2">
                <FaRegUserCircle className="h-6 w-6 text-gray-800 hover:text-[#FD8B51]" />
                <span className="text-lg font-medium text-gray-800 hover:text-[#FD8B51] transition-colors duration-200">
                  {JSON.parse(auth).name }
                </span>
              </Link>
              <button
                className="bg-[#5A4BA1] rounded-full w-32 py-2 text-white text-lg hover:bg-[#704cb2] hover:text-[#FD8B51] font-semibold shadow-md transition-all duration-300 ease-in-out"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="bg-[#5A4BA1] rounded-full w-32 py-2 text-white text-lg hover:bg-[#704cb2] hover:text-[#FD8B51] font-semibold shadow-md transition-all duration-300 ease-in-out">
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
