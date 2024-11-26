import React from 'react';
import PropTypes from 'prop-types';

const Leaderboard = ({ user }) => {
  // Fallback for user or streaks if not available
  if (!user || typeof user.streaks !== 'number') {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center text-red-500">
        <p>Error: Invalid user data</p>
      </div>
    );
  }

  // Mock rank calculation (for example purposes)
  const rank = user.streaks > 5 ? 'Top 10%' : 'Top 50%';

  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center transition-transform transform hover:scale-105">
      <h3 className="text-xl font-bold">Your Rank</h3>
      <p className="text-lg text-gray-700">Based on your activity</p>
      <span className="text-2xl font-semibold text-green-500">{rank}</span>
    </div>
  );
};

// Prop type validation
Leaderboard.propTypes = {
  user: PropTypes.shape({
    streaks: PropTypes.number.isRequired,
  }).isRequired,
};

export default Leaderboard;
