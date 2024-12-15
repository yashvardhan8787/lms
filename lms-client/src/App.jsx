import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/ui/Header";
import Sidebar from "./components/ui/Sidebar";
import NotFoundErrorPage from "./components/NotFoundErrorPage";
// Static Pages
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
import AdminHomePage from "./Admin/ui/AdminHomePage";
// Private Route
import PrivateRoute from "../src/components/PrivateRoute";
import MyCourses from "./Client/Courses/MyCourses";
import HomePage2 from "./Client/HomePage2";
import LoadingScreen from "./components/Loading";
import CancelPage from "./components/CancelPage";
import SuccessPage from "./components/SuccsessPage";
import NotificationPage from "./components/NotificationPage";
import UserAnalytic from "./Admin/ui/UserAnalytic";
import CourseAnalytic from "./Admin/ui/CourseAnalytic";
import OrderAnalytic from "./Admin/ui/OrderAnalytic";
import OrderPage from "./Admin/ui/OrderPage";

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Responsive Header */}
      <Header />
      <div className="flex flex-1">
        {/* Sidebar with responsive visibility */}
        <Sidebar />
        <main className="flex-1 transition-all duration-100 overflow-scroll p-4 sm:p-6 scrollbar-hide">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


function App() {
  return (
    <Routes>
      {/* Main layout routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage2 />} />
        <Route path="/:courseId/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/my-course" element={<MyCourses />} />
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

      <Route path="/adminDashboard" element={<AdminDashboard />}>
        <Route index element={<AdminHomePage />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="manage-users" element={<ManageUser />} />
        <Route path="manage-courses" element={<ManageCourses />} />
        <Route path="Orders" element={<OrderPage />} />
        <Route path="UserAnalytics" element={<UserAnalytic />} />
        <Route path="CourseAnalytics" element={<CourseAnalytic />} />
        <Route path="OrderAnalytics" element={<OrderAnalytic />} />
        <Route path="edit/:id" element={<EditCourse />} />
        <Route path="add-lecture/:id" element={<AddLecuter />} />
        <Route path="add-quiz/:courseId" element={<AddQuiz />} />
        <Route path="add-badge/:id" element={<AddBadge />} />
      </Route>

      {/* Wildcard route for 404 Not Found */}
      <Route path="*" element={<NotFoundErrorPage />} />
      <Route path="/notifications" element={<NotificationPage />} />
      <Route path="/loading" element={<LoadingScreen />} />
    </Routes>
  );
}

export default App;
