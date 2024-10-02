"use client";
import { useEffect, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Button, UserBar } from "@/components";
import styles from "./style.module.scss";
import clsx from "clsx";
import { infoUser } from "@/api";
import AppContext from "@/providers/context";
import { UserInfoProps, TitanProps } from "@/Types";

export const Select = () => {
  const { user } = useContext(AppContext);
  const [userData, setUserData] = useState<UserInfoProps | undefined>(
    undefined
  );

  let robots: TitanProps[] | null = null;
  if (userData) {
    robots = [{ ...userData?.currentTitan }, ...userData!.titans];
  }

  useEffect(() => {
    if (user) {
      infoUser(user.id).then((data) => setUserData(data));
    }
  }, [user]);

  return (
    <div className={styles.select}>
      <div className={styles.select__header}>
        <UserBar />
      </div>
      <div className={styles.select__body}>
        <div className={styles.select__body_content}>
          {robots && robots.length > 0 && (
            <Swiper
              className={`${styles.select__slider}`}
              modules={[Navigation]}
              slidesPerView={1}
              spaceBetween={16}
              navigation={{}}
              loop={true}
            >
              {robots.map((robot) => (
                <SwiperSlide key={robot.name}>
                  <div className={styles.select__robot}>
                    <video
                      src="/videos/robot.mp4"
                      playsInline
                      muted
                      loop
                      autoPlay
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
      <div className={clsx(styles.select__footer, "fixed")}>
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
