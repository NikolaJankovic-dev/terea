import React, { useState, useEffect } from "react";
import "./App.css";
import Terrea from "./Terrea/Terrea";
import HowTo from "./HowTo/HowTo";
import Won from "./Won/Won";

function App() {
  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight
  );
  const [appPhase, setAppPhase] = useState(0);
  const [won, setWon] = useState(false);
  const [leftImagesLoaded, setLeftImagesLoaded] = useState(false);
  const [rightImagesLoaded, setRightImagesLoaded] = useState(false);

  useEffect(() => {
    if (leftImagesLoaded && rightImagesLoaded) {
      setAppPhase(1);
    }
  }, [leftImagesLoaded, rightImagesLoaded]);
  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const preventDefaultTouchmove = (event) => event.preventDefault();

    window.addEventListener("touchmove", preventDefaultTouchmove, {
      passive: false,
    });

    // Cleanup function
    return () => {
      window.removeEventListener("touchmove", preventDefaultTouchmove);
    };
  }, []);

  return (
    <div
      className="App"
      style={{
        height: window.innerHeight,
        overflow: "hidden",
      }}
    >
      <Terrea
        isLandscape={isLandscape}
        setWon={setWon}
        setLeftImagesLoaded={setLeftImagesLoaded}
        setRightImagesLoaded={setRightImagesLoaded}
      />
      {appPhase !== 5 && (
        <HowTo
          isLandscape={isLandscape}
          appPhase={appPhase}
          setAppPhase={setAppPhase}
          setLeftImagesLoaded={setLeftImagesLoaded}
          setRightImagesLoaded={setRightImagesLoaded}
        />
      )}
      {won && <Won isLandscape={isLandscape} />}
    </div>
  );
}

export default App;
