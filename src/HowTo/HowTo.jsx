import React, { useState, useEffect } from "react";
import packs from "../assets/images/howto/packs.png";
import s2 from "../assets/images/howto/s2.png";
import Left from "../components/Left";
import Right from "../components/Right";
import desna from "../ImagesExport/desna16x9";
import desna9x16 from "../ImagesExport/desna9x16";
import Wheel from "../components/Wheel";

const HowTo = ({
  isLandscape,
  appPhase,
  setAppPhase,
  setLeftImagesLoaded,
  setRightImagesLoaded,
}) => {
  const [rotation, setRotation] = useState(0);
  const [right, setRight] = useState(0);

  useEffect(() => {
    // if (appPhase === 0) {
    //   const interval = setInterval(() => {
    //     setAppPhase(1);
    //   }, 1000);

    //   return () => {
    //     clearInterval(interval);
    //   };
    // }
    if (appPhase === 2) {
      const interval = setInterval(() => {
        setAppPhase(3);
      }, 4000);

      return () => {
        clearInterval(interval);
      };
    }
    if (appPhase === 4) {
      const interval = setInterval(() => {
        setAppPhase(5);
      }, 400);

      return () => {
        clearInterval(interval);
      };
    }
  }, [appPhase]);

  const [images, setImages] = useState(null);
  useEffect(() => {
    if (appPhase > 2) {
      const interval = setInterval(() => {
        setRotation((prevRotation) => prevRotation + 1);
        if (images && right === images.length - 1) {
          setRight(0);
        }
        setRight((prevRight) => prevRight + 1);
      }, 50);

      return () => {
        clearInterval(interval);
      };
    }
  }, [appPhase]);

  useEffect(() => {
    if (isLandscape) {
      setImages(desna);
    } else {
      setImages(desna9x16);
    }
  }, [isLandscape]);

  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        zIndex: "100",
        backgroundColor: `rgba(51,47,60, ${appPhase < 2 ? 1 : 0.9})`,
        scale: `${appPhase < 2 ? 1 : appPhase < 4 ? 0.95 : 0}`,
        opacity: `${appPhase < 4 ? 1 : 0}`,
        borderRadius: `${appPhase < 2 ? 0 : 2}rem`,
        transition:
          "scale 1s ease 2s, opacity 2s ease 0s, border-radius 1s ease 2s, background-color 3s ease 1s",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isLandscape ? "row" : "column",

          justifyContent: "space-evenly",
          alignItems: "center",
          height: "100%",
        }}
      >
        <img
          src={packs}
          alt="packs"
          style={{
            // position: "absolute",
            // top: "0",
            // left: "0",
            // width: "100%",
            height: isLandscape ? "48%" : "28%",
            rotate: `${appPhase === 1 ? -360 : -90}deg`,
            transform: `scale(${appPhase === 1 ? 1 : 0})`,
            transition: "all 2s ease",
          }}
        />
        <div
          style={{
            opacity: appPhase === 1 ? 1 : 0,
            transition: "all 1s ease 0.5s",
            color: "white",
            position: "relative",
          }}
        >
          <h1>TEREA game</h1>
          <button
            onPointerDown={() => {
              setAppPhase(2);
            }}
            style={{
              position: "absolute",
              zIndex: "100",
              width: "100%",
              marginTop: "2rem",
              color: "white",
              backgroundColor: "#00CDBA",
              border: "none",
              borderRadius: "2rem",
              padding: "1rem",
              cursor: "pointer",
              fontSize: "1.2rem",
              letterSpacing: "0.2rem",
            }}
          >
            START
          </button>
        </div>
      </div>
      <div
        style={{
          opacity: appPhase < 2 ? 0 : 1,
          zIndex: appPhase === 0 ? -1 : 100,
          // position: "relative",
          display: "flex",
          justifyContent: "space-evenly",
          //   opacity: appPhase === 2 ? 1 : 0,
          transition: "all 3s ease 2s",
        }}
      >
        <Left
          left={0}
          isLandscape={isLandscape}
          setLeftImagesLoaded={setLeftImagesLoaded}
        />
        {/* <Wheel isLandscape={isLandscape} /> */}
        <div
          style={{
            position: "absolute",
            top: "0%",
            right: "50%",
            transform: isLandscape
              ? "translate(50%, 50%)"
              : "translate(-50%, 50%)",
            color: "white",
            fontSize: isLandscape ? "5vh" : "5vw",
            textAlign: "center",
            fontWeight: "bold",
            display: isLandscape ? "flex" : "none",
          }}
        >
          {" "}
          MATCH THE
          <br /> TEREA PACK <br /> WITH HEETS PACK
        </div>
        <div
          style={{
            width: isLandscape ? "25vh" : "25vw",
            height: isLandscape ? "25vh" : "25vw",
            position: "absolute",
            right: isLandscape ? "50%" : "15%",
            bottom: isLandscape ? "0%" : "5%",
            transform: "translate(50%, -50%)",
            zIndex: "100",
            borderRadius: "50%",
          }}
          //   onMouseDown={handleMouseDown}
          //   onTouchStart={handleTouchStart}
          onPointerDown={() => {
            setAppPhase(4);
          }}
        >
          <Wheel rotation={rotation} isLandscape={isLandscape} />
          <img
            src={s2}
            alt="s2"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              zIndex: "100",
              borderRadius: "50%",
              width: "120%",
            }}
          />
          <p
            style={{
              position: "absolute",
              bottom: "0",
              left: "50%",
              transform: "translate(-50%, 100%)",
              padding: isLandscape ? "30px" : "10px",
              whiteSpace: "nowrap",
              color: "white",
            }}
          >
            Rotate the wheel and find
            <br />
            the matching TEREA pack
          </p>
        </div>
        {images && (
          <Right
            right={right}
            isLandscape={isLandscape}
            images={images}
            setRightImagesLoaded={setRightImagesLoaded}
          />
        )}
      </div>
    </div>
  );
};

export default HowTo;
