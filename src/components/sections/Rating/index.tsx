import Image from "next/image";
import { Board, Spacer, Tabs, Tab } from "@/components";
import styles from "./style.module.scss";
import { numberFormatter } from "@/helpers";
import { NumberBadge } from "@/components";
import clsx from "clsx";

export const Rating = () => {
  return (
    <div className={styles.rating}>
      <Spacer space={20} />
      <h2 className={styles.rating__title}>Worldwide Rating</h2>
      <Spacer space={4} />
      <p>Invite friends to earn more Points</p>
      <Spacer space={24} />

      <Tabs className={styles.rating__tabs}>
        <Tab label="Good Team">
          <Spacer space={20} />

          <div className={styles.rating__top}>
            <div
              className={clsx(
                styles.rating__top_column,
                styles.rating__top_column_2
              )}
            >
              <div className={styles.rating__top_person}>
                <div className={styles.rating__top_person_avatar}>
                  <NumberBadge
                    number={2}
                    bgColor="#27160A"
                    borderColor="#C57032"
                  />
                  <Image src="/images/profile-stub.jpg" fill alt="avatar" />
                </div>
                <div className={styles.rating__top_person_name}>
                  Davis Curtis
                </div>
                <div className={styles.rating__top_person_score}>
                  <Image
                    src="/icons/coin-icon.svg"
                    width={16}
                    height={16}
                    alt="coin"
                  />{" "}
                  {numberFormatter(9041.08)}
                </div>
              </div>
              <div className={styles.rating__top_pedestal}>
                <span>2</span>
              </div>
            </div>
            <div
              className={clsx(
                styles.rating__top_column,
                styles.rating__top_column_1
              )}
            >
              <div className={styles.rating__top_person}>
                <div className={styles.rating__top_person_avatar}>
                  <NumberBadge
                    number={1}
                    borderColor="#32A086"
                    bgColor="#0A2627"
                  />
                  <Image src="/images/profile-stub.jpg" fill alt="avatar" />
                </div>
                <div className={styles.rating__top_person_name}>
                  Davis Curtis
                </div>
                <div className={styles.rating__top_person_score}>
                  <Image
                    src="/icons/coin-icon.svg"
                    width={16}
                    height={16}
                    alt="coin"
                  />{" "}
                  {numberFormatter(9041.08)}
                </div>
              </div>
              <div className={styles.rating__top_pedestal}>
                <span>1</span>
              </div>
            </div>
            <div
              className={clsx(
                styles.rating__top_column,
                styles.rating__top_column_3
              )}
            >
              <div className={styles.rating__top_person}>
                <div className={styles.rating__top_person_avatar}>
                  <NumberBadge
                    number={3}
                    borderColor="#809198"
                    bgColor="#1A1D1E"
                  />
                  <Image src="/images/profile-stub.jpg" fill alt="avatar" />
                </div>
                <div className={styles.rating__top_person_name}>
                  Davis Curtis
                </div>
                <div className={styles.rating__top_person_score}>
                  <Image
                    src="/icons/coin-icon.svg"
                    width={16}
                    height={16}
                    alt="coin"
                  />{" "}
                  {numberFormatter(9041.08)}
                </div>
              </div>
              <div className={styles.rating__top_pedestal}>
                <span>3</span>
              </div>
            </div>
          </div>

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
          <Spacer space={20} />

          <div className={styles.rating__top}>
            <div
              className={clsx(
                styles.rating__top_column,
                styles.rating__top_column_2
              )}
            >
              <div className={styles.rating__top_person}>
                <div className={styles.rating__top_person_avatar}>
                  <NumberBadge
                    number={2}
                    bgColor="#27160A"
                    borderColor="#C57032"
                  />
                  <Image src="/images/profile-stub.jpg" fill alt="avatar" />
                </div>
                <div className={styles.rating__top_person_name}>
                  Davis Curtis
                </div>
                <div className={styles.rating__top_person_score}>
                  <Image
                    src="/icons/coin-icon.svg"
                    width={16}
                    height={16}
                    alt="coin"
                  />{" "}
                  {numberFormatter(9041.08)}
                </div>
              </div>
              <div className={styles.rating__top_pedestal}>
                <span>2</span>
              </div>
            </div>
            <div
              className={clsx(
                styles.rating__top_column,
                styles.rating__top_column_1
              )}
            >
              <div className={styles.rating__top_person}>
                <div className={styles.rating__top_person_avatar}>
                  <NumberBadge
                    number={1}
                    borderColor="#32A086"
                    bgColor="#0A2627"
                  />
                  <Image src="/images/profile-stub.jpg" fill alt="avatar" />
                </div>
                <div className={styles.rating__top_person_name}>
                  Davis Curtis
                </div>
                <div className={styles.rating__top_person_score}>
                  <Image
                    src="/icons/coin-icon.svg"
                    width={16}
                    height={16}
                    alt="coin"
                  />{" "}
                  {numberFormatter(9041.08)}
                </div>
              </div>
              <div className={styles.rating__top_pedestal}>
                <span>1</span>
              </div>
            </div>
            <div
              className={clsx(
                styles.rating__top_column,
                styles.rating__top_column_3
              )}
            >
              <div className={styles.rating__top_person}>
                <div className={styles.rating__top_person_avatar}>
                  <NumberBadge
                    number={3}
                    borderColor="#809198"
                    bgColor="#1A1D1E"
                  />
                  <Image src="/images/profile-stub.jpg" fill alt="avatar" />
                </div>
                <div className={styles.rating__top_person_name}>
                  Davis Curtis
                </div>
                <div className={styles.rating__top_person_score}>
                  <Image
                    src="/icons/coin-icon.svg"
                    width={16}
                    height={16}
                    alt="coin"
                  />{" "}
                  {numberFormatter(9041.08)}
                </div>
              </div>
              <div className={styles.rating__top_pedestal}>
                <span>3</span>
              </div>
            </div>
          </div>

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
