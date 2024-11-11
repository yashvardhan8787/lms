import "./App.css";
import { Outlet } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
//ui
import Header from "./components/ui/Header";
import Sidebar from "./components/ui/SideBar";
import NotFoundErrorPage from "./components/NotFoundErrorPage";
//Static
import HomePage from "./Client/HomePage";
import About from "./Client/About";
import FAQ from "./Client/FAQ";
import Policy from "./Client/Policy";
import Rewards from "./Client/Rewards"
// Auth 
import RegistrationPage from "./Client/Auth/RegistrationPage";
import LoginPage from "./Client/Auth/LoginPage";
import ForgetPasswordForm from "./Client/Auth/ForgetPasswordForm";
import ResetPasswordForm from "./Client/Auth/ResetPasswordForm";
import EmailConfirmationForm from "./components/EmailConfirmationForm";
//user
import UserProfile from "./Client/Profile/UserProfile";
import CourseDetail from "./Client/Courses/CourseDetail";
import Courses from "./Client/Courses/Courses";
import LecturePage from "./Client/lectures/LecturePage";
//Admin 
import AdminDashboard from "./Admin/AdminDashboard";
import ManageUser from "./Admin/ManageUser";
import ManageCourses from "./Admin/Courses/ManageCourses";
import EditCourse from "./Admin/Courses/EditCourse";
import AddLecuter from "./Admin/Courses/AddLecuter";
import AddQuiz from "./Admin/Courses/AddQuiz";
import AddBadge from "./Admin/Courses/AddBadge";

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />
        {/* Main content area where nested routes will render */}
        <main className="flex-1 transition-all duration-100">
          <Outlet /> {/* This renders the component for each route */}
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
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<Courses />} />
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
        <Route path="/rewards" element={<Rewards/>} />
        <Route
          path="/course/:courseId/lecture/:lectureId"
          element={<LecturePage />}
        />
      </Route>

      {/* Admin Dashboard route (separate layout) */}
      <Route path="/adminDashboard" element={<AdminDashboard />}>
          <Route path="profile" element={<UserProfile />} />
          <Route path="manage-users" element={<ManageUser />} />
          <Route path="manage-courses" element={<ManageCourses />} />
          <Route path="edit/:id" element={<EditCourse />} />
          <Route path="add-lecture/:id" element={<AddLecuter />} />
          <Route path="add-quiz/:courseId" element={<AddQuiz />} />
          <Route path="add-badge/:id" element={<AddBadge />} />
      </Route>
      {/* Wildcard route for 404 Not Found (separate from MainLayout) */}
      <Route path="*" element={<NotFoundErrorPage />} />
    </Routes>
  );
}

export default App;
