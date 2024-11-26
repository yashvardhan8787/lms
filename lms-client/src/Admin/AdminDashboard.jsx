import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./ui/Header";
import Sidebar from "./ui/Sidebar";

const AdminDashboard = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <Header />
        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar />
          {/* Main content area where nested routes will render */}
          <main className="flex-1 bg-white shadow-lg rounded-lg p-6 transition-all duration-300 ease-in-out overflow-scroll">
            <Outlet /> {/* This renders the component for each route */}
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
