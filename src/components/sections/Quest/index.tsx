"use client";
import { useEffect, useState } from "react";
import { useTelegram } from "@/providers/telegram";
import { questsUser } from "@/api";
import { Board, Tabs, Tab, Spacer, CountdownSimple } from "@/components";
import styles from "./style.module.scss";
import { QuestsProps } from "@/Types";

export const Quest = () => {
  const { user } = useTelegram();
  const [quests, setQuests] = useState<QuestsProps | undefined>(undefined);

  const handleQuests = () => {
    if (user) {
      questsUser(user.id).then((data: QuestsProps) => setQuests(data));
    }
  };

  useEffect(() => {
    handleQuests();
  }, [user, quests]);

  return (
    <div className={styles.quest}>
      <Spacer space={20} />
      <h2 className={styles.quest__title}>Quest</h2>
      <Spacer space={4} />
      <p>Complete Quest to Maximize Your Earnings</p>
      <Spacer space={24} />

      <div className="board-list">
        <Board
          icon="/icons/coin-icon-alt.svg"
          title="Spin the Wheel"
          text="1 chance a day to win big – don't miss out!"
          note="1 Spin"
          mainLink="/spin"
        />
        <Board
          icon="/icons/swords-icon.svg"
          title="Choose a Side of Force"
          text="232,000 users are in – join the prize draw!"
          note={
            <CountdownSimple
              targetDate="2024-10-08T23:59:59"
              showSeconds={false}
            />
          }
        />
      </div>

      <Spacer space={14} />

      <div className="divider"></div>

      <Spacer space={26} />

      {typeof quests === "object" && (
        <Tabs>
          <Tab label="Daily">
            <Spacer space={12} />
            <div className="board-list">
              {quests.dailyQuests.map((quest) => (
                <Board
                  key={quest.id}
                  icon="/icons/invite-icon.svg"
                  title={quest.description}
                  text={
                    quest.rewardType === "POINTS"
                      ? `+${quest.reward}`
                      : `*${quest.reward}`
                  }
                  type="person"
                  reward
                  button={
                    quest.button ? { link: quest.button.link } : undefined
                  }
                  done={quest.done}
                  questId={quest.id}
                />
              ))}
            </div>
          </Tab>
          <Tab label="Social">
            <Spacer space={12} />
            <div className="board-list">
              {quests.socialQuests.map((quest) => (
                <Board
                  key={quest.id}
                  icon="/icons/invite-icon.svg"
                  title={quest.description}
                  text={
                    quest.rewardType === "POINTS"
                      ? `+${quest.reward}`
                      : `*${quest.reward}`
                  }
                  type="person"
                  reward
                  button={
                    quest.button ? { link: quest.button.link } : undefined
                  }
                  done={quest.done}
                  questId={quest.id}
                  callBack={quest.button ? handleQuests : undefined}
                />
              ))}
            </div>
          </Tab>
          <Tab label="Partners">
            <Spacer space={12} />
            <div className="board-list">
              {quests.partnersQuests.map((quest) => (
                <Board
                  key={quest.id}
                  icon="/icons/invite-icon.svg"
                  title={quest.description}
                  text={
                    quest.rewardType === "POINTS"
                      ? `+${quest.reward}`
                      : `*${quest.reward}`
                  }
                  type="person"
                  reward
                  button={
                    quest.button ? { link: quest.button.link } : undefined
                  }
                  done={quest.done}
                  questId={quest.id}
                  callBack={quest.button ? handleQuests : undefined}
                />
              ))}
            </div>
          </Tab>
        </Tabs>
      )}
    </div>
  );
};
