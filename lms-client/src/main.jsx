import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext.jsx";
import { CourseProvider } from "./contexts/CourseContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
         <CourseProvider>
      <App />
          </CourseProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
