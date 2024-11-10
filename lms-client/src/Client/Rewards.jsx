import React from "react";
import toast from "react-hot-toast";

const Rewards = () => {
  const rewards = [
    { id: 1, rewardName: "10% Amazon Coupon", pointsRequired: 10 },
    { id: 2, rewardName: "30% Amazon Coupon", pointsRequired: 25 },
    { id: 3, rewardName: "Swags", pointsRequired: 25 },
    // Add more rewards as needed
  ];

  const succes =()=>{
    toast.success("Hiiiiiiiiiiiiii")
  }
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl  text-black font-bold mb-12 text-center">
          Redeem Badges
        </h1>

        <div className="bg-white shadow-xl rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            Available Rewards
          </h2>
          <ul>
            {rewards.map((reward) => (
              <li
                key={reward.id}
                className="border-b border-gray-200 py-4 flex justify-between items-center"
              >
                <div className="text-2xl font-semibold text-gray-800">{reward.rewardName}</div>
                <div className="flex items-center space-x-4">
                  <span className="text-purple-800 text-xl font-bold">
                    {reward.pointsRequired} Points
                  </span>
                  <button className="bg-orange-400 text-white font-semibold text-lg px-4 py-2 rounded-lg hover:bg-orange-600" onClick={succes}>
                    Redeem
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Rewards;