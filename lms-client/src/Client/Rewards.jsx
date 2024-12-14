import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const Rewards = () => {
  const { auth } = useContext(AuthContext);
  const [userPoints, setUserPoints] = useState(50); // Example user points
  const [loading, setLoading] = useState(false); // To manage API call loading state
  const userid = JSON.parse(auth)?._id;
  const rewards = [
    { id: 1, rewardName: "10% Amazon Coupon", pointsRequired: 20 },
    { id: 2, rewardName: "30% Amazon Coupon", pointsRequired: 25 },
    { id: 3, rewardName: "Swags", pointsRequired: 30 },
    // Add more rewards as needed
  ];

  const handleRedeem = async (reward) => {
    if (userPoints < reward.pointsRequired) {
      toast.error(`Not enough points to redeem "${reward.rewardName}".`);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_API_URL + "/redeem-rewards",
        {
          userId: userid, // Replace with dynamic user ID
        },
        { withCredentials: true } // Include credentials if needed
      );

      // Assuming the API deducts points and sends the reward details
      toast.success(`Successfully redeemed "${reward.rewardName}"!`);
      setUserPoints((prevPoints) => prevPoints - reward.pointsRequired);
      console.log("Reward Response:", response.data);
    } catch (error) {
      console.error("Error redeeming reward:", error);
      toast.error(
        error.response?.data?.message || "Failed to redeem reward. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-black font-bold mb-12 text-center">
          Redeem Rewards
        </h1>

        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-gray-700">
            Available Rewards
          </h2>
          <ul>
            {rewards.map((reward) => (
              <li
                key={reward.id}
                className="border-b border-gray-200 py-4 flex flex-col sm:flex-row justify-between items-center"
              >
                <div className="text-lg sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">
                  {reward.rewardName}
                </div>
                <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 w-full sm:w-auto">
                  <span className="text-purple-800 text-lg sm:text-xl font-bold mb-2 sm:mb-0">
                    {reward.pointsRequired} Points
                  </span>
                  <button
                    className={`${
                      userPoints >= reward.pointsRequired && !loading
                        ? "bg-orange-400 hover:bg-orange-600"
                        : "bg-gray-400 cursor-not-allowed"
                    } text-white font-semibold text-base sm:text-lg px-4 py-2 rounded-lg`}
                    onClick={() => handleRedeem(reward)}
                    disabled={userPoints < reward.pointsRequired || loading}
                  >
                    {loading ? "Loading..." : "Redeem"}
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
