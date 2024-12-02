import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Badges = ({ badgeId }) => {
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
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg p-5 mt-5">
      {badge && (
        <>
          <img
            src={badge.badgeImageUrl}
            alt={badge.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{badge.title}</h2>
          <p className="text-gray-600 text-sm mb-4">{badge.description}</p>
          <div className="flex items-center justify-between mt-4">
            <p className="text-gray-700 font-medium">
              Course: <span className="text-blue-500">{badge.courseName}</span>
            </p>
            <p className="text-gray-700 font-medium">
              Badge Name: <span className="text-blue-500">{badge.name}</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Badges;
