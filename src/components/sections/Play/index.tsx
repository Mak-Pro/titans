"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./style.module.scss";
import { TopControlArea } from "@/components/ui/TopControlArea";
import { numberFormatter } from "@/helpers";
import clsx from "clsx";
import { useState, useEffect } from "react";

interface TouchPoint {
  id: number;
  x: number;
  y: number;
}

const progressPoints = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100].reverse();

export const Play = () => {
  const router = useRouter();
  const [score, setScore] = useState(0);
  const [percent, setPercent] = useState(40);
  const [player, setPlayer] = useState<any>(null);
  const [touchPoints, setTouchPoints] = useState<TouchPoint[]>([]);

  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const [isTapping, setIsTapping] = useState(false);
  const [lastTapTime, setLastTapTime] = useState(0);

  // touchstart
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const newTouchPoints: any = Array.from(event.changedTouches).map(
      (touch) => {
        return {
          id: `${touch.identifier}-${Date.now()}`,
          x: touch.clientX,
          y: touch.clientY,
        };
      }
    );
    setTouchPoints((prevPoints) => [...prevPoints, ...newTouchPoints]);
    setScore((prevScore) => prevScore + event.changedTouches.length);

    setTimeout(() => {
      setTouchPoints((prevPoints) =>
        prevPoints.filter(
          (point) =>
            !newTouchPoints.some(
              (newPoint: TouchPoint) => newPoint.id === point.id
            )
        )
      );
    }, 1100);

    if (player && currentAnimation === "idle") {
      player.setAnimation("run", true);
      setCurrentAnimation("tap");
    }
  };

  const handleTouchEnd = () => {
    if (player && !isTapping) {
      player.setAnimation("walk", true);
    }
  };

  useEffect(() => {
    if (player && !isTapping) {
      player.setAnimation("walk", true);
      setCurrentAnimation("idle");
    }
  }, [isTapping]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/scripts/spine-player.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const spine = (window as any).spine;

      if (spine) {
        const robotPlayer = new spine.SpinePlayer("robot", {
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

  // animation
  useEffect(() => {
    const handleTapStart = () => {
      setIsTapping(true);
      setLastTapTime(Date.now());
    };

    const handleTapEnd = () => {
      setLastTapTime(Date.now());
    };

    const handleTimeout = () => {
      if (Date.now() - lastTapTime >= 500) {
        setIsTapping(false);
      }
    };

    const tapTimeout = setInterval(handleTimeout, 200);

    document.addEventListener("touchstart", handleTapStart);
    document.addEventListener("touchend", handleTapEnd);

    return () => {
      clearInterval(tapTimeout);
      document.removeEventListener("touchstart", handleTapStart);
      document.removeEventListener("touchend", handleTapEnd);
    };
  }, [lastTapTime]);

  return (
    <>
      <TopControlArea back backHandler={() => router.replace("/")} />
      <div className={styles.play}>
        <div className={styles.play__stats}>
          <div>
            <span>Power</span> {0}/{180}
          </div>
          <div>
            <span>Agility</span> {0}
          </div>
          <div>
            <span>Stamina</span> {3600} ml/H
          </div>
        </div>
        <div className={styles.play__score}>
          <div className={styles.play__score_inner}>
            <Image
              src="/icons/coin-icon-alt.svg"
              width={32}
              height={32}
              alt="score"
            />{" "}
            {numberFormatter(score)}
          </div>
        </div>
        <div
          className={styles.play__action}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className={styles.progress}>
            <div className={styles.progress__bar}>
              {progressPoints.map((point) => (
                <span
                  key={point}
                  className={clsx(
                    styles.progress__bar_point,
                    point <= percent && styles.progress__bar_point_active
                  )}
                ></span>
              ))}
            </div>
            <div className={styles.progress__percent}>{percent}%</div>
          </div>
          <div id="robot" className={styles.play__action_robot}></div>
          <div id="tap" className={styles.play__action_tap}></div>
        </div>
      </div>
      <AnimatePresence mode="popLayout">
        {touchPoints.map((touch: TouchPoint) => (
          <motion.div
            key={touch.id}
            className={styles.play__action_point}
            style={{
              left: touch.x,
              top: touch.y,
            }}
            initial={{ scale: 0, y: 0 }}
            animate={{ scale: [0, 1, 0], y: [-10, -40, -120] }}
            // exit={{ opacity: 0, scale: 0, y: -90 }}
            transition={{ duration: 1 }}
          >
            +1
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};
