import Image from "next/image";
import styles from "./style.module.scss";
import { ReferralProps } from "@/Types";

export const Referral = ({
  avatar,
  percent,
  name,
  users,
  earn,
}: ReferralProps) => {
  return (
    <div className={styles.referral}>
      <div className={styles.referral__header}>
        <div className={styles.referral__avatar}>
          {avatar && <Image src={avatar} fill alt="avatar" />}
        </div>
        <div className={styles.referral__percent}>
          <span className={styles.referral__percent_text}>
            {percent} <i>%</i>
          </span>
          <span
            className={styles.referral__percent_bar}
            style={{ height: `${50}%` }}
          ></span>
        </div>
      </div>
      <div className={styles.referral__body}>
        <h6 className={styles.referral__name}>{name}</h6>
        <div className={styles.referral__info}>
          <span>Invited:</span>
          {users} users
        </div>
        <div className={styles.referral__divider}></div>
        <div className={styles.referral__info}>
          <span>Eearned:</span>
          {earn}
        </div>
      </div>
    </div>
  );
};
