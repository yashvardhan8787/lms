import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [activationToken , setActivationToken] = useState("")

  useEffect(() => {
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      setAuth(JSON.parse(savedAuth));
    }
  }, []);

  const login = (data) => {
    setAuth(data);
    localStorage.setItem('auth', JSON.stringify(data)); // Save token in localStorage
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('auth');
  };

  const setToken = (data)=>{
    setActivationToken(data);
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout , setToken , activationToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
