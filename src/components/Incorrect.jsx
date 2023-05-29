import React, { useState, useEffect } from "react";
import netacno from "../ImagesExport/netacno";

const Incorrect = ({ incorrect, setIncorrect }) => {
  //   const [incorrect, setIncorrect] = useState(1);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [animationDone, setAnimationDone] = useState(false); // new state to track if animation is done
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (!imagesLoaded || animationDone) return; // if images are not loaded or animation is done, don't set up the interval

    const interval = setInterval(() => {
      setIncorrect((incorrect) => incorrect + direction);
    }, 50);

    if (incorrect >= netacno.length - 1) {
      setDirection(-1); // start going backwards
    } else if (incorrect <= 0) {
      setDirection(1); // start going forward
      setAnimationDone(true); // mark animation as done when it's back at the start
    }

    return () => clearInterval(interval);
  }, [incorrect, direction, animationDone, imagesLoaded]); // include new state in dependency array

  //

  // preload images
  useEffect(() => {
    if (!netacno.length) return;
    Promise.all(
      netacno.map(
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

  return (
    <img
      src={netacno[incorrect % netacno.length]}
      alt="netacno"
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

export default Incorrect;
