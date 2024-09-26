"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Button } from "@/components";
import styles from "./style.module.scss";
import { numberFormatter } from "@/helpers";

const robots = [
  { id: 1, video: "/videos/robot.mp4" },
  { id: 2, video: "/videos/robot.mp4" },
  { id: 3, video: "/videos/robot.mp4" },
  { id: 4, video: "/videos/robot.mp4" },
];

export const Select = () => {
  return (
    <div className={styles.select}>
      <div className={styles.select__header}>
        <div className={styles.select__user}>
          <div className={styles.select__user_avatar}>
            <Image src="/images/profile-stub.jpg" fill alt="avatar" />
          </div>
          <div className={styles.select__user_text}>
            <h6 className={styles.select__user_title}>John Cee</h6>
            <div className={styles.select__user_coins}>
              <Image
                src="/icons/coin-icon.svg"
                width={16}
                height={16}
                alt="coin"
              />{" "}
              {numberFormatter(10000)}
            </div>
          </div>
        </div>
        <button className={styles.storyboard__btn}>
          <Image
            src="/icons/board-icon.svg"
            width={24}
            height={24}
            alt="board"
          />{" "}
          StoryBoard
        </button>
      </div>
      <div className={styles.select__body}>
        <div className={styles.select__body_content}>
          <Swiper
            className={`${styles.select__slider}`}
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={16}
            navigation={{}}
            loop={false}
          >
            {robots.map((robot) => (
              <SwiperSlide key={robot.id}>
                <div className={styles.select__robot}>
                  <video
                    src="/videos/robot.mp4"
                    playsInline
                    muted
                    loop
                    autoPlay
                  ></video>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className={styles.select__footer}>
        <Button
          variant="filled"
          size="medium"
          textColor="var(--button-text-primary)"
          bgColor="var(--button-bg-primary)"
          href="/play"
          radius={0}
          target="_self"
        >
          Play
        </Button>
        <Button
          variant="outlined"
          size="medium"
          textColor="var(--button-bg-primary)"
          bgColor="var(--button-bg-primary)"
          href="/boost"
          radius={0}
          target="_self"
        >
          Upgrade
        </Button>
      </div>
    </div>
  );
};
