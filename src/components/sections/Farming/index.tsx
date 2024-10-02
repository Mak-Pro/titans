"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTelegram } from "@/providers/telegram";
import { CountdownTimer, Button } from "@/components";
import styles from "./style.module.scss";
import { gameController } from "@/api";

export const Farming = () => {
  const router = useRouter();
  const { user } = useTelegram();
  const [targetDate, setTargetDate] = useState(undefined);
  const [finished, setFinished] = useState(false);

  const handleClaim = () => {
    if (user) {
      gameController("/games/claim", { telegramId: user.id }).then((data) => {
        router.replace("/");
      });
    }
  };

  useEffect(() => {
    if (user) {
      gameController("/games/info", { telegramId: user.id }).then((data) => {
        const currentTime = new Date();
        const endTime = new Date(data.endTime);
        if (currentTime > endTime) {
          setFinished(true);
        } else {
          setTargetDate(data.endTime.slice(0, 19));
        }
      });
    }
  }, [user]);

  useEffect(() => {}, [targetDate]);

  return (
    <div className={styles.farming}>
      <div className={styles.farming__timer}>
        {targetDate && (
          <CountdownTimer targetDate={targetDate} showDays={false} />
        )}
        {finished && (
          <Button
            variant="filled"
            size="medium"
            bgColor="var(--button-bg-primary)"
            textColor="var(--button-text-primary)"
            onClick={handleClaim}
            radius={0}
          >
            Claim
          </Button>
        )}
      </div>
    </div>
  );
};
