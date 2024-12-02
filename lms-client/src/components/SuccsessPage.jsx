import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SuccessPage = () => {
  const { courseId } = useParams(); // Extract courseId from URL params
  const [searchParams] = useSearchParams(); // Extract session_id from query params
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createOrder = async (courseId, sessionId) => {
    setLoading(true);
    const reqBody = {
      courseId, // Use dynamic courseId from URL params
      sessionId, // Use dynamic sessionId from query params
    };

    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_API_URL+"create-order",
        reqBody,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setPaymentDetails(response?.data);
      setLoading(false);
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const sessionId = searchParams.get("session_id"); // Extract session_id from query params
    if (courseId && sessionId) {
      createOrder(courseId, sessionId); // Pass both courseId and sessionId to the API
    } else {
      setError("Invalid URL parameters. Please try again.");
    }
  }, [courseId, searchParams]);

  const handleRedirect = () => {
    navigate("/"); // Redirect to homepage
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {loading ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4"></div>
          <h1 className="text-xl font-semibold text-gray-700">
            Loading payment details...
          </h1>
        </div>
      ) : paymentDetails ? (
        <div className="bg-white shadow-lg rounded-lg p-8 width-auto text-center">
          <div className="flex justify-center items-center mb-6">
            <div className="text-green-500 bg-green-100 p-4 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-label="Success Icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-2">
            Thank you,{" "}
            <span className="font-semibold">
              {paymentDetails.customer_details.email}
            </span>
            , for your purchase.
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Session ID:</span>{" "}
            {paymentDetails.id}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Amount Paid:</span> ₹
            {paymentDetails.amount_total}
          </p>
          <button
            onClick={handleRedirect}
            className="inline-block mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-semibold text-gray-700">{error}</h1>
          <button
            onClick={handleRedirect}
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default SuccessPage;
