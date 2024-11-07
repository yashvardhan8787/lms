import React from 'react';

const AdminDashboard = ({ user, onLogout }) => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.name} (Admin)</p>
      <button onClick={onLogout}>Logout</button>
      {/* Add admin-specific controls here */}
      <button onClick={() => window.location.href = '/admin/manage-users'}>
        Manage Users
      </button>
      <button onClick={() => window.location.href = '/admin/manage-courses'}>
        Manage Courses
      </button>
    </div>
  );
};

export default AdminDashboard;
