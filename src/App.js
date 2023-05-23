import React, { useState, useEffect } from "react";
import "./App.css";
import Terrea from "./Terrea/Terrea";
import HowTo from "./HowTo/HowTo";

function App() {
  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight
  );
  const [appPhase, setAppPhase] = useState(0);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    });
  }, []);
  return (
    <div
      className="App"
      style={{
        height: window.innerHeight,
        overflow: "hidden",
      }}
    >
      <Terrea isLandscape={isLandscape} />
      <HowTo isLandscape={isLandscape} appPhase={appPhase} setAppPhase={setAppPhase}/>
    </div>
  );
}

export default App;
