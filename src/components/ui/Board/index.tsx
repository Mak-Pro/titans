"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./style.module.scss";
import { Button, NumberBadge } from "@/components";
import { BoardProps } from "@/Types";
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
}: BoardProps) => {
  return (
    <div
      className={clsx(
        styles.board,
        type === "alt" && styles.board__alt,
        type === "person" && styles.board__person
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
            type === "person" && styles.board__media_person
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
              width={type === "person" ? 32 : 48}
              height={type === "person" ? 32 : 48}
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
          {button && (
            <Button
              variant="outlined"
              size="small"
              textColor="var(--button-bg-primary)"
              radius={0}
              href={button.link}
            >
              {" "}
              Start
            </Button>
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
            // <div className={styles.board__rate}>
            //   <Image
            //     src="/icons/rate-icon.svg"
            //     width={37}
            //     height={32}
            //     alt="rate"
            //   />{" "}
            //   <span>{rate.position}</span>{" "}
            // </div>
          )}
        </div>
      </div>
    </div>
  );
};
