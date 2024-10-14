"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

const robots = [
  {
    "name": "Mythor",
    "side": "PROTECTORS",
    "powerPrice": 880,
    "staminaPrice": 1080,
    "agilityPrice": 1100,
    "minPower": 20,
    "maxPower": 70,
    "minStamina": 20,
    "maxStamina": 70,
    "minAgility": 20,
    "maxAgility": 70,
    "available": false,
  },
  {
    "name": "Thalix",
    "side": "PROTECTORS",
    "powerPrice": 2640,
    "staminaPrice": 3240,
    "agilityPrice": 3300,
    "minPower": 60,
    "maxPower": 100,
    "minStamina": 60,
    "maxStamina": 100,
    "minAgility": 60,
    "maxAgility": 100,
    "available": false,
  },
  {
    "name": "Exxiron",
    "side": "PROTECTORS",
    "powerPrice": 1760,
    "staminaPrice": 2160,
    "agilityPrice": 2200,
    "minPower": 40,
    "maxPower": 85,
    "minStamina": 40,
    "maxStamina": 85,
    "minAgility": 40,
    "maxAgility": 85,
    "available": false,
  },
];

export const Select = () => {
  const router = useRouter();
  const { user } = useContext(AppContext);
  const [userData, setUserData] = useState<UserInfoProps | undefined>(
    undefined
  );
  const [selected, setSelected] = useState(0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (user) {
      infoUser(user.id).then((data) => {
        setUserData(data);
      });
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
              onSlideChange={(swiper) => {
                setSelected(swiper.realIndex);
                setLocked(!robots[swiper.realIndex].available);
              }}
            >
              {robots.map((robot) => (
                <SwiperSlide key={robot.name}>
                  <div className={clsx(styles.select__robot)}>
                    {true && (
                      <Image
                        src="/icons/lock-icon.png"
                        width={60}
                        height={60}
                        alt="locked"
                        className={styles.select__robot_lock}
                      />
                    )}
                    {/* <video playsInline muted loop autoPlay>
                      <source
                        src={`/videos/${robot.side.toLocaleLowerCase()}-${
                          robot.name
                        }.webm`}
                        type="video/webm"
                      />
                    </video> */}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
      <div
        className={clsx(
          styles.select__footer,
          "fixed",
          locked && styles.select__footer_locked
        )}
      >
        <Button
          variant="outlined"
          size="medium"
          textColor="var(--button-bg-primary)"
          bgColor="var(--button-bg-primary)"
          onClick={() => {
            sessionStorage.setItem("boost", `${selected}`);
            router.replace("/boost");
          }}
          radius={0}
        >
          Upgrade
        </Button>
      </div>
    </div>
  );
};
