import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const OrderComponent = ({ courseId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");

  // Fetch course details and create payment intent when component mounts
  React.useEffect(() => {
    const fetchCourseAndPayment = async () => {
      try {
        // Fetch course details
        const courseResponse = await axios.get(`http://localhost:8080/api/v1/${courseId}`);
        setCourse(courseResponse.data);

        // Create payment intent
        const paymentResponse = await axios.post("http://localhost:8080/api/v1/payment", {
          amount: courseResponse.data.price * 100, // amount in cents
        });
        setClientSecret(paymentResponse.data.client_secret);
      } catch (err) {
        setError("Error fetching data for the order.");
        console.error(err);
      }
    };

    fetchCourseAndPayment();
  }, [courseId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (error || paymentIntent.status !== "succeeded") {
        setError("Payment failed. Please try again.");
        return;
      }

      // Create order after successful payment
      const orderResponse = await axios.post("/create-order", {
        courseId,
        payment_info: { id: paymentIntent.id },
      });

      if (orderResponse.data.success) {
        alert("Course purchased successfully!");
      } else {
        setError("Error finalizing the order. Please contact support.");
      }
    } catch (err) {
      setError("An error occurred during the payment process.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <h2 className="text-2xl font-semibold mb-6">{course?.name || "Loading Course..."}</h2>
      <p className="text-lg font-medium mb-4">${course?.price}</p>
      <form onSubmit={handleSubmit}>
        <CardElement className="p-4 border rounded-md mb-6" />
        <button
          type="submit"
          className={`w-full py-3 rounded-md text-white ${loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"}`}
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : `Buy ${course?.name}`}
        </button>
      </form>
    </div>
  );
};

export default OrderComponent;
