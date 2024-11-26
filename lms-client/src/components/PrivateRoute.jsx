import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { getUserInfo } from "../api/auth";

const PrivateRoute = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For handling errors
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!auth) {
        setLoading(false); // Stop loading if there's no auth context
        setError("You must be logged in to access this page.");
        return;
      }

      try {
        const res = await getUserInfo();
        setUserData(res?.data?.user);
      } catch (err) {
        setError("Failed to load user data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, [auth]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return userData?.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
