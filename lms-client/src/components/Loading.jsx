import React from "react";
import { FaRunning } from "react-icons/fa";

const LoadingScreen = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#f0f0f0", // Purple background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "#FFFFFF", // White text
        fontFamily: "'Press Start 2P', monospace", // Retro pixel font
      }}
    >
      <p style={{ fontSize: "16px", marginBottom: "20px",color:"purple" }}>NOW LOADING</p>
      <div
        style={{
          width: "300px",
          height: "20px",
          backgroundColor: "#FFFFFF",
          borderRadius: "10px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* The loading bar */}
        <div
          style={{
            width: "0%",
            height: "100%",
            backgroundColor: "#8B5CF6", // Lighter purple for the bar
            position: "absolute",
            animation: "loading-bar-smooth 2s infinite linear",
          }}
        ></div>

        {/* The moving runner */}
        <FaRunning
          style={{
            fontSize: "20px",
            color: "#4C1D95", // Dark purple for the runner
            position: "absolute",
            top: "50%",
            left: "0%", // Start position
            transform: "translate(-50%, -50%)",
            animation: "runner-smooth 2s infinite linear",
          }}
        />
      </div>
      <p style={{ fontSize: "12px", marginTop: "10px",color:"BLACK",fontWeight:"5rem" }}>PLEASE WAIT</p>
    </div>
  );
};

export default LoadingScreen;
