"use client";
import Link from "next/link";
import Image from "next/image";
import { useTelegram } from "@/providers/telegram";
import styles from "./style.module.scss";
import { Button, NumberBadge } from "@/components";
import { BoardProps } from "@/Types";
import { questCompleteUser } from "@/api";
import clsx from "clsx";

export const Board = ({
  type,
  avatar,
  icon,
  title,
  text,
  reward,
  rate,
  button,
  onClick,
  note,
  position,
  mainLink,
  bonus,
  done,
  questId,
  callBack,
}: BoardProps) => {
  const { user } = useTelegram();
  return (
    <div
      className={clsx(
        styles.board,
        type === "alt" && styles.board__alt,
        type === "person" && styles.board__person,
        done && styles.board__done
      )}
    >
      {mainLink && (
        <Link href={`${mainLink}`} className={styles.board__link}>
          link
        </Link>
      )}
      <div className={styles.board__left}>
        <div
          className={clsx(
            styles.board__media,
            type === "alt" && styles.board__media_alt,
            type === "person" && styles.board__media_person,
            type === "invite" && styles.board__media_invite
          )}
        >
          {type === "alt" && position && (
            <div className={styles.board__position}>
              {position < 10 ? `0${position}` : position}
            </div>
          )}
          {icon && (
            <Image
              src={icon}
              width={type === "person" || type === "invite" ? 32 : 48}
              height={type === "person" || type === "invite" ? 32 : 48}
              alt="icon"
            />
          )}
          {avatar && (
            <div
              className={clsx(
                styles.board__avatar,
                type === "alt" && styles.board__avatar_alt,
                type === "person" && styles.board__avatar_person
              )}
            >
              <Image src={avatar} fill alt="avatar" />
            </div>
          )}
          {note && <div className={styles.board__note}>{note}</div>}
        </div>
      </div>
      <div
        className={clsx(
          styles.board__right,
          type === "alt" && styles.board__right_alt,
          type === "person" && styles.board__right_person
        )}
      >
        <div className={styles.board__right_side}>
          {title && <h5 className={styles.board__title}>{title}</h5>}
          <div className={styles.board__text}>
            {reward && (
              <Image
                src="/icons/coin-icon.svg"
                width={18}
                height={18}
                alt="coin"
              />
            )}{" "}
            {text && <p>{text}</p>}
          </div>
        </div>
        <div className={styles.board__right_side}>
          {done && (
            <Image
              src="/icons/check-icon.svg"
              width={22}
              height={18}
              alt="done"
            />
          )}

          {button && !done && (
            <Button
              variant="outlined"
              size="small"
              textColor="var(--button-bg-primary)"
              radius={0}
              href={button.link}
              target="_blank"
              linkClick={() => {
                if (user && questId) {
                  questCompleteUser(user.id, { questId });
                  callBack && callBack();
                }
              }}
            >
              {" "}
              Start
            </Button>
          )}
          {type === "invite" && (
            <div className={styles.board__bonus}>
              {bonus ? `+${bonus}k` : 0}

              <Image
                src="/icons/coin-icon-alt.svg"
                width={20}
                height={20}
                alt="bonus"
              />
            </div>
          )}
          {rate && (
            <NumberBadge
              number={rate.position}
              borderColor={clsx(
                rate.position === 1 && "#32A086",
                rate.position === 2 && "#C57032",
                rate.position === 3 && "#809198"
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};
