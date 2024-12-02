// api.js
import axios from 'axios';

// Set base URL for all API requests
const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL, // Updated base URL to match backend endpoint
  withCredentials: true, // to include cookies for authentication
});

// Registration
export const registerUser = async (userData) => {
  return await API.post(import.meta.env.VITE_BASE_API_URL+'registration', userData);
};

//Activate user 
export const activateUser = async (userData) => {
    return await API.post(import.meta.env.VITE_BASE_API_URL+'activate-user', userData);
  };
  
// Login
export const loginUser = async (userData) => {
  return await API.post(import.meta.env.VITE_BASE_API_URL+'login', userData); // Ensure this points to `/login` endpoint
};

// Forget Password
export const forgetPassword = async (email) => {
  return await API.post(import.meta.env.VITE_BASE_API_URL+'forgot-password', { email });
};

// Reset Password
export const resetPassword = async (token, password) => {
  return await API.put(import.meta.env.VITE_BASE_API_URL+`reset-password`, {
    "resetToken":token,
    "newPassword":password
  });
};

// Get User Info
export const getUserInfo = async () => {
  return await API.get(import.meta.env.VITE_BASE_API_URL+'me');
};

// Logout
export const logoutUser = async () => {
  return await API.get(import.meta.env.VITE_BASE_API_URL+'logout');
};

// Other API calls as needed...
