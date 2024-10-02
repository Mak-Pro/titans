"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./style.module.scss";
import { TopControlArea } from "@/components/ui/TopControlArea";
import clsx from "clsx";
import { useState, useEffect, useRef } from "react";
import { useTelegram } from "@/providers/telegram";
import { gameController } from "@/api";
import { GameInfoProps } from "@/Types";

interface TouchPoint {
  id: string;
}

const progressPoints = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100].reverse();

export const Play = () => {
  const { user } = useTelegram();
  const router = useRouter();
  const [gameInfo, setGameInfo] = useState<GameInfoProps | null>(null);
  const [score, setScore] = useState(0);
  const [percent, setPercent] = useState(0);
  const [player, setPlayer] = useState<any>(null);

  const tapAreaRef = useRef<HTMLDivElement>(null);
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const [isTapping, setIsTapping] = useState(false);
  const [touchPoints, setTouchPoints] = useState<TouchPoint[]>([]);
  const [lastTapTime, setLastTapTime] = useState(0);
  const [end, setEnd] = useState(false);

  // touchstart
  const handleTouchStart = () => {
    if (gameInfo) {
      if (percent < 99.99) {
        setScore(
          (prevScore) =>
            prevScore +
            gameInfo.points / Math.ceil(gameInfo.points / gameInfo.clickValue)
        );
        setPercent(
          (prev) =>
            prev + 100 / Math.ceil(gameInfo.points / gameInfo.clickValue)
        );

        if (player && currentAnimation === "idle") {
          player.setAnimation("run", true);
          setCurrentAnimation("tap");
        }
      } else {
        setIsTapping(false);
        setEnd(true);

        if (user) {
          gameController("/games/farm", { telegramId: user?.id }).then(() => {
            router.replace("/farming");
          });
        }
      }

      const newTouchPoint: TouchPoint = {
        id: `${Date.now()}-${Math.random()}`,
      };

      setTouchPoints((prevPoints) => [...prevPoints, newTouchPoint]);

      setTimeout(() => {
        setTouchPoints((prevPoints) =>
          prevPoints.filter((point) => point.id !== newTouchPoint.id)
        );
      }, 1000);
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

    if (tapAreaRef.current) {
      tapAreaRef.current.addEventListener("touchstart", handleTapStart);
      tapAreaRef.current.addEventListener("touchend", handleTapEnd);
      // tapAreaRef.current.addEventListener("mousedown", handleTapStart);
      // tapAreaRef.current.addEventListener("mouseup", handleTapEnd);
    }

    return () => {
      clearInterval(tapTimeout);
      if (tapAreaRef.current) {
        tapAreaRef.current.removeEventListener("touchstart", handleTapStart);
        tapAreaRef.current.removeEventListener("touchend", handleTapEnd);
        // tapAreaRef.current.removeEventListener("mousedown", handleTapStart);
        // tapAreaRef.current.removeEventListener("mouseup", handleTapEnd);
      }
    };
  }, [lastTapTime]);

  useEffect(() => {
    if (user) {
      gameController("/games/info", { telegramId: user.id }).then((data) => {
        setGameInfo(data);
      });
    }
  }, [user]);

  return (
    <>
      <TopControlArea back backHandler={() => router.replace("/")} />
      <div className={styles.play}>
        <div className={styles.play__stats}>
          <div>
            <span>Power</span> {Math.round(score)}/
            {gameInfo ? gameInfo.points : 0}
          </div>
          <div>
            <span>Agility</span> {gameInfo ? gameInfo.clickValue : 0}
          </div>
          <div>
            <span>Stamina</span> {gameInfo ? gameInfo.farmingTime : 0} ml/H
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
            {Math.round(score)} / {gameInfo ? gameInfo.points : 0}
          </div>
        </div>
        <div
          className={clsx(
            styles.play__action,
            end && styles.play__action_inactive
          )}
        >
          <div className={styles.progress}>
            <div className={styles.progress__bar}>
              {progressPoints.map((point) => (
                <span
                  key={point}
                  className={clsx(
                    styles.progress__bar_point,
                    point <= Math.round(percent) &&
                      styles.progress__bar_point_active
                  )}
                ></span>
              ))}
            </div>
            <div className={styles.progress__percent}>
              {Math.round(percent)}%
            </div>
          </div>
          <div id="robot" className={styles.play__action_robot}>
            <div
              ref={tapAreaRef}
              className={styles.tap__area}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              // onMouseDown={handleTouchStart}
              // onMouseUp={handleTouchEnd}
            >
              <AnimatePresence mode="popLayout">
                {touchPoints.map((touch) => (
                  <motion.div
                    key={touch.id}
                    className={styles.tap__area_point}
                    initial={{ scale: 0, y: 0, x: "-50%", opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      y: [0, -80, -120],
                    }}
                    transition={{ duration: 1 }}
                  >
                    +{gameInfo?.clickValue}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          <div id="tap" className={styles.play__action_tap}></div>
        </div>
      </div>
    </>
  );
};
