"use client";
import { useState, useEffect } from "react";
import { useTelegram } from "@/providers/telegram";
import Link from "next/link";
import Image from "next/image";
import styles from "./style.module.scss";
import { infoUser } from "@/api";
import { UserInfoProps } from "@/Types";
import AvatarStub from "@public/icons/spinner.svg";
import { numberFormatter } from "@/helpers";
import { Button } from "@/components";

export const UserBar = ({ points }: { points?: number | null }) => {
  const { user } = useTelegram();
  const [userData, setUserData] = useState<UserInfoProps | undefined>(
    undefined
  );

  useEffect(() => {
    if (user) {
      infoUser(user.id).then((data) => setUserData(data));
    }
  }, [user]);

  return (
    <div className={styles.user__bar}>
      <div className={styles.user}>
        <Link href={"/account"}>link</Link>
        <div className={styles.user_avatar}>
          {(userData?.avatarLink?.includes("null") ||
            userData?.avatarLink === null) && <AvatarStub />}
          {userData &&
            userData.avatarLink &&
            (!userData?.avatarLink?.includes("null") ||
              !userData?.avatarLink === null) && (
              <img src={userData.avatarLink} alt="avatar" />
            )}
        </div>
        <div className={styles.user_text}>
          <h6 className={styles.user_title}>{userData?.username}</h6>
          <div className={styles.user_coins}>
            <Image
              src="/icons/coin-icon.svg"
              width={16}
              height={16}
              alt="coin"
            />{" "}
            {points
              ? numberFormatter(points)
              : userData?.points
              ? numberFormatter(userData?.points)
              : 0}
          </div>
        </div>
      </div>
      <Button
        textColor="var(--text-secondary)"
        href="/intro"
        target="_self"
        className={styles.storyboard__btn}
        radius={0}
      >
        <Image src="/icons/board-icon.svg" width={24} height={24} alt="board" />{" "}
        StoryBoard
      </Button>
    </div>
  );
};
