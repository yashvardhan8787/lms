import React, { useState, useEffect } from "react";
import AnalyticsChart from "./AnalyticsChart";
import { FiLoader } from "react-icons/fi";
import axios from "axios";

const UserAnalytic = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch Analytics Data
    const fetchAnalyticsData = async () => {
       try {
         const response = await axios.get("http://localhost:8080/api/v1/usersAnalytics"); // Replace with your API URL
         if (response.data.success) {
           setAnalytics(response.data.users);
         } else {
           throw new Error("Failed to fetch analytics data");
         }
       } catch (err) {
         setError(err.message || "Something went wrong");
       } finally {
         setLoading(false);
       }
     };
   
     useEffect(() => {
       fetchAnalyticsData();
     }, []);
   
     if (error) {
       return (
         <div className="text-center text-red-500">
           <p>Error: {error}</p>
         </div>
       );
     }
  
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[200px]">
          <FiLoader className="animate-spin text-gray-500 text-3xl" />
        </div>
      );
    }
  
    return (
      <div>
        <AnalyticsChart analytics={analytics} text={"Last 12 months' data for Users"} />
      </div>
    );
  };
 
export default UserAnalytic
