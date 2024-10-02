"use client";
import { useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./style.module.scss";
import parser from "html-react-parser";
import clsx from "clsx";

const slides = [
  {
    id: 1,
    image: "/images/image-stub.jpg",
    title: "Welcome to Game",
    text: "Dive into the world of Titans and join the battle for supremacy. Collect, upgrade, and compete to become the ultimate champion!",
    list: [
      "Earn points and power up your Titans by tapping. The faster you tap, the stronger your Titans become!",
      "Let your Titans farm points while you’re away. Return to claim your rewards and continue your journey.",
    ],
  },
  {
    id: 2,
    image: "/images/image-stub.jpg",
    title: "Invite Friends & Earn More!",
    text: "Invite your friends to join the game and earn exclusive rewards. The more friends you refer, the stronger your Titans will grow!",
    list: [
      "Send invites to your friends.",
      "Earn rewards when your friends join and start playing.",
      "Unlock special characters and bonuses as your network grows.",
    ],
  },
  {
    id: 3,
    image: "/images/image-stub.jpg",
    title: "Climb the Leaderboard",
    list: [
      "See how you stack up against players from around the world. Compete in weekly contests and dominate the leaderboard!",
      "Join forces with others to compete as a team. Whether you choose to fight for good or embrace the dark side, your actions will influence the fate of your team.",
      "Top players earn exclusive rewards and bragging rights!",
    ],
  },
];

export const Onboarding = ({ callBack }: { callBack?: () => void }) => {
  const router = useRouter();
  const id = useId().replace(/:/g, "");
  const swiperRef = useRef<any>(null);
  const [last, setLast] = useState(false);
  return (
    <div className={styles.onboarding}>
      <div className={styles.onboarding__slider_box}>
        <Swiper
          className={`${styles.onboarding__slider}`}
          modules={[Pagination]}
          slidesPerView={1}
          spaceBetween={16}
          pagination={{
            dynamicBullets: false,
            el: `#pagination-${id}`,
            type: "bullets",
          }}
          loop={false}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            swiper.realIndex === slides.length - 1
              ? setLast(true)
              : setLast(false);
          }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className={styles.onboarding__slider_slide}>
                <div className={styles.onboarding__slider_slide_image}>
                  <Image
                    src={slide.image}
                    fill
                    alt={slide.title}
                    quality={100}
                  />
                </div>
                <div className={styles.onboarding__slider_slide_content}>
                  <h2 className={styles.onboarding__slider_slide_content_title}>
                    {slide.title}
                  </h2>
                  {slide.text && <p>{parser(slide.text)}</p>}
                  {slide.list && (
                    <ul>
                      {slide.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div
        className={`${styles.onboarding__slider_pagination} swiper-pagination-alt fixed`}
      >
        <div id={`pagination-${id}`}></div>
      </div>

      <div className={clsx(styles.onboarding__actions, "fixed")}>
        <Button
          variant="filled"
          bgColor={"var(--button-bg-primary)"}
          textColor={"var(--button-text-primary)"}
          radius={0}
          onClick={() => {
            swiperRef &&
              swiperRef.current &&
              !last &&
              swiperRef.current.slideNext();
            if (last) {
              sessionStorage.setItem("first", "true");
              router.replace("/register");
            }
          }}
        >
          {last ? "Register" : "Next"}
        </Button>
      </div>
    </div>
  );
};
