import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext.jsx";
import { CourseProvider } from "./contexts/CourseContext.jsx";
import { Toaster } from "react-hot-toast";
import { AdminProvider } from "./contexts/AdminContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
         <CourseProvider>
           <AdminProvider>
          <Toaster position='top-center'/>
      <App />
           </AdminProvider>
          </CourseProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
