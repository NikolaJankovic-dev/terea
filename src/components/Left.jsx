import React, { useState, useEffect } from "react";
import leva from "../ImagesExport/leva16x9";
import leva9x16 from "../ImagesExport/leva9x16";

const Left = ({ left, isLandscape }) => {
  const [position, setPosition] = useState(0);
  const [images, setImages] = useState(null);

  useEffect(() => {
    if (isLandscape) {
      setImages(leva);
    } else {
      setImages(leva9x16);
    }
  }, [isLandscape]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => {
        if (left > prevPosition) {
          return prevPosition + 1;
        } else {
          return prevPosition;
        }
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [left]);

  // preload images
    useEffect(() => {
        if (!images) return;
        images.forEach((image) => {
            const img = new Image();
            img.src = image;
        });
    }, [images]);



return (
  images && (
    <img
      src={images[position % images.length]}
      alt="leva1"
      style={{
        position: "absolute",
        bottom: "0",
        left: "0",
        transform: !isLandscape ? "translateY(5%)" : "",
        height: isLandscape ? "100vh" : "80vh",
        zIndex: "1",
      }}
    />
  )
);
};

export default Left;
