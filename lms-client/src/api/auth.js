// api.js
import axios from 'axios';

// Set base URL for all API requests
const API = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // Updated base URL to match backend endpoint
  withCredentials: true, // to include cookies for authentication
});

// Registration
export const registerUser = async (userData) => {
  return await API.post('/registration', userData);
};

//Activate user 
export const activateUser = async (userData) => {
    return await API.post('/activate-user', userData);
  };
  
// Login
export const loginUser = async (userData) => {
  return await API.post('/login', userData); // Ensure this points to `/login` endpoint
};

// Forget Password
export const forgetPassword = async (email) => {
  return await API.post('/forgot-password', { email });
};

// Reset Password
export const resetPassword = async (token, password) => {
  return await API.put(`/reset-password`, {
    "resetToken":token,
    "newPassword":password
  });
};

// Get User Info
export const getUserInfo = async () => {
  return await API.get('/me');
};

// Logout
export const logoutUser = async () => {
  return await API.get('/logout');
};

// Other API calls as needed...
