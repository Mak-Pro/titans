"use client";
import Countdown, { CountdownRenderProps } from "react-countdown";
import SlotCounter from "react-slot-counter";
import styles from "./style.module.scss";

export interface CountdownTimerProps {
  showDays?: boolean;
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
}

export const CountdownTimer = ({
  showDays,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
}: CountdownTimerProps) => {
  const targetDate = new Date("2024-09-25T19:00:00");
  const timer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    return (
      <div className={styles.timer}>
        {showDays && (
          <>
            <div>
              <SlotCounter
                value={String(days).length > 1 ? days : `0${days}`}
                sequentialAnimationMode
                useMonospaceWidth
              />
            </div>
            <span>:</span>
          </>
        )}

        {showHours && (
          <>
            <div>
              <SlotCounter
                value={String(hours).length > 1 ? hours : `0${hours}`}
                sequentialAnimationMode
                useMonospaceWidth
              />
            </div>
            <span>:</span>
          </>
        )}

        {showMinutes && (
          <>
            <div>
              <SlotCounter
                value={String(minutes).length > 1 ? minutes : `0${minutes}`}
                sequentialAnimationMode
                useMonospaceWidth
                dummyCharacterCount={0}
              />
            </div>
          </>
        )}

        {showSeconds && (
          <>
            <span>:</span>
            <div>
              <SlotCounter
                value={String(seconds).length > 1 ? seconds : `0${seconds}`}
                sequentialAnimationMode
                useMonospaceWidth
                dummyCharacterCount={0}
                duration={1}
              />
            </div>
          </>
        )}
      </div>
    );
  };

  return <Countdown date={targetDate} renderer={timer} />;
};
