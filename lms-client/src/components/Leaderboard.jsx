import React from 'react';
import PropTypes from 'prop-types';

const Leaderboard = ({ user }) => {
  // Default rank calculation
  const calculateRank = (streaks) => {
    if (streaks > 20) return "Top 5%";
    if (streaks > 10) return "Top 10%";
    if (streaks > 5) return "Top 25%";
    return "Top 50%";
  };

  if (!user || typeof user.streaks !== 'number') {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center text-red-500">
        <p>Error: Invalid user data</p>
      </div>
    );
  }

  const rank = calculateRank(user.streaks);

  return (
    <div
      className="bg-white shadow-md rounded-lg p-6 text-center transition-transform transform hover:scale-105"
      role="region"
      aria-label="Leaderboard Rank"
    >
      <h3 className="text-xl font-bold text-gray-900">Your Rank</h3>
      <p className="text-lg text-gray-700 mb-2">Based on your activity</p>
      <span
        className="text-2xl font-semibold text-green-500"
        aria-live="polite"
      >
        {rank}
      </span>
      <p className="text-sm text-gray-500 mt-4">
        Current streaks: {user.streaks} days
      </p>
    </div>
  );
};

// Default props
Leaderboard.defaultProps = {
  user: { streaks: 0 },
};

// Prop type validation
Leaderboard.propTypes = {
  user: PropTypes.shape({
    streaks: PropTypes.number.isRequired,
  }).isRequired,
};

export default Leaderboard;
