import React, { useState, useEffect } from "react";
import tacno from "../ImagesExport/tacno";

const Correct = ({ correct, setCorrect }) => {
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [animationDone, setAnimationDone] = useState(false); // new state to track if animation is done
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (!imagesLoaded || animationDone) return; // if images are not loaded or animation is done, don't set up the interval

    const interval = setInterval(() => {
      setCorrect((correct) => correct + direction);
    }, 50);

    if (correct >= tacno.length - 1) {
      setDirection(-1); // start going backwards
    } else if (correct <= 0) {
      setDirection(1); // start going forward
      setAnimationDone(true); // mark animation as done when it's back at the start
    }

    return () => clearInterval(interval);
  }, [correct, direction, animationDone, imagesLoaded]); // include new state in dependency array

  //preload images
  useEffect(() => {
    if (!tacno.length) return;
    Promise.all(
      tacno.map(
        (src) =>
          new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = src;
          })
      )
    ).then(() => {
      console.log("Images loaded");
      setImagesLoaded(true); // set imagesLoaded to true when all images are loaded
    });
  }, []);

  if (!imagesLoaded) return null;

  return (
    <img
      src={tacno[correct % tacno.length]}
      alt="tacno"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -70%)",
        maxBlockSize: "30vh",
        zIndex: "100",
      }}
    />
  );
};

export default Correct;
