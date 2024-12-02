import { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [activationToken, setActivationToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [loading , setLoading] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem('auth');
    const savedActivationToken = localStorage.getItem('activationToken');
    const savedAccessToken = localStorage.getItem('accessToken');

    if (savedAuth) {
      setAuth(JSON.parse(savedAuth));
    }
    if (savedActivationToken) {
      setActivationToken(savedActivationToken);
    }
    if (savedAccessToken) {
      setAccessToken(savedAccessToken);
    }
  }, []);

  const login = (data, ac) => {
    setAuth(data);
    localStorage.setItem('auth', JSON.stringify(data)); // Save auth data in localStorage
    setAccessToken(ac.toString());
    localStorage.setItem('accessToken', ac.toString()); // Save access token
    toast.success("Logged in successfully");
  };

  const logout = () => {
    setAuth(null);
    setActivationToken("");
    setAccessToken("");
    localStorage.removeItem('auth');
    localStorage.removeItem('activationToken');
    localStorage.removeItem('accessToken');
    toast.success("Logged out successfully");
  };

  const setToken = (data) => {
    setActivationToken(data);
    localStorage.setItem('activationToken', data); // Persist activation token
  };
  
  
  return (
    <AuthContext.Provider value={{ auth, login, logout, setToken, activationToken, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
