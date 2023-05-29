import React, { useState, useEffect, useRef } from "react";
import inner from "../assets/images/circle/inner.png";
import middle from "../assets/images/circle/middle.png";
import outer from "../assets/images/circle/outer.png";
import terreaBg from "../assets/images/terreaBg.png";
import desna from "../ImagesExport/desna16x9";
import desna9x16 from "../ImagesExport/desna9x16";
import Correct from "../components/Correct";
import Incorrect from "../components/Incorrect";
import Left from "../components/Left";
import Right from "../components/Right";
import Wheel from "../components/Wheel";
import on from "../assets/images/sound/on.png";
import off from "../assets/images/sound/off.png";

const Terrea = ({ isLandscape, setWon, setLeftImagesLoaded, setRightImagesLoaded }) => {
  const [right, setRight] = useState(0);
  const [left, setLeft] = useState(0);
  const [phase, setPhase] = useState(0);
  const [checking, setChecking] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [startAngle, setStartAngle] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [sound, setSound] = useState(false);

  // const [images, setImages] = useState(null);

  // useEffect(() => {
  //   if (isLandscape) {
  //     setImages(desna);
  //   } else {
  //     setImages(desna9x16);
  //   }
  // }, [isLandscape]);

  // Create refs
  const rightRef = useRef(right);
  const phaseRef = useRef(phase);

  // Update refs whenever 'right' and 'phase' change
  useEffect(() => {
    rightRef.current = right;
  }, [right]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const handleMouseDown = (e) => {
    setTouchEnd(false);
    if (e.preventDefault) e.preventDefault();
    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const rad = Math.atan2(e.clientY - y, e.clientX - x);
    setStartAngle(rad * (180 / Math.PI) - rotation);
  };

  const handleMouseMove = (e) => {
    // if (e.preventDefault) e.preventDefault();
    if (startAngle === null) return;
    if (checking) return;
    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const rad = Math.atan2(e.clientY - y, e.clientX - x);
    const newRotation = rad * (180 / Math.PI) - startAngle;
    setRotation(newRotation);
    const newright = Math.floor((newRotation / 360) * 118);
    setRight(((newright % 118) + 118) % 118);
  };

  const check = () => {
    if (startAngle !== null) {
      if (
        phaseRef.current === 0 &&
        rightRef.current >= 55 &&
        rightRef.current <= 62
      ) {
        setLeft((left) => left + 10);
        setCorrect(1);
        setPhase(1);
        setIncorrect(0);
      } else if (
        phaseRef.current === 1 &&
        rightRef.current >= 103 &&
        rightRef.current <= 110
      ) {
        setLeft((left) => left + 13);
        setCorrect(1);
        setPhase(2);
      } else if (
        phaseRef.current === 2 &&
        rightRef.current >= 68 &&
        rightRef.current <= 75
      ) {
        setLeft((left) => left + 13);
        setCorrect(1);
        setPhase(3);
      } else if (
        phaseRef.current === 3 &&
        rightRef.current >= 7 &&
        rightRef.current <= 14
      ) {
        setLeft((left) => left + 13);
        setCorrect(1);
        setPhase(4);
      } else if (phaseRef.current === 4 && rightRef.current >= 116) {
        setLeft((left) => left + 12);
        setCorrect(1);
        setPhase(5);
      } else if (phaseRef.current === 4 && rightRef.current <= 3) {
        setLeft((left) => left + 12);
        setCorrect(1);
        setPhase(5);
      } else if (
        phaseRef.current === 5 &&
        rightRef.current >= 31 &&
        rightRef.current <= 38
      ) {
        setLeft((left) => left + 12);
        setCorrect(1);
        setPhase(6);
      } else if (
        phaseRef.current === 6 &&
        rightRef.current >= 80 &&
        rightRef.current <= 86
      ) {
        setLeft((left) => left + 12);
        setCorrect(1);
        setPhase(7);
      } else if (
        phaseRef.current === 7 &&
        rightRef.current >= 44 &&
        rightRef.current <= 51
      ) {
        setLeft((left) => left + 12);
        setCorrect(1);
        setPhase(8);
      } else if (
        phaseRef.current === 8 &&
        rightRef.current >= 20 &&
        rightRef.current <= 26
      ) {
        setLeft((left) => left + 9);
        setCorrect(1);
        setPhase(9);
      } else if (
        phaseRef.current === 9 &&
        rightRef.current >= 92 &&
        rightRef.current <= 98
      ) {
        setLeft(107);
        setWon(true);
        setPhase(10);
      } else {
        if (checking) return;
        setIncorrect(1);
      }
      setStartAngle(null);
      setChecking(true);
    }
  };

  const handleMouseUp = () => {
    check();
  };
  // const handleTouchStart = (e) => {
  //   handleMouseDown(e.touches[0]);
  // };

  // const handleTouchMove = (e) => {
  //   handleMouseMove(e.touches[0]);
  //   // e.preventDefault();
  // };

  function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  let initialY;
  let previousY;

  const handleTouchStart = (e) => {
    initialY = e.touches[0].clientY;
    previousY = initialY;
    setStartAngle(null);
  };

  const touchMoveFT = (e) => {
    if (initialY === null) return;
    if (checking) return;
    setStartAngle(1);

    const currentY = e.touches[0].clientY;
    const diffY = previousY - currentY;

    // Provera da li se kursor pomera gore ili dole
    if (diffY > 0) {
      setRight((right + 1) % 118); // Gore
    } else if (diffY < 0) {
      setRight((right - 1 + 118) % 118); // Dole
    }

    previousY = currentY; // Postavi previousY za sledeći put
  };

  const handleTouchMove = throttle(touchMoveFT, 10);

  // useEffect(() => {
  //   window.addEventListener("mouseup", handleMouseUp);
  //   window.addEventListener("touchend", handleMouseUp);
  //   return () => {
  //     window.removeEventListener("mouseup", handleMouseUp);
  //     window.removeEventListener("touchend", handleMouseUp);
  //   };
  // }, []);

  useEffect(() => {
    if (!correct && !incorrect) {
      setChecking(false);
    }
  }, [correct, incorrect]);

  const [touchEnd, setTouchEnd] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundImage: `url(${terreaBg})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right top",
      }}
    >
      <img
        src={sound ? on : off}
        style={{
          position: "absolute",
          top: isLandscape ? "10%" : "0%",
          left: isLandscape ? "50%" : "0%",
          transform: isLandscape
            ? "translate(-50%, -50%)"
            : "translate(5vw, 5vw)",
          transformOrigin: "left top",
          maxBlockSize: "5vh",
          zIndex: 100,
        }}
        alt="sound"
        onPointerDown={() => setSound(!sound)}
      />
      {correct > 0 && <Correct correct={correct} setCorrect={setCorrect} />}
      {incorrect > 0 && (
        <Incorrect incorrect={incorrect} setIncorrect={setIncorrect} />
      )}
      <Left left={left} isLandscape={isLandscape} setLeftImagesLoaded={setLeftImagesLoaded} />
      {/* {images && ( */}
      <Right
        right={right}
        setRight={setRight}
        isLandscape={isLandscape}
        handleTouchStart={handleTouchStart}
        handleTouchMove={handleTouchMove}
        setRightImagesLoaded={setRightImagesLoaded}
        handleTouchEnd={() => {
          console.log("touch end");
          check();
        }}
        touchEnd={touchEnd}
        setTouchEnd={setTouchEnd}
      />
      {/* )} */}
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
        onMouseMove={handleMouseMove}
        // onMouseUp={handleMouseUp}
        onMouseUp={() => setTouchEnd(true)}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <div
          style={{
            width: isLandscape ? "25vh" : "25vw",
            height: isLandscape ? "25vh" : "25vw",
            position: "absolute",
            right: isLandscape ? "50%" : "16%",
            bottom: isLandscape ? "0%" : "5%",
            transform: "translate(50%, -55%)",
            zIndex: "100",
            borderRadius: "50%",
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {isLandscape && (
            <>
              {" "}
              <Wheel rotation={rotation} isLandscape={isLandscape} />
              <p
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "50%",
                  transform: "translate(-50%, 100%)",
                  padding: "20px",
                  whiteSpace: "nowrap",
                }}
              >
                Rotate the wheel
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terrea;
