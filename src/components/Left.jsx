import React, { useState, useEffect } from "react";
import leva from "../ImagesExport/leva16x9";
import leva9x16 from "../ImagesExport/leva9x16";

const Left = ({ left, isLandscape, setLeftImagesLoaded }) => {
  const [position, setPosition] = useState(0);
  const [images, setImages] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

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
  // useEffect(() => {
  //   if (!images) return;
  //   Promise.all(
  //     images.map(
  //       (src) =>
  //         new Promise((resolve, reject) => {
  //           const img = new Image();
  //           img.onload = resolve;
  //           img.onerror = reject;
  //           img.src = src;
  //         })
  //     )
  //   ).then(() => {
  //     console.log("Images loaded");
  //     setImagesLoaded(true); // set imagesLoaded to true when all images are loaded
  //   });
  // }, [images]);

  useEffect(() => {
    if (!images) return;
    Promise.all(
      images.map(
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
    }).catch((errorEvent) => {
      console.error("Failed to load an image: ", errorEvent);
    });
  }, [images]);

  useEffect(() => {
    setLeftImagesLoaded(imagesLoaded);
  }, [imagesLoaded]);

  if (!imagesLoaded) return null;

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
          height: isLandscape ? "100vh" : "69vh",
          zIndex: "1",
        }}
      />
    )
  );
};

export default Left;
