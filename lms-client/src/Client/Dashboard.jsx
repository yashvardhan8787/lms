import React, { useState, useEffect, useContext } from 'react';
import { getUserInfo, logoutUser } from '../api/auth'; // Import your API calls
import { useNavigate } from 'react-router-dom';
import UserDashboard from './Client/UserDashboard';
import { AuthContext } from '../contexts/AuthContext';

const Dashboard = () => {
  const [user, setUser] = useState(null); // User state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await getUserInfo(); // Fetch user info from API
        setUser(res.data.user); // Assuming the user data is in res.data.user
        setLoading(false);
      } catch (err) {
         setUser(JSON.parse(auth));
        setError(err.response?.data?.message || 'An error occurred');
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      await logoutUser(); // Call API to log out
      logout(); // Clear session in context
      navigate('/'); // Redirect to login page 
    } catch (err) {
      console.error(err.response?.data?.message);
      setError(err.response?.data?.message || 'Logout failed');
    }
  };

  // Loading or error display
  if (loading) return <p>Loading...</p>;
  if (!user && error) return <p className="text-red-600">{error}</p>; // Display error in red

  // Render AdminDashboard or UserDashboard based on role
  return (
    <div className="dashboard">
      {user?.role === 'admin' ? (
        <AdminDashboard user={user} onLogout={handleLogout} />
      ) : (
        <UserDashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Dashboard;
