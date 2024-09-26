"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useId, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Card, TopControlArea } from "@/components";
import styles from "./style.module.scss";
import { CardProps } from "@/Types";
import clsx from "clsx";

const chapters: CardProps[] = [
  {
    position: 1,
    image: "/images/profile-stub.jpg",
    subtitle: "Chapter #1",
    title: "The Awakening",
    text: "Dive into the world of Titans and join the battle for supremacy. Collect, upgrade, and compete to become the ultimate champion!",
    button: { text: "Read More", link: "/intro/awakening" },
    location: {
      x: 10,
      y: 52,
    },
    blocked: false,
  },
  {
    position: 2,
    subtitle: "Chapter #2",
    title: "Paths Diverge",
    text: "Earth’s defenses are mobilizing as the player works to prepare for the Xar'ul’s assault.The player must secure resources, allies, and technology to strengthen the resistance, with the guidance and support of the Obsidian Circle.",
    button: { text: "Read More", link: "/intro/diverge" },
    location: {
      x: 30,
      y: 74,
    },
    blocked: false,
  },
  {
    position: 3,
    subtitle: "Chapter #3",
    title: "Transform brain",
    text: "Earth’s defenses are mobilizing as the player works to prepare for the Xar'ul’s assault.The player must secure resources, allies, and technology to strengthen the resistance, with the guidance and support of the Obsidian Circle.",
    button: { text: "Read More", link: "/intro/transform" },
    location: {
      x: 86,
      y: 52,
    },
    blocked: true,
  },
];

export const Intro = () => {
  const router = useRouter();
  const id = useId().replace(/:/g, "");
  const [gridPlayer, setGridPlayer] = useState<any>(null);
  const [activeChapter, setActiveChapter] = useState(1);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/scripts/spine-player.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const spine = (window as any).spine;

      // grid animation
      if (spine) {
        const gridPlayer = new spine.SpinePlayer("intro-grid", {
          // skeleton:
          //   "https://esotericsoftware.com/files/examples/4.2/spineboy/export/spineboy-pro.json",
          // atlas:
          //   "https://esotericsoftware.com/files/examples/4.2/spineboy/export/spineboy-pma.atlas",
          // animation: "walk",
          skeleton: "/data/animations/grid.json",
          atlas: "/data/animations/grid.atlas",
          animation: "animation",
          showControls: false,
          showLoading: false,
          alpha: true,
          //   viewport: {
          //     debugRender: true,
          //   },
          success: (player: any) => {
            // player.animationState.setAnimation(0, "walk", false);
            // player.setAnimation("run", true);
            console.log("Spine animation loaded successfully");
            setGridPlayer(player);
          },
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <TopControlArea back backHandler={() => router.replace("/")} />
      <div className={styles.intro}>
        <div className={styles.intro__media}>
          <div id="intro-grid" className={styles.intro__media_grid}></div>
          <div className={styles.intro__media_earth}>
            <Image
              src="/images/earth.svg"
              width={246}
              height={246}
              alt="earth"
            />
            <div className={styles.intro__media_earth_points}>
              {chapters.map((chapter) => (
                <span
                  key={chapter.position}
                  style={{
                    position: "absolute",
                    left: `${chapter.location.x}%`,
                    top: `${chapter.location.y}%`,
                  }}
                  className={clsx(
                    styles.intro__media_earth_point,
                    chapter.blocked && styles.intro__media_earth_point_blocked,
                    activeChapter === chapter.position &&
                      styles.intro__media_earth_point_active
                  )}
                ></span>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.intro__content}>
          <div className={styles.intro__chapters}>
            <Swiper
              className={`${styles.intro__chapters_slider}`}
              modules={[Pagination]}
              slidesPerView={1}
              spaceBetween={16}
              pagination={{
                dynamicBullets: false,
                el: `#pagination-${id}`,
                type: "bullets",
              }}
              loop={false}
              onSlideChange={(swiper) => {
                setActiveChapter(swiper.realIndex + 1);
              }}
            >
              {chapters.map((chapter) => (
                <SwiperSlide key={chapter.position}>
                  <Card {...chapter} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div
            className={`${styles.intro__chapters_slider_pagination} swiper-pagination-alt`}
          >
            <div id={`pagination-${id}`}></div>
          </div>
        </div>
      </div>
      {/* <div className={styles.intro__actions}>
        <Button
          size="medium"
          variant="filled"
          textColor="var(--button-text-primary)"
          bgColor="var(--button-bg-primary)"
          radius={0}
        >
          Skip
        </Button>
      </div> */}
    </>
  );
};
