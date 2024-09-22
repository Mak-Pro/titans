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

const slides = [
  {
    id: 1,
    image: {
      url: "/images/image-stub.jpg",
      width: 358,
      height: 295,
    },
    title: "Play Mini Game",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 2,
    image: {
      url: "/images/image-stub.jpg",
      width: 358,
      height: 295,
    },
    title: "Refferals",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 3,
    image: {
      url: "/images/image-stub.jpg",
      width: 358,
      height: 295,
    },
    title: "Leaderboard",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
                    src={slide.image.url}
                    fill
                    alt={slide.title}
                    quality={100}
                  />
                </div>
                <div className={styles.onboarding__slider_slide_content}>
                  <h2 className={styles.onboarding__slider_slide_content_title}>
                    {slide.title}
                  </h2>
                  <p>{parser(slide.text)}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div
        className={`${styles.onboarding__slider_pagination} swiper-pagination-alt`}
      >
        <div id={`pagination-${id}`}></div>
      </div>

      <div className={styles.onboarding__actions}>
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

            last && callBack ? callBack() : () => {};
          }}
        >
          {last ? "Login" : "Next"}
        </Button>
      </div>
    </div>
  );
};
