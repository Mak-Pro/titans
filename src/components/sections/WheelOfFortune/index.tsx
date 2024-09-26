"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Wheel, Spacer } from "@/components";
import styles from "./style.module.scss";

export const WheelOfFortune = () => {
  const roulette = [
    { id: "1", color: "#9EDCEF", value: 100 },
    {
      id: "2",
      color: "#D8F3FF",
      value: 15,
    },
    { id: "3", color: "#9EDCEF", value: 100 },
    { id: "4", color: "#D8F3FF", value: 15 },
    {
      id: "5",
      color: "#9EDCEF",
      value: 100,
    },
    { id: "6", color: "#D8F3FF", value: 15 },
    { id: "7", color: "#9EDCEF", value: 100 },
    { id: "8", color: "#D8F3FF", value: 15 },
  ];

  const winner = Math.floor(Math.random() * roulette.length);

  const [wheelPlayer, setWheelPlayer] = useState<any>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/scripts/spine-player.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const spine = (window as any).spine;

      // grid animation
      if (spine) {
        const wheelPlayer = new spine.SpinePlayer("wheel-outer", {
          skeleton: "/data/animations/wheel.json",
          atlas: "/data/animations/wheel.atlas",
          animation: "animation",
          showControls: false,
          showLoading: false,
          alpha: true,
          success: (player: any) => {
            console.log("Spine animation loaded successfully");
            setWheelPlayer(player);
          },
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div className={styles.wheel}>
        <Spacer space={20} />
        <h2 className={styles.wheel__title}>Wheel of fortune</h2>
        <Spacer space={4} />
        <p>
          Test your luck and win amazing prizes! Spin the wheel for free every
          day
        </p>
        <Spacer space={24} />
        <div className={styles.wheel__box}>
          <Image
            src="/icons/wheel-bg-grid.svg"
            width={316}
            height={441}
            alt="grid"
            className={styles.wheel__box_grid}
          />
          <div id="wheel-outer" className={styles.wheel__box_outer}></div>
          <Image
            src="/icons/wheel-outer-static.svg"
            width={358}
            height={370}
            alt="outer"
            className={styles.wheel__box_outer_static}
          />
          <Wheel
            data={roulette.reverse()}
            size={286}
            winner={winner}
            className={styles.wheel__roulette}
          />
        </div>
      </div>
    </>
  );
};
