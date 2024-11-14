import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import  { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
// UI Components
import Header from "./components/ui/Header";
import Sidebar from "./components/ui/SideBar";
import NotFoundErrorPage from "./components/NotFoundErrorPage";

// Static Pages
import HomePage from "./Client/HomePage";
import About from "./Client/About";
import FAQ from "./Client/FAQ";
import Policy from "./Client/Policy";
import Rewards from "./Client/Rewards";

// Auth Pages
import RegistrationPage from "./Client/Auth/RegistrationPage";
import LoginPage from "./Client/Auth/LoginPage";
import ForgetPasswordForm from "./Client/Auth/ForgetPasswordForm";
import ResetPasswordForm from "./Client/Auth/ResetPasswordForm";
import EmailConfirmationForm from "./components/EmailConfirmationForm";

// User Pages
import UserProfile from "./Client/Profile/UserProfile";
import CourseDetail from "./Client/Courses/CourseDetail";
import Courses from "./Client/Courses/Courses";
import LecturePage from "./Client/lectures/LecturePage";

// Admin Pages
import AdminDashboard from "./Admin/AdminDashboard";
import ManageUser from "./Admin/ManageUser";
import ManageCourses from "./Admin/Courses/ManageCourses";
import EditCourse from "./Admin/Courses/EditCourse";
import AddLecuter from "./Admin/Courses/AddLecuter";
import AddQuiz from "./Admin/Courses/AddQuiz";
import AddBadge from "./Admin/Courses/AddBadge";

// Private Route
import PrivateRoute from "../src/components/PrivateRoute";
import MyCourses from "./Client/Courses/MyCourses";

import OrderComponent from "./components/OrderComponent";
import ChatBot from "./ChatBot/ChatBot";
import HomePage2 from "./Client/HomePage2";

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 transition-all duration-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function App() {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    // Fetch the Stripe publishable key from your backend
    const fetchStripeKey = async () => {
      try {
        const response = await axios.get("/payment/stripepublishablekey");
        const stripeKey = response.data.publishablekey;
        setStripePromise(loadStripe(stripeKey));
      } catch (error) {
        console.error("Failed to fetch Stripe publishable key:", error);
      }
    };

    fetchStripeKey();
  }, []);

  if (!stripePromise) {
    return <p>Loading payment integration...</p>;
  }
  return (
    <Elements stripe={stripePromise}>

    {/* <OrderComponent courseId="YOUR_COURSE_ID_HERE" /> */}
    <Routes>
      {/* Main layout routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage2 />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/my-course" element={<MyCourses/>} /> 
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/confirm-email" element={<EmailConfirmationForm />} />
        <Route path="/forgot-password" element={<ForgetPasswordForm />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route
          path="/course/:courseId/lecture/:lectureId"
          element={<LecturePage />}
        />
        
      </Route>

      {/* Admin Dashboard route with PrivateRoute protection */}
      <Route element={<PrivateRoute />}>
        <Route path="/adminDashboard" element={<AdminDashboard />}>
          <Route path="profile" element={<UserProfile />} />
          <Route path="manage-users" element={<ManageUser />} />
          <Route path="manage-courses" element={<ManageCourses />} />
          <Route path="edit/:id" element={<EditCourse />} />
          <Route path="add-lecture/:id" element={<AddLecuter />} />
          <Route path="add-quiz/:courseId" element={<AddQuiz />} />
          <Route path="add-badge/:id" element={<AddBadge />} />
        </Route>
      </Route>

      {/* Wildcard route for 404 Not Found */}
      <Route path="*" element={<NotFoundErrorPage />} />
    </Routes>
    </Elements>
  );
}

export default App;


