import React from 'react';

const Leaderboard = ({ user }) => {
  // Mock rank calculation (for example purposes)
  const rank = user.streaks > 5 ? 'Top 10%' : 'Top 50%';

  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <h3 className="text-xl font-bold">Your Rank</h3>
      <p className="text-lg text-gray-700">Based on your activity</p>
      <span className="text-2xl font-semibold text-green-500">{rank}</span>
    </div>
  );
};

export default Leaderboard;
