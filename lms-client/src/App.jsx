import "./App.css";
import HomePage from "./pages/HomePage";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import EmailConfirmationForm from "./components/EmailConfirmationForm";
import ForgetPasswordForm from "./components/ForgetPasswordForm";
import ResetPasswordForm from "./components/ResetPasswordForm";
import Dashboard from "./pages/dashboard";
import { Route  ,Routes } from "react-router-dom";
import NotFoundErrorPage from "./components/NotFoundErrorPage";
import UserDashboard from "./pages/userDashboard/UserDashboard";

function App() {
  
  return (

    
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/Register" element={<RegistrationForm/>} />
        <Route path="/confirm-email" element={<EmailConfirmationForm/>} />
        <Route path="/forgot-password" element={<ForgetPasswordForm/>} />
        <Route path="/reset-password" element={<ResetPasswordForm/>} />

        
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/*" element={<UserDashboard  />} />


        <Route path="*" element={<NotFoundErrorPage />} />  {/* Wildcard route for 404 */}
      </Routes>
    </>
  );
}

export default App;
