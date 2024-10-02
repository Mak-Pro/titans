"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTelegram } from "@/providers/telegram";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Spacer, Button, UserBar } from "@/components";
import styles from "./style.module.scss";
import { titansUser, titanUpdate } from "@/api";
import { TitanProps, TitanAttributes } from "@/Types";
import clsx from "clsx";

export const Boost = () => {
  const { user } = useTelegram();
  const [titans, setTitans] = useState<TitanProps[] | undefined>(undefined);
  const [points, setPoints] = useState(null);

  const getBoostData = () => {
    if (user) {
      titansUser(user.id).then((data) => {
        const { userPoints, currentTitan, titans } = data;
        setPoints(userPoints);
        const allTitans: TitanProps[] | undefined = [
          { ...currentTitan },
          ...titans,
        ];
        setTitans(allTitans);
      });
    }
  };

  useEffect(() => {
    getBoostData();
  }, [user]);

  const update = (attribute: TitanAttributes, titanId: number) => {
    titanUpdate(titanId, { attribute }).then((data) => {
      console.log(data);
      getBoostData();
    });
  };

  return (
    <>
      <UserBar points={points} />
      <div className={styles.boost}>
        {titans && titans?.length > 0 && points && (
          <Swiper
            className={`${styles.boost__slider}`}
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={16}
            navigation={{}}
            loop={true}
          >
            {titans.map((titan) => (
              <SwiperSlide key={titan.name}>
                <div
                  className={clsx(
                    styles.boost__item,
                    !titan.available && styles.boost__item_inactive
                  )}
                >
                  <Spacer space={4} />
                  <div
                    className={clsx(
                      styles.boost__media,
                      !titan.available && styles.boost__media_inactive
                    )}
                  >
                    <Image src="/images/image-stub-2.jpg" fill alt="image" />
                    {!titan.available && (
                      <Image
                        src="/icons/lock-icon.svg"
                        width={82}
                        height={82}
                        alt="locked"
                        className={styles.boost__media_lock}
                      />
                    )}
                  </div>
                  <div
                    className={clsx(
                      styles.boost__content,
                      !titan.available && styles.boost__content_inactive
                    )}
                  >
                    <div className={`title-list`}>
                      <div className="title-list-header">
                        <h6>Character Boost</h6>
                      </div>
                      <div className="title-list-body">
                        <div className={styles.boost__items}>
                          <div className={styles.boost__item}>
                            <div className={styles.boost__item_stats}>
                              <div>
                                <Image
                                  src="/icons/robot-power-icon.svg"
                                  width={32}
                                  height={32}
                                  alt="power"
                                />
                                Power
                              </div>
                              <div>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  textColor="var(--button-bg-primary)"
                                  radius={0}
                                  onClick={() =>
                                    update("POWER", titan.id as number)
                                  }
                                  disabled={
                                    titan.powerPrice >= points ||
                                    titan.power === titan.maxPower
                                  }
                                >
                                  <Image
                                    src="/icons/coin-icon-alt.svg"
                                    width={16}
                                    height={16}
                                    alt="price"
                                  />
                                  {titan.powerPrice}
                                </Button>
                              </div>
                              <div className={styles.boost__item_progress}>
                                <span
                                  className={styles.boost__item_progress_text}
                                >
                                  {titan.power}/{titan.maxPower} lvl
                                </span>
                                <span
                                  className={styles.boost__item_progress_bar}
                                  style={{
                                    width: `${
                                      (titan.power / titan.maxPower) * 100
                                    }%`,
                                  }}
                                ></span>
                              </div>
                            </div>
                          </div>
                          <div className={styles.boost__item}>
                            <div className={styles.boost__item_stats}>
                              <div>
                                <Image
                                  src="/icons/robot-agility-icon.svg"
                                  width={32}
                                  height={32}
                                  alt="power"
                                />
                                Agility
                              </div>
                              <div>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  textColor="var(--button-bg-primary)"
                                  radius={0}
                                  onClick={() =>
                                    update("AGILITY", titan.id as number)
                                  }
                                  disabled={
                                    titan.agilityPrice >= points ||
                                    titan.agility === titan.maxAgility
                                  }
                                >
                                  <Image
                                    src="/icons/coin-icon-alt.svg"
                                    width={16}
                                    height={16}
                                    alt="price"
                                  />
                                  {titan.agilityPrice}
                                </Button>
                              </div>
                              <div className={styles.boost__item_progress}>
                                <span
                                  className={styles.boost__item_progress_text}
                                >
                                  {titan.agility}/{titan.maxAgility} lvl
                                </span>
                                <span
                                  className={styles.boost__item_progress_bar}
                                  style={{
                                    width: `${
                                      (titan.agility / titan.maxAgility) * 100
                                    }%`,
                                  }}
                                ></span>
                              </div>
                            </div>
                          </div>
                          <div className={styles.boost__item}>
                            <div className={styles.boost__item_stats}>
                              <div>
                                <Image
                                  src="/icons/robot-stamina-icon.svg"
                                  width={32}
                                  height={32}
                                  alt="power"
                                />
                                Stamina
                              </div>
                              <div>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  textColor="var(--button-bg-primary)"
                                  radius={0}
                                  onClick={() =>
                                    update("STAMINA", titan.id as number)
                                  }
                                  disabled={
                                    titan.staminaPrice >= points ||
                                    titan.stamina === titan.maxStamina
                                  }
                                >
                                  <Image
                                    src="/icons/coin-icon-alt.svg"
                                    width={16}
                                    height={16}
                                    alt="price"
                                  />
                                  {titan.staminaPrice}
                                </Button>
                              </div>
                              <div className={styles.boost__item_progress}>
                                <span
                                  className={styles.boost__item_progress_text}
                                >
                                  {titan.stamina}/{titan.maxStamina} lvl
                                </span>
                                <span
                                  className={styles.boost__item_progress_bar}
                                  style={{
                                    width: `${
                                      (titan.stamina / titan.maxStamina) * 100
                                    }%`,
                                  }}
                                ></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Spacer space={10} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
};
