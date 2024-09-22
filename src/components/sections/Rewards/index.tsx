"use client";
import { useRouter } from "next/navigation";
import { Board, Button, Spacer } from "@/components";
import styles from "./style.module.scss";

interface RewardsProps {
  tasks?: number;
}

export const Rewards = ({ tasks }: RewardsProps) => {
  const router = useRouter();

  return (
    <div className={styles.rewards}>
      <h2 className={styles.rewards__title}>Daily Rewards</h2>
      <p>Come back tomorrow to claim even more rewards!</p>
      <Spacer space={40} />
      <div className={styles.rewards__list}>
        <Board title="Daily Bonus" reward text="+1 000" />
        <Board
          icon="/icons/swords-icon.svg"
          title="Choose a Side of Force"
          text="232,000 users are in – join the prize draw!"
          note="2d 12h 48m"
        />
      </div>
      <div className={styles.rewards__actions}>
        <Button
          size="medium"
          variant="filled"
          textColor={"var(--button-text-primary)"}
          bgColor={"var(--button-bg-primary)"}
          onClick={() => router.replace("/")}
          radius={0}
        >
          Claim
        </Button>
      </div>
    </div>
  );
};
