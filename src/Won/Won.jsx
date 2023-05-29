import React, {useState, useEffect} from "react";
import packs from "../assets/images/howto/packs.png";
import circleBg from "../assets/images/circleBg.png";


const Won = ({isLandscape}) => {
    const [phase, setPhase] = useState(0)
    // const [scale, setScale] = useState(0)

    useEffect(() => {
        if (phase === 0) {
            const interval = setInterval(() => {
                setPhase(1)
            }, 1000)

            return () => {
                clearInterval(interval)
            }
        }
    }, [phase])

  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        zIndex: "100",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: isLandscape ? "row" : "column",
        backgroundColor: "rgba(25,204,186,1)",
        transform: `scale(${phase === 1 ? 1 : 0})`,
        borderRadius: phase === 1 ? "0" : "20%",
        transition: "all 2s ease",
      }}
    >
      <div
        style={{
           width: isLandscape ? "50%" : "100%",
          height: isLandscape ? "100%" : "50%",
          display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
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
            height: "48%",
             rotate: `${phase === 1 ? -360 : -90}deg`,
             transform: `scale(${phase === 1 ? 1 : 0})`,
            transition: "all 3s ease",
          }}
        />
        <img
            src={circleBg}
            alt="circleBg"
            style={{
                position: "absolute",
                bottom: "50%",
                left: "50%",
                transform: isLandscape ? "translate(-40%, 60%)" : "translate(-50%, 70%)",
                width: isLandscape ?  "80%" : "80%",
                // =height: "100%",
                userSelect: "none",
                zIndex: "-1",
                }}
        />
      </div>
      <div
        style={{
          width: "50%",
          display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            // gap: "0.1rem",
        }}
      >
        <h1 style={{
            fontSize: "5vh",
        }}>Čestitamo!</h1>
        <p
        style={{
            fontSize: "2.5vh",
            textAlign: "center",
            whiteSpace: "nowrap",
        }}
        >Osvojili ste xx bodova.</p>
        <button
        style={{
            fontSize: "2vh",
            padding: "1rem 3rem",
            borderRadius: "2.5rem",
            marginTop: "4rem",
            backgroundColor: "rgb(51, 47, 60)",
            color: "white",
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",


        }}
        >   COLLECT POINTS</button>
      </div>
    </div>
  );
};

export default Won;
