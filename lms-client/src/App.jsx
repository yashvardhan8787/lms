import "./App.css";
//Auth
import RegistrationPage from "./pages/Auth/RegistrationPage";
import LoginPage from "./pages/Auth/LoginPage";
import ForgetPasswordForm from "./pages/Auth/ForgetPasswordForm";
import HomePage from "./pages/HomePage";
import EmailConfirmationForm from "./components/EmailConfirmationForm";
import ResetPasswordForm from "./pages/Auth/ResetPasswordForm";

import { Route, Routes } from "react-router-dom";
import NotFoundErrorPage from "./components/NotFoundErrorPage";
import CourseDetail from "./pages/Courses/CourseDetail";
import UserProfile from "./pages/Client/Profile/UserProfile";
import Courses from "./pages/Courses/Courses";
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
            {/*STATIC ROUTE*/}
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
              <Route
                path="courses/:courseId"
                element={
                  <div className="flex-grow overflow-hidden">
                    <CourseDetail />
                  </div>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/policy" element={<Policy />} />
              <Route path="/faq" element={<FAQ />} />
              {/*AUTH ROUTE*/}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route
                path="/confirm-email"
                element={<EmailConfirmationForm />}
              />
              <Route path="/forgot-password" element={<ForgetPasswordForm />} />
              <Route path="/reset-password" element={<ResetPasswordForm />} />
              {/*User Route*/}
              <Route path="profile" element={<UserProfile />} />
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
    </>
  );
}

export default App;
