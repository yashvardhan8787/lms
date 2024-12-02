import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import {
  FaHome,
  FaBookOpen,
  FaQuestionCircle,
  FaExclamationCircle,
  FaDollarSign,
} from "react-icons/fa";
import { MdPolicy, MdKeyboardArrowDown } from "react-icons/md";
import { AuthContext } from "../../contexts/AuthContext";

const Sidebar = () => {
  const [dropdownState, setDropdownState] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const { auth } = useContext(AuthContext);
  const userInfo = JSON.parse(auth);
  const location = useLocation();

  useEffect(() => {
    if (userInfo) {
      setLoggedIn(true);
    }else{
      setLoggedIn(false);
    }
  }, [auth]);

  const toggleDropdown = (name) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const navItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    {
      name: "Courses",
      icon: <FaBookOpen />,
      isDropdown: true,
      subItems: [
        { name: "All Courses", path: "/courses" },
        ...(loggedIn ? [{ name: "My Course", path: "/my-course" }] : []),
      ],
    },
    { name: "About", path: "/about", icon: <FaExclamationCircle /> },
    { name: "Policy", path: "/policy", icon: <MdPolicy /> },
    { name: "FAQ", path: "/faq", icon: <FaQuestionCircle /> },
    ...(loggedIn
      ? [{ name: "Rewards", path: "/rewards", icon: <FaDollarSign /> }]
      : []),
  ];

  return (
    <div className="bg-[#5A4BA1] text-white h-screen w-64 p-6 flex flex-col">
      <nav className="mt-16 flex-grow">
        {navItems.map((item, index) => (
          <div key={index}>
            {item.isDropdown ? (
              <>
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className={`flex items-center w-full text-2xl font-bold mb-4 py-2 transition-all duration-200 ${
                    dropdownState[item.name] ? "bg-gray-100 text-[#FD8B51]" : ""
                  } hover:bg-gray-100 hover:text-[#FD8B51] hover:rounded-lg`}
                  aria-expanded={dropdownState[item.name] || false}
                >
                  <i className="mr-2">{item.icon}</i>
                  {item.name}
                  <MdKeyboardArrowDown
                    className={`ml-auto transition-transform ${
                      dropdownState[item.name] ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                {dropdownState[item.name] && (
                  <div className="pl-6">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className={`block mb-2 text-xl font-semibold py-1 transition-all duration-200 ${
                          location.pathname === subItem.path
                            ? "bg-gray-100 text-[#FD8B51] rounded-lg"
                            : "hover:bg-gray-100 hover:text-[#FD8B51] hover:rounded-lg"
                        }`}
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
                className={`flex items-center mb-4 text-2xl font-bold py-2 transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-gray-100 text-[#FD8B51] rounded-lg"
                    : "hover:bg-gray-100 hover:text-[#FD8B51] hover:rounded-lg"
                }`}
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
        <button className="bg-[#FD8B51] mt-4 py-2 px-4 rounded-lg transition-all duration-200 hover:bg-[#e67c3c]">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
