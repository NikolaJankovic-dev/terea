import React, { useState, useEffect } from "react";
import netacno from "../ImagesExport/netacno";

const Incorrect = ({incorrect, setIncorrect}) => {
//   const [incorrect, setIncorrect] = useState(1);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [animationDone, setAnimationDone] = useState(false); // new state to track if animation is done

  useEffect(() => {
    if (animationDone) return; // if animation is done, don't set up the interval

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
  }, [incorrect, direction, animationDone]); // include new state in dependency array

  return (
    <img
      src={netacno[incorrect % netacno.length]}
      alt="netacno"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default Incorrect;
