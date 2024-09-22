import { Board, Tabs, Tab, Spacer, Button, Referral, Slot } from "@/components";
import styles from "./style.module.scss";

export const Quest = () => {
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
        />
        <Board
          icon="/icons/swords-icon.svg"
          title="Choose a Side of Force"
          text="232,000 users are in – join the prize draw!"
          note="2d 12h 48m"
        />
      </div>

      <Spacer space={14} />

      <div className="divider"></div>

      <Spacer space={26} />

      <Tabs>
        <Tab label="Daily">
          <Spacer space={12} />
          <div className="board-list">
            <Board
              icon="/icons/invite-icon.svg"
              title="Invite your friends"
              text="+1 000"
              type="person"
              reward
              button={{ link: "https://www.google.com/" }}
            />
            <Board
              icon="/icons/telegram-icon-big.svg"
              title="Join in our Telegram"
              text="+1 000"
              type="person"
              reward
              button={{ link: "https://www.google.com/" }}
            />
            <Board
              icon="/icons/youtube-icon.svg"
              title="Subscribe to youtube"
              text="+1 000"
              type="person"
              reward
              button={{ link: "https://www.google.com/" }}
            />
          </div>
        </Tab>
        <Tab label="Investors">
          <Spacer space={12} />
          <div className="board-list">
            <Board
              icon="/icons/youtube-icon.svg"
              title="Subscribe to youtube"
              text="+1 000"
              type="person"
              reward
              button={{ link: "https://www.google.com/" }}
            />
            <Board
              icon="/icons/invite-icon.svg"
              title="Invite your friends"
              text="+1 000"
              type="person"
              reward
              button={{ link: "https://www.google.com/" }}
            />
            <Board
              icon="/icons/telegram-icon-big.svg"
              title="Join in our Telegram"
              text="+1 000"
              type="person"
              reward
              button={{ link: "https://www.google.com/" }}
            />
          </div>
        </Tab>
        <Tab label="Quests">
          <Spacer space={12} />
          <div className="board-list">
            <Board
              icon="/icons/youtube-icon.svg"
              title="Subscribe to youtube"
              text="+1 000"
              type="person"
              reward
              button={{ link: "https://www.google.com/" }}
            />
            <Board
              icon="/icons/telegram-icon-big.svg"
              title="Join in our Telegram"
              text="+1 000"
              type="person"
              reward
              button={{ link: "https://www.google.com/" }}
            />
            <Board
              icon="/icons/invite-icon.svg"
              title="Invite your friends"
              text="+1 000"
              type="person"
              reward
              button={{ link: "https://www.google.com/" }}
            />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};
