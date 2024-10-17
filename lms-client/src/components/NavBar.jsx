import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSun } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import LoginForm from "./LoginForm";

const NavBar = () => {
  const [login, setLogin] = useState(false);
  const [loginPopUp, setLoginPopUp] = useState(false);

  console.log(loginPopUp);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">ELearning</div>
      <ul className="flex space-x-8">
        <li>
          <Link to="/" className="text-teal-400 hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/courses" className="hover:underline">
            Courses
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:underline">
            About
          </Link>
        </li>
        <li>
          <Link to="/policy" className="hover:underline">
            Policy
          </Link>
        </li>
        <li>
          <Link to="/faq" className="hover:underline">
            FAQ
          </Link>
        </li>
      </ul>
      <div className="flex space-x-6">
        {/* Heroicons: Sun and Profile */}
        <button className="focus:outline-none">
          <FiSun />
        </button>
        {login ? (
          <button className="focus:outline-none">
            <CgProfile />
          </button>
        ) : (
          <button
            className="focus:outline-none"
     //onclick function          onClick={}
          >
             <Link to="/login" className="text-teal-400 hover:underline">
           Login
          </Link>
          </button>
        )}
      </div>
      {/* Conditional rendering of the login modal and background blur */}
      {loginPopUp && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-gray-900 bg-opacity-70 z-10">
          <div className=" p-6 rounded-lg shadow-lg w-96 z-20">
            <LoginForm  />
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
