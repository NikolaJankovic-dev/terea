import React from 'react'
import desna from "../ImagesExport/desna16x9";
import desna9x16 from "../ImagesExport/desna9x16";

const Right = ({right, images, isLandscape}) => {
    
  return (
    <img
          src={images[right % images.length]}
          alt="desna1"
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            height: isLandscape ? "100vh" : "80vh",
          }}
        />
  )
}

export default Right