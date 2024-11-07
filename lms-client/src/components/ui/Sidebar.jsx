import { Link } from "react-router-dom";
import { FaHome,FaBookOpen,FaQuestionCircle,FaExclamationCircle } from "react-icons/fa";
import { MdPolicy } from "react-icons/md";


// Sidebar.js
const Sidebar = () => {
  const navItems = [
    { name: "Home", path: "/",icons:<FaHome/> },
    { name: "Courses", path: "/courses",icons:<FaBookOpen/> },
    { name: "About", path: "/about",icons:<FaExclamationCircle/> },
    { name: "Policy", path: "/policy",icons:<MdPolicy/> },
    { name: "FAQ", path: "/faq",icons:<FaQuestionCircle/> },
  ];

  return (

      <div className="bg-purple-700 text-white h-screen w-64 p-6  flex flex-col">
        <nav className="mt-16 flex-grow">
          {navItems.map((item, index) => (
            
            <Link
              key={index}
              to={item.path}
              className="flex items-center mb-4 text-2xl font-bold hover:bg-gray-100 hover:text-orange-500 hover:rounded-lg hover:px-4 hover:pr-80 py-2 transition-all duration-200"
            >
              {/* If you want to add an icon, place it here */}
               <i className="icon-home mr-2">{item.icons}</i> 
              {item.name}
            </Link>
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
