import React, { useEffect, useState } from "react";
import axios from "axios";

const BadgeCard = ({ badgeId }) => {
  const [badge, setBadge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBadge = async () => {
      try {
        setLoading(true);
        const response = await axios.get(import.meta.env.VITE_BASE_API_URL+`badge/${badgeId}`
        );
        setBadge(response.data.badge); // Assuming response.data.badge is an object
      } catch (error) {
        console.log(error);
        setError("Failed to fetch badge information");
      } finally {
        setLoading(false);
      }
    };
    fetchBadge();
  }, [badgeId]);

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Render the badge details
  return (
    badge && (
      <div className="max-w-sm bg-white shadow-md rounded-lg p-6 flex flex-col items-center space-y-4">
        <img
          src={badge.badgeImageUrl}
          alt={badge.title}
          className="w-20 h-20 rounded-full object-cover border-4 border-indigo-500"
        />
        <h3 className="text-lg font-bold text-gray-800">{badge.title}</h3>
      </div>
    )
  );
};

export default BadgeCard;
