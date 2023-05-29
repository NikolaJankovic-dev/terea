import React, { useState, useEffect } from "react";
import desna from "../ImagesExport/desna16x9";
import desna9x16 from "../ImagesExport/desna9x16";

const Right = ({
  right,
  setRight,
  isLandscape,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  touchEnd,
  setTouchEnd,
  setRightImagesLoaded
}) => {
  const [images, setImages] = useState(desna);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const straightPacks = [0, 9, 22, 34, 47, 57, 69, 83, 97, 109];

  function findClosestNumber(arr, num) {
    let closest = arr[0];
    let diff = Math.abs(num - closest);

    for (let i = 1; i < arr.length; i++) {
      let newDiff = Math.abs(num - arr[i]);
      if (newDiff < diff) {
        diff = newDiff;
        closest = arr[i];
      }
    }

    return closest;
  }

  useEffect(() => {
    const closestNumber = findClosestNumber(straightPacks, right);
    // now you can do something with closestNumber
    if (!touchEnd) return;
    const interval = setInterval(() => {
      if (right > closestNumber) {
        setRight(right - 1);
      } else if (right < closestNumber) {
        setRight(right + 1);
      } else {
        clearInterval(interval);
        handleTouchEnd();
      }
    }, 100);
    return () => clearInterval(interval);
  }, [touchEnd, right]);

  useEffect(() => {
    if (isLandscape) {
      setImages(desna);
    } else {
      setImages(desna9x16);
    }
  }, [isLandscape]);

  // preload images
  useEffect(() => {
    if (!images) return;
    Promise.all(
      images.map((image) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = image;
        });
      })
    ).then(() => {
      console.log("Images loaded");
      setImagesLoaded(true); // set imagesLoaded to true when all images are loaded
    });
  }, [images]);

  useEffect(() => {
    setRightImagesLoaded(imagesLoaded);
  }, [imagesLoaded]);

  if (!imagesLoaded) return null;
  return (
    <img
      src={images[right % 118]}
      alt="desna1"
      style={{
        position: "absolute",
        top: "0",
        right: "0",
        height: isLandscape ? "100vh" : "80vh",
        zIndex: "1",
      }}
      onTouchStart={(e) => {
        handleTouchStart(e);
        setTouchEnd(false);
        console.log("touchstart");
      }}
      onTouchMove={(e) => {
        handleTouchMove(e);
        console.log("touchmove");
      }}
      onTouchEnd={() => {
        // handleTouchEnd();
        setTimeout(() => {
        setTouchEnd(true);
        }, 500);
        console.log("touchend");
      }}
    />
  );
};

export default Right;
