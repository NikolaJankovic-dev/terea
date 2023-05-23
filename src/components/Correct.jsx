import React, { useState, useEffect } from "react";
import tacno from "../ImagesExport/tacno";

const Correct = ({correct, setCorrect}) => {
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [animationDone, setAnimationDone] = useState(false); // new state to track if animation is done

  useEffect(() => {
    if (animationDone) return; // if animation is done, don't set up the interval

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
  }, [correct, direction, animationDone]); // include new state in dependency array

//preload images
    useEffect(() => {
        tacno.forEach((image) => {
            const img = new Image();
            img.src = image;
        });
    }, []);


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
