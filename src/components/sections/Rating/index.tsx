import { Board, Spacer, Tabs, Tab } from "@/components";
import styles from "./style.module.scss";

export const Rating = () => {
  return (
    <div className={styles.rating}>
      <Spacer space={20} />
      <h2 className={styles.rating__title}>Worldwide Rating</h2>
      <Spacer space={4} />
      <p>Invite friends to earn more Points</p>
      <Spacer space={24} />

      <Tabs>
        <Tab label="Good Team">
          <Spacer space={60} />
          <div className={`${styles.friends__list} title-list`}>
            <div className="title-list-header">
              <h6>Worldwide players: 574 365</h6>
            </div>
            <div className="title-list-body">
              <div className="title-list-grid">
                <Board
                  avatar="/images/profile-stub.jpg"
                  title="huyenbaby.xoxo"
                  text={`${446405}`}
                  reward
                  rate={{ position: 1 }}
                  type="person"
                />
                <Board
                  avatar="/images/profile-stub.jpg"
                  title="banhbao_duadua"
                  text={`${904108}`}
                  reward
                  rate={{ position: 2 }}
                  type="person"
                />
                <Board
                  avatar="/images/profile-stub.jpg"
                  title="khoailangthang"
                  text={`${228348}`}
                  reward
                  rate={{ position: 3 }}
                  type="person"
                />
                <Board
                  avatar="/images/profile-stub.jpg"
                  title="khoailangthang"
                  text={`${228348}`}
                  reward
                  type="person"
                />
                <Board
                  avatar="/images/profile-stub.jpg"
                  title="khoailangthang"
                  text={`${228348}`}
                  reward
                  type="person"
                />
                <Board
                  avatar="/images/profile-stub.jpg"
                  title="khoailangthang"
                  text={`${228348}`}
                  reward
                  type="person"
                />
                <Board
                  avatar="/images/profile-stub.jpg"
                  title="khoailangthang"
                  text={`${228348}`}
                  reward
                  type="person"
                />
                <Board
                  avatar="/images/profile-stub.jpg"
                  title="khoailangthang"
                  text={`${228348}`}
                  reward
                  type="person"
                />
                <Board
                  avatar="/images/profile-stub.jpg"
                  title="khoailangthang"
                  text={`${228348}`}
                  reward
                  type="person"
                />
              </div>
            </div>
          </div>
        </Tab>
        <Tab label="Evil Team">
          <Spacer space={60} />
          <div className={`${styles.friends__list} title-list`}>
            <div className="title-list-header">
              <h6>Worldwide players: 300 365</h6>
            </div>
            <div className="title-list-body">
              <div className="title-list-grid">
                <Board
                  avatar="/images/profile-stub.jpg"
                  title="huyenbaby.xoxo"
                  text={`${446405}`}
                  reward
                  rate={{ position: 1 }}
                  type="person"
                />
                <Board
                  avatar="/images/profile-stub.jpg"
                  title="banhbao_duadua"
                  text={`${904108}`}
                  reward
                  rate={{ position: 2 }}
                  type="person"
                />
                <Board
                  avatar="/images/profile-stub.jpg"
                  title="khoailangthang"
                  text={`${228348}`}
                  reward
                  rate={{ position: 3 }}
                  type="person"
                />
                <Board
                  avatar="/images/profile-stub.jpg"
                  title="khoailangthang"
                  text={`${228348}`}
                  reward
                  type="person"
                />
                <Board
                  avatar="/images/profile-stub.jpg"
                  title="khoailangthang"
                  text={`${228348}`}
                  reward
                  type="person"
                />
                <Board
                  avatar="/images/profile-stub.jpg"
                  title="khoailangthang"
                  text={`${228348}`}
                  reward
                  type="person"
                />
                <Board
                  avatar="/images/profile-stub.jpg"
                  title="khoailangthang"
                  text={`${228348}`}
                  reward
                  type="person"
                />
                <Board
                  avatar="/images/profile-stub.jpg"
                  title="khoailangthang"
                  text={`${228348}`}
                  reward
                  type="person"
                />
                <Board
                  avatar="/images/profile-stub.jpg"
                  title="khoailangthang"
                  text={`${228348}`}
                  reward
                  type="person"
                />
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};
