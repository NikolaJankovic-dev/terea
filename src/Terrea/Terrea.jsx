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

const Terrea = ({ isLandscape }) => {
  const [right, setright] = useState(0);
  const [left, setLeft] = useState(0);
  const [phase, setPhase] = useState(0);
  const [checking, setChecking] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [startAngle, setStartAngle] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [sound, setSound] = useState(false);

  const [images, setImages] = useState(null);

  useEffect(() => {
    if (isLandscape) {
      setImages(desna);
    } else {
      setImages(desna9x16);
    }
  }, [isLandscape]);

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
    if (checking) return;
    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const rad = Math.atan2(e.clientY - y, e.clientX - x);
    const newRotation = rad * (180 / Math.PI) - startAngle;
    setRotation(newRotation);
    const newright = Math.floor((newRotation / 360) * desna.length);
    setright(((newright % images.length) + images.length) % desna.length);
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
      } else if (
        (phaseRef.current === 4 && rightRef.current >= 116) ||
        rightRef.current <= 3
      ) {
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
        setCorrect(1);
        setPhase(10);
      } else {
        if (checking) return;
        setIncorrect(1);
      }
      setStartAngle(null);
      setChecking(true);
    }
  };

  const check2 = () => {
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
      } else if (
        (phaseRef.current === 4 && rightRef.current >= 116) ||
        rightRef.current <= 3
      ) {
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
        setCorrect(1);
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
    if (isLandscape) {
      check();
    } else {
      check2();
    }
  };
  const handleTouchStart = (e) => {
    handleMouseDown(e.touches[0]);
  };

  const handleTouchMove = (e) => {
    handleMouseMove(e.touches[0]);
    e.preventDefault();
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (!correct && !incorrect) {
      setChecking(false);
    }
  }, [correct, incorrect]);

  useEffect(() => {
    if (!images) return;
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, [images]);

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
        top: "10%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxBlockSize: "10vh",
        zIndex: 100,

      }}
        onPointerDown={() => setSound(!sound)}
      />
      {correct > 0 && <Correct correct={correct} setCorrect={setCorrect} />}
      {incorrect > 0 && (
        <Incorrect incorrect={incorrect} setIncorrect={setIncorrect} />
      )}
      <Left left={left} isLandscape={isLandscape} />
      {images && (
        <Right right={right} isLandscape={isLandscape} images={images} />
      )}
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
        onTouchEnd={handleMouseUp}
      >
        <div
          style={{
            width: isLandscape ? "25vh" : "25vw",
            height: isLandscape ? "25vh" : "25vw",
            position: "absolute",
            right: isLandscape ? "50%" : "20%",
            bottom: "10%",
            transform: "translate(50%, -0%)",
            zIndex: "100",
            borderRadius: "50%",
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <Wheel rotation={rotation} isLandscape={isLandscape} />
          <p
            style={{
              position: "absolute",
              bottom: "0",
              left: "50%",
              transform: "translate(-50%, 100%)",
              padding: "30px",
              whiteSpace: "nowrap",
            }}
          >
            Rotate the wheel
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terrea;
