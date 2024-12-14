import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import {
  FaHome,
  FaBookOpen,
  FaChalkboardTeacher, // New icon for "My Courses"
  FaQuestionCircle,
  FaExclamationCircle,
  FaDollarSign,
} from "react-icons/fa";
import { MdPolicy } from "react-icons/md";
import { AuthContext } from "../../contexts/AuthContext";

const Sidebar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { auth } = useContext(AuthContext);
  const userInfo = JSON.parse(auth);
  const location = useLocation();

  useEffect(() => {
    if (userInfo) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [auth]);

  const navItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "All Courses", path: "/courses", icon: <FaBookOpen /> },
    ...(loggedIn
      ? [{ name: "My Course", path: "/my-course", icon: <FaChalkboardTeacher /> }]
      : []),
    { name: "About", path: "/about", icon: <FaExclamationCircle /> },
    { name: "Policy", path: "/policy", icon: <MdPolicy /> },
    { name: "FAQ", path: "/faq", icon: <FaQuestionCircle /> },
    ...(loggedIn ? [{ name: "Rewards", path: "/rewards", icon: <FaDollarSign /> }] : []),
  ];

  return (
    <div className="bg-[#5A4BA1] text-white h-screen w-20 sm:w-64 p-6 flex flex-col transition-all duration-300">
      <nav className="mt-16 flex-grow">
        {navItems.map((item, index) => (
          <div key={index}>
            <Link
              to={item.path}
              className={`flex items-center mb-4 text-xl sm:text-2xl font-bold py-2 transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-gray-100 text-[#FD8B51] rounded-lg"
                  : "hover:bg-gray-100 hover:text-[#FD8B51] hover:rounded-lg"
              }`}
            >
              <i className="mr-0 sm:mr-2 text-2xl">{item.icon}</i>
              <span className="hidden sm:inline">{item.name}</span>
            </Link>
          </div>
        ))}
      </nav>

      {/* Remove the Support and Contact Us buttons for small screens */}
      <div className="hidden sm:block mt-auto pt-8 text-center">
        <p>Support 24/7</p>
        <button className="bg-[#FD8B51] mt-4 py-2 px-4 rounded-lg transition-all duration-200 hover:bg-[#e67c3c]">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
