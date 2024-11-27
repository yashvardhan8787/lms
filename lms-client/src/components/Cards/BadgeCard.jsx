import React from 'react';

const BadgeCard = ({ badgeImageUrl, title, description }) => {
  return (
    <div className="max-w-sm bg-white shadow-md rounded-lg p-6 flex flex-col items-center space-y-4">
      <img
        src={badgeImageUrl}
        alt={title}
        className="w-20 h-20 rounded-full object-cover border-4 border-indigo-500"
      />
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default BadgeCard;
