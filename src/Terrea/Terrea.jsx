import React, { useState, useEffect, useRef } from "react";
import inner from "../assets/images/circle/inner.png";
import middle from "../assets/images/circle/middle.png";
import outer from "../assets/images/circle/outer.png";
import terreaBg from "../assets/images/terreaBg.png";
import desna from "../ImagesExport/desna16x9";
import leva from "../ImagesExport/leva16x9";
import Correct from "../components/Correct";
import Incorrect from "../components/Incorrect";

const Terrea = () => {
  const [right, setright] = useState(0);
  const [left, setLeft] = useState(0);
  const [phase, setPhase] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [startAngle, setStartAngle] = useState(null);
  const [rotation, setRotation] = useState(0);

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
    if (e.preventDefault) e.preventDefault();
    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const rad = Math.atan2(e.clientY - y, e.clientX - x);
    setStartAngle(rad * (180 / Math.PI) - rotation);
  };

  const handleMouseMove = (e) => {
    if (e.preventDefault) e.preventDefault();
    if (startAngle === null) return;
    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const rad = Math.atan2(e.clientY - y, e.clientX - x);
    const newRotation = rad * (180 / Math.PI) - startAngle;
    setRotation(newRotation);
    const newright = Math.floor((newRotation / 360) * desna.length);
    setright(((newright % desna.length) + desna.length) % desna.length);
  };

  const handleMouseUp = () => {
    if (startAngle !== null) {
      if (
        phaseRef.current === 0 &&
        rightRef.current >= 30 &&
        rightRef.current <= 35
      ) {
        setLeft((left) => left + 1);
        setCorrect(1);
        setPhase(1);
        setIncorrect(0);
      }
      else if (
        phaseRef.current === 1 &&
        rightRef.current >= 60 &&
        rightRef.current <= 65
      ) {
        setLeft((left) => left + 7);
        setCorrect(1);
        setPhase(2);
      } else {
        setIncorrect(1);
      }
      setStartAngle(null);
    }
  };
  const handleTouchStart = (e) => {
    handleMouseDown(e.touches[0]);
  };

  const handleTouchMove = (e) => {
    handleMouseMove(e.touches[0]);
  };

  const handleTouchEnd = (e) => {
    // e.preventDefault();
    // if (
    //   phaseRef.current === 0 &&
    //   rightRef.current >= 30 &&
    //   rightRef.current <= 35
    // ) {
    //   setLeft((left) => left + 1);
    //   setCorrect(1);
    //   setPhase(1);
    //   setIncorrect(0);
    // }
    // if (
    //   phaseRef.current === 1 &&
    //   rightRef.current >= 60 &&
    //   rightRef.current <= 65
    // ) {
    //   setLeft((left) => left + 1);
    //   setCorrect(1);
    //   setPhase(2);
    // } else {
    //   setIncorrect(1);
    // }
    // setStartAngle(null);
  
    // handleMouseUp();
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

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
        backgroundPosition: "right bottom",
      }}
    >
      {correct && <Correct correct={correct} setCorrect={setCorrect} />}
      {incorrect && (
        <Incorrect incorrect={incorrect} setIncorrect={setIncorrect} />
      )}
      <img
        src={leva[left % leva.length]}
        alt="leva1"
        style={{ position: "absolute", top: "0", left: "0" }}
      />
      <img
        src={desna[right % desna.length]}
        alt="desna1"
        style={{ position: "absolute", top: "0", right: "0" }}
      />
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          style={{
            width: "200px",
            height: "200px",
            position: "absolute",
            left: "50%",
            bottom: "10%",
            transform: "translate(-50%, -0%)",
            // backgroundColor: "red",
            zIndex: "100",
            borderRadius: "50%",
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <img
            src={inner}
            alt="inner"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              userSelect: "none",
            }}
          />
          <img
            src={middle}
            alt="middle"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              transform: `rotate(${-rotation}deg) `,
              userSelect: "none",
            }}
          />
          <img
            src={outer}
            alt="outer"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              transform: `rotate(${rotation}deg) `,
              userSelect: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Terrea;
