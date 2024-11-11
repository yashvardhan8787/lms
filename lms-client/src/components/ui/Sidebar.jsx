import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FaHome,
  FaBookOpen,
  FaQuestionCircle,
  FaExclamationCircle,
  FaDollarSign,
} from "react-icons/fa";
import { MdPolicy, MdKeyboardArrowDown } from "react-icons/md";

// Sidebar.js
const Sidebar = () => {
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    {
      name: "Courses",
      icon: <FaBookOpen />,
      isDropdown: true,
      subItems: [
        { name: "All Courses", path: "/courses" },
        { name: "My Course", path: "/my-course" },
      ],
    },
    { name: "About", path: "/about", icon: <FaExclamationCircle /> },
    { name: "Policy", path: "/policy", icon: <MdPolicy /> },
    { name: "FAQ", path: "/faq", icon: <FaQuestionCircle /> },
    { name: "Rewards", path: "/rewards", icon: <FaDollarSign /> },
  ];

  return (
    <div className="bg-purple-700 text-white h-screen w-64 p-6 flex flex-col">
      <nav className="mt-16 flex-grow">
        {navItems.map((item, index) => (
          <div key={index}>
            {item.isDropdown ? (
              <>
                <button
                  onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                  className="flex items-center w-full text-2xl font-bold mb-4 hover:bg-gray-100 hover:text-orange-500 hover:rounded-lg py-2 transition-all duration-200"
                >
                  <i className="mr-2">{item.icon}</i>
                  {item.name}
                  <MdKeyboardArrowDown className="ml-auto" />
                </button>
                {isCoursesOpen && (
                  <div className="pl-6">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className="block mb-2 text-xl font-semibold hover:bg-gray-100 hover:text-orange-500 hover:rounded-lg py-1 transition-all duration-200"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className="flex items-center mb-4 text-2xl font-bold hover:bg-gray-100 hover:text-orange-500 hover:rounded-lg hover:px-4 hover:pr-80 py-2 transition-all duration-200"
              >
                <i className="mr-2">{item.icon}</i>
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
      <div className="mt-auto pt-8 text-center">
        <p>Support 24/7</p>
        <button className="bg-orange-500 mt-4 py-2 px-4 rounded-lg">
          Start
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
