import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaBell,
  FaUserCircle,
  FaHome,
  FaBook,
  FaSignOutAlt,
} from "react-icons/fa"; // Importing icons from react-icons
import Header from "./ui/Header";
import Sidebar from "./ui/Sidebar";

const AdminDashboard = ({ user, onLogout }) => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <Header />
        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar />
          {/* Main content area where nested routes will render */}
          <main className="flex-1 transition-all duration-100">
            <Outlet /> {/* This renders the component for each route */}
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
