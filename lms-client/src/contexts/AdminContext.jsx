import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchUsers();
    fetchNotifications();
  }, []);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BASE_API_URL+"get-users", {
        withCredentials: true,
      });
      setUsers(response.data.users);
    } catch (err) {
      setError("Failed to fetch users");
    }
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BASE_API_URL+"getNotification");
      if (response.data.success) {
        setNotifications(response.data.notifications);
        const unread = response.data.notifications.filter(
          (notification) => notification.status === "unread"
        ).length;
        setUnreadCount(unread);
      }
    } catch (error) {
      setError("Failed to fetch notifications");
    }
  };

  // Update notification status
  const markAsRead = async (id) => {
    try {
      const response = await axios.put(import.meta.env.VITE_BASE_API_URL+`updateNotification/${id}`);
      if (response.data.success) {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification._id === id
              ? { ...notification, status: "read" }
              : notification
          )
        );
        setUnreadCount((prevCount) => prevCount - 1);
      }
    } catch (error) {
      setError("Failed to update notification status");
    }
  };


  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(import.meta.env.VITE_BASE_API_URL+`delete-user/${userId}`, {
        withCredentials: true,
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  // Handle role update
  const handleUpdateRole = async (email, userId, newRole) => {
    try {
      await axios.put(
        import.meta.env.VITE_BASE_API_URL+`update-user`,
        { email, role: newRole },
        { withCredentials: true }
      );
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      setError("Failed to update role");
    }
  };

  return (
    <AdminContext.Provider
      value={{
        users,
        notifications,
        loading,
        unreadCount,
        error,
        fetchUsers,
        fetchNotifications,
        markAsRead,
        handleDeleteUser,
        handleUpdateRole,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
