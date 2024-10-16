import "./App.css";
import HomePage from "./pages/HomePage";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import EmailConfirmationForm from "./components/EmailConfirmationForm";
import ForgetPasswordForm from "./components/ForgetPasswordForm";
import ResetPasswordForm from "./components/ResetPasswordForm";
import Dashboard from "./pages/dashboard";
import { Route, Routes } from "react-router-dom";
import NotFoundErrorPage from "./components/NotFoundErrorPage";
import UserDashboard from "./pages/userDashboard/UserDashboard";
import AllCourses from "./pages/userDashboard/AllCourses";
import CourseDetail from "./pages/userDashboard/CourseDetail";
import Home from "./pages/userDashboard/Home";
import MyCourses from "./pages/userDashboard/MyCourses";
import UserProfile from "./components/UserProfile";
import NotificationPage from "./components/NotificationPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Policy from "./pages/Policy";
import FAQ from "./pages/Faq";

function App() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-10">
        <NavBar />
      </header>
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/confirm-email" element={<EmailConfirmationForm />} />
          <Route path="/forgot-password" element={<ForgetPasswordForm />} />
          <Route path="/reset-password" element={<ResetPasswordForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Nested routes under UserDashboard */}
          <Route path="/userdasboard" element={<UserDashboard />}>
            <Route path="home" element={<Home />} />
            <Route path="all-courses" element={<AllCourses />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="notification" element={<NotificationPage />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path=":courseId" element={<CourseDetail />} />
          </Route>
          <Route path="*" element={<NotFoundErrorPage />} />{" "}
          {/* Wildcard route for 404 */}
        </Routes>
      </main>
      <Footer className="fixed bottom-0 left-0 right-0" />
    </>
  );
}

export default App;
