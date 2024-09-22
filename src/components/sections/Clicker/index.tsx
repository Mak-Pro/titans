"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";

export const Clicker = () => {
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/scripts/spine-player.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const spine = (window as any).spine;

      if (spine) {
        const newPlayer = new spine.SpinePlayer("spine-container", {
          skeleton:
            "https://esotericsoftware.com/files/examples/4.2/spineboy/export/spineboy-pro.json",
          atlas:
            "https://esotericsoftware.com/files/examples/4.1/spineboy/export/spineboy-pma.atlas",
          animation: "walk",
          //   skeleton: "/data/t_hp1.json",
          //   atlas: "/data/t_hp1.atlas",
          //   animation: "win",
          showControls: false,
          showLoading: false,
          alpha: true,
          //   viewport: {
          //     debugRender: true,
          //   },
          success: (player: any) => {
            // player.animationState.setAnimation(0, "walk", false);
            // player.setAnimation("run", true);
            console.log("Spine animation loaded successfully");
            setPlayer(player);
          },
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Playback control functions
  const playAnimation = () => {
    if (player) {
      player.play();
    }
  };

  const pauseAnimation = () => {
    if (player) {
      player.pause();
    }
  };

  const stopAnimation = () => {
    if (player) {
      player.stop();
    }
  };

  const runAnimation = () => {
    if (player) {
      player.setAnimation("run", true);
    }
  };

  const walkAnimation = () => {
    if (player) {
      player.setAnimation("walk", true);
    }
  };

  return (
    <>
      <div id="spine-container" style={{ width: "100%", height: "100%" }}></div>
      <div className="controls">
        <button onClick={playAnimation}>Play</button>
        <button onClick={pauseAnimation}>Pause</button>
        <button onClick={stopAnimation}>Stop</button>
        <button onClick={runAnimation}>Run</button>
        <button onClick={walkAnimation}>walk</button>
      </div>
    </>
  );
};
