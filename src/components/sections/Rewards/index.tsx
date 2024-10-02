"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import AppContext from "@/providers/context";
import { BoardInfo, Button, Spacer } from "@/components";
import styles from "./style.module.scss";
import clsx from "clsx";
import Image from "next/image";
import { numberFormatter } from "@/helpers";

export const Rewards = () => {
  const { rewardsData } = useContext(AppContext);
  const router = useRouter();
  const [days, setDays] = useState<number[]>([]);

  useEffect(() => {
    if (rewardsData) {
      for (let i = rewardsData.minDay; i <= rewardsData.maxDay; i++) {
        setDays((prev) => [...prev, i]);
      }
    }
  }, [rewardsData]);

  return (
    <div className={styles.rewards}>
      <h2 className={styles.rewards__title}>Daily Rewards</h2>
      <p>Come back tomorrow to claim even more rewards!</p>
      <Spacer space={40} />
      {rewardsData && (
        <>
          <div className={styles.rewards__list}>
            <BoardInfo>
              <div className={styles.steps}>
                <h6 className={styles.steps__title}>
                  Get weekly{" "}
                  <span>{numberFormatter(rewardsData.weekReward)}</span> coins
                  on <span>Day {rewardsData.maxDay}</span>
                </h6>
                <ul className={styles.steps__list}>
                  {days.map((day) => (
                    <li
                      key={day}
                      className={clsx(
                        styles.steps__list_item,
                        day <= rewardsData.checkInCounter &&
                          styles.steps__list_item_active
                      )}
                    >
                      <i></i>
                      <span>Day {day}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </BoardInfo>
            <BoardInfo>
              <div className={styles.info}>
                <h6>Your Daily Reward</h6>
                <div>
                  <Image
                    src="/icons/coin-icon-alt.svg"
                    width={40}
                    height={40}
                    alt="reward"
                  />{" "}
                  {numberFormatter(rewardsData.todayReward)}
                </div>
              </div>
            </BoardInfo>
          </div>
          <div className={styles.rewards__actions}>
            <Button
              size="medium"
              variant="filled"
              textColor={"var(--button-text-primary)"}
              bgColor={"var(--button-bg-primary)"}
              onClick={() =>
                sessionStorage.getItem("first") !== null
                  ? router.replace("/intro")
                  : router.replace("/")
              }
              radius={0}
            >
              Claim
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
