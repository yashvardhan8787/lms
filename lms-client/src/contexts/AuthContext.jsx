import { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [activationToken , setActivationToken] = useState("")
  const [accessToken , setAccessToken] = useState("")

  useEffect(() => {
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      setAuth(JSON.parse(savedAuth));
    }
  }, []);

  const login = (data,accessToken) => {
    setAuth(data);
    localStorage.setItem('auth', JSON.stringify(data)); // Save token in localStorage
    setAccessToken(accessToken)
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('auth');
  };

  const setToken = (data)=>{
    setActivationToken(data);

  }

  return (
    <AuthContext.Provider value={{ auth, login, logout , setToken , activationToken , accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
