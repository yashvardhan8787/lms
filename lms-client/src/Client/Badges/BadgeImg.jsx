import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BadgeImg = ({ badgeId }) => {
  const [badge, setBadge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBadge = async () => {
      try {
        setLoading(true);
        const response = await axios.get(import.meta.env.VITE_BASE_API_URL+`badge/${badgeId}`);
        setBadge(response.data.badge);
      } catch (error) {
        console.log(error);
        setError('Failed to fetch badge information');
      } finally {
        setLoading(false);
      }
    };
    fetchBadge();
  }, [badgeId]);

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
   
      badge && (
        <>
          <img
            src={badge.badgeImageUrl}
            alt={badge.title}
            className="w-full h-5 object-cover rounded-lg"
          />
        </>
      )
  );
};

export default BadgeImg;
