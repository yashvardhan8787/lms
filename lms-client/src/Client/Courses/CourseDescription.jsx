import { AuthContext } from "../../contexts/AuthContext";
import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from 'react-router-dom';

// Load Stripe with your publishable key
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

const CourseDescription = ({ course }) => {
  const [isBought, SetIsBought] = useState(false);
  const { auth } = useContext(AuthContext);
  const userBoughtCourses = JSON.parse(auth).courses;

  useEffect(() => {
    userBoughtCourses.map((c) => {
      if (c._id == course._id) {
        SetIsBought("true");
      }
    });
  }, [course, auth]);

  const handleCheckout = async () => {
    // Prepare the request body
    const courses = [
      {
        id: course._id,
        name: course.name,
        price: parseInt(course.price) * 100, // Price in INR
        imgUrl: course.thumbnailUrl, // URL of the course image
      },
    ];

    try {
      // Call the Payment API
      const response = await fetch(
        import.meta.env.VITE_BASE_API_URL+"make-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courses }), // Send the courses array
        }
      );

      const data = await response.json();

      if (data.id) {
        // Redirect to Stripe Checkout using session ID
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.id,
        });

        if (error) {
          console.error("Error redirecting to checkout:", error);
        }
      } else {
        console.error("Failed to create payment session");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-2">Description</h2>
      <p className="text-gray-700 text-xl mb-4">{course.description}</p>
      <div className="flex items-center text-xl space-x-4">
        <p className="text-purple-600 font-semibold text-3xl">
          ${course.price}
        </p>
        {!isBought ? (
          <button
            className="bg-orange-400  rounded-2xl w-32 p-2 text-white text-xl hover:bg-orange-600 font-bold"
            onClick={handleCheckout}
          >
            Buy Now
          </button>
        ) : (
          <Link
          to={course.lectures[0]?`/course/${course?._id}/lecture/${course?.lectures[0]?._id}`:""}
          className="text-purple-600"
        >
          <button className="bg-green-400  rounded-2xl w-auto p-2 text-white text-xl hover:bg-orange-600 font-bold"> 
            continue course
          </button>
            </Link>
        )}
      </div>
      <div className="flex flex-col gap-5 mt-5 justify-center">
        <p className="text-gray-500">
          <span className="font-bold text-xl ">Level:</span> {course.level}
        </p>
        <p className="text-gray-500">
          <span className="font-bold text-xl">Purchased:</span>{" "}
          {course.purchased}
        </p>
      </div>
    </div>
  );
};

export default CourseDescription;
