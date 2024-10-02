"use client";
import Countdown, { CountdownRenderProps } from "react-countdown";
import SlotCounter from "react-slot-counter";
import styles from "./style.module.scss";
import { CountdownTimerProps } from "@/Types";

export const CountdownTimer = ({
  showDays = true,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
  note,
  targetDate,
}: CountdownTimerProps) => {
  const timer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    return (
      <div className={styles.timer__box}>
        {note && <h6 className={styles.timer__note}>{note}</h6>}

        <div className={styles.timer__box_inner}>
          <div className={styles.timer__frame}></div>

          <div className={styles.timer__line}>
            <i></i>
            <span>countdown</span>
          </div>

          <div className={styles.timer}>
            {showDays && (
              <>
                <div>
                  <SlotCounter
                    value={String(days).length > 1 ? +days : `0${+days}`}
                    sequentialAnimationMode
                    useMonospaceWidth
                  />
                  <i>Days</i>
                </div>
                <span>:</span>
              </>
            )}

            {showHours && (
              <>
                <div>
                  <SlotCounter
                    value={String(hours).length > 1 ? +hours : `0${+hours}`}
                    sequentialAnimationMode
                    useMonospaceWidth
                  />
                  <i>Hours</i>
                </div>
                <span>:</span>
              </>
            )}

            {showMinutes && (
              <>
                <div>
                  <SlotCounter
                    value={
                      String(minutes).length > 1 ? +minutes : `0${+minutes}`
                    }
                    sequentialAnimationMode
                    useMonospaceWidth
                    dummyCharacterCount={0}
                  />
                  <i>Minutes</i>
                </div>
              </>
            )}

            {showSeconds && (
              <>
                <span>:</span>
                <div>
                  <SlotCounter
                    value={
                      String(seconds).length > 1 ? +seconds : `0${+seconds}`
                    }
                    sequentialAnimationMode
                    useMonospaceWidth
                    dummyCharacterCount={0}
                    duration={1}
                  />
                  <i>Seconds</i>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return <Countdown date={targetDate} renderer={timer} />;
};
