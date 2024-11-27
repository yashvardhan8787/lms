import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AnalyticsChart = ({ analytics, text }) => {
  if (!analytics) {
    return <p className="text-center text-gray-500">No analytics data available.</p>;
  }

  const chartData = {
    labels: analytics.last12Months.map((data) => data.month),
    datasets: [
      {
        label: "Orders",
        data: analytics.last12Months.map((data) => data.count),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: text,
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Analytics</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default AnalyticsChart;
