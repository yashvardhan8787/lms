import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import Login from "./components/Login";
import Registration from "./components/Registration";
import EmailForm from "./components/EmailForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />
      <HomePage />
      <EmailForm/>
    </>
  );
}

export default App;
