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
import FAQ from "./pages/FAQ";
import CloudinaryUploadForm from "../src/components/CloudinaryUploadForm";
import LecturePage from "./components/LecturePage";
import Sidebar from "./components/ui/SideBar";
import Header from "./components/ui/Header";

function App() {
  return (
    // <CloudinaryUploadForm></CloudinaryUploadForm>
    <>
<div className="min-h-screen bg-gray-50 flex flex-col">
        {/* header */}
        <Header />
        <div className="flex flex-1 ">
          {/*sidebar*/}
          <Sidebar />
          <main className="flex-1  transition-all duration-100">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/courses"
                element={
                  <div className="flex-grow overflow-hidden">
                    <Courses />
                  </div>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/policy" element={<Policy />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route
                path="/confirm-email"
                element={<EmailConfirmationForm />}
              />
              <Route path="/forgot-password" element={<ForgetPasswordForm />} />
              <Route path="/reset-password" element={<ResetPasswordForm />} />
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="home" element={<Home />} />
                <Route path="all-courses" element={<AllCourses />} />
                <Route path="my-courses" element={<MyCourses />} />
                <Route path="profile" element={<UserProfile />} />
              </Route>
              <Route path="courses/:courseId" element={<CourseDetail />} />
              <Route
                path="/course/:courseId/lecture/:lectureId"
                element={<LecturePage />}
              />
              {/* Nested routes under UserDashboard */}
              <Route path="*" element={<NotFoundErrorPage />} />{" "}
              {/* Wildcard route for 404 */}
            </Routes>
          </main>
        </div>
      </div>
      {/* <div className="flex bg-purple-700">
        <div className="p-5">
          <Sidebar />
        </div>

        <main className="flex-grow p-5 ">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/courses"
              element={
                <div className="flex-grow overflow-hidden">
                  <Courses />
                </div>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/confirm-email" element={<EmailConfirmationForm />} />
            <Route path="/forgot-password" element={<ForgetPasswordForm />} />
            <Route path="/reset-password" element={<ResetPasswordForm />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="home" element={<Home />} />
              <Route path="all-courses" element={<AllCourses />} />
              <Route path="my-courses" element={<MyCourses />} />
              <Route path="profile" element={<UserProfile />} />
            </Route>
            <Route path="courses/:courseId" element={<CourseDetail />} />
            <Route
              path="/course/:courseId/lecture/:lectureId"
              element={<LecturePage />}
            />
            Nested routes under UserDashboard *
            <Route path="*" element={<NotFoundErrorPage />} />{" "}
           Wildcard route for 404 *
          </Routes>
        </main>
      </div> */}
    </>
  );
}

export default App;
