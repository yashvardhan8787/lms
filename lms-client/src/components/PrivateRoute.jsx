import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { getUserInfo } from "../api/auth";

const PrivateRoute = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await getUserInfo();
        setUserData(res?.data?.user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  if (loading) return <div>Loading...</div>;

  return userData?.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
