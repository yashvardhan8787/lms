import { Link } from "react-router-dom";
import { 
  FaHome, 
  FaUserCog, 
  FaChalkboardTeacher, 
  FaShoppingCart, 
  FaChartBar, 
  FaMoneyCheckAlt, 
  FaUsers 
} from "react-icons/fa";

// Sidebar.js
const Sidebar = () => {
  const navItems = [
    { name: "Home", path: "/adminDashboard", icon: <FaHome /> },
    { name: "Manage Users", path: "/adminDashboard/manage-users", icon: <FaUserCog /> },
    { name: "Manage Courses", path: "/adminDashboard/manage-courses", icon: <FaChalkboardTeacher /> },
    { name: "Orders", path: "/adminDashboard/Orders", icon: <FaShoppingCart /> },
    { name: "Course Analytics", path: "/adminDashboard/CourseAnalytics", icon: <FaChartBar /> },
    { name: "Order Analytics", path: "/adminDashboard/OrderAnalytics", icon: <FaMoneyCheckAlt /> },
    { name: "User Analytics", path: "/adminDashboard/UserAnalytics", icon: <FaUsers /> },
  ];

  return (
    <div className="bg-gradient-to-r from-[#5A4BA1] to-[#704cb2] text-white h-screen w-64 p-6 pb-0 flex flex-col shadow-lg">
      <nav className="mt-16 flex-grow">
        {navItems.map((item, index) => ( 
          <Link
            key={index}
            to={item.path}
            className="flex items-center mb-4 text-lg font-medium hover:bg-gray-100 hover:text-[#FD8B51] hover:rounded-lg hover:px-4 py-2 transition-all duration-300 ease-in-out"
          >
            <i className="mr-3">{item.icon}</i>
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="mt-auto pt-8 text-center">
        <p className="font-medium">Support 24/7</p>
        <button className="bg-[#FD8B51] mt-4 py-2 px-4 rounded-lg text-white hover:bg-[#e67c3c] transition-all duration-300 ease-in-out">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
