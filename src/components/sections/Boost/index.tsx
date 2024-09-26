"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Spacer } from "@/components";
import styles from "./style.module.scss";

const boosters = [
  {
    id: 1,
    mediaUrl: "/images/image-stub-2.jpg",
    power: 1000,
    agility: 1000,
    stamina: 1000,
  },
  {
    id: 2,
    mediaUrl: "/images/image-stub-2.jpg",
    power: 1500,
    agility: 900,
    stamina: 700,
  },
  {
    id: 3,
    mediaUrl: "/images/image-stub-2.jpg",
    power: 2000,
    agility: 1500,
    stamina: 750,
  },
];

export const Boost = () => {
  return (
    <div className={styles.boost}>
      <Swiper
        className={`${styles.boost__slider}`}
        modules={[Navigation]}
        slidesPerView={1}
        spaceBetween={16}
        navigation={{}}
        loop={true}
      >
        {boosters.map((boost) => (
          <SwiperSlide key={boost.id}>
            <div className={styles.boost__item}>
              <Spacer space={4} />
              <div className={styles.boost__media}>
                <Image src="/images/image-stub-2.jpg" fill alt="image" />
              </div>
              <div className={styles.boost__content}>
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
                              src={boost.mediaUrl}
                              width={32}
                              height={32}
                              alt="power"
                            />
                          </div>
                          <div>Power</div>
                          <div>
                            <Image
                              src="/icons/price-icon.svg"
                              width={36}
                              height={24}
                              alt="price"
                            />{" "}
                            {boost.power}
                          </div>
                        </div>
                        <div className={styles.boost__item_actions}>
                          <button type="button" onClick={() => {}}>
                            <Image
                              src="/icons/minus-icon.svg"
                              width={32}
                              height={32}
                              alt="minus"
                            />
                          </button>
                          <div>{2}</div>
                          <button type="button" onClick={() => {}}>
                            <Image
                              src="/icons/plus-icon.svg"
                              width={32}
                              height={32}
                              alt="plus"
                            />
                          </button>
                        </div>
                      </div>
                      <div className={styles.boost__item}>
                        <div className={styles.boost__item_stats}>
                          <div>
                            <Image
                              src="/icons/robot-agility-icon.svg"
                              width={32}
                              height={32}
                              alt="agility"
                            />
                          </div>
                          <div>Agility</div>
                          <div>
                            <Image
                              src="/icons/price-icon.svg"
                              width={36}
                              height={24}
                              alt="price"
                            />{" "}
                            {boost.agility}
                          </div>
                        </div>
                        <div className={styles.boost__item_actions}>
                          <button type="button" onClick={() => {}}>
                            <Image
                              src="/icons/minus-icon.svg"
                              width={32}
                              height={32}
                              alt="minus"
                            />
                          </button>
                          <div>{2}</div>
                          <button type="button" onClick={() => {}}>
                            <Image
                              src="/icons/plus-icon.svg"
                              width={32}
                              height={32}
                              alt="plus"
                            />
                          </button>
                        </div>
                      </div>
                      <div className={styles.boost__item}>
                        <div className={styles.boost__item_stats}>
                          <div>
                            <Image
                              src="/icons/robot-stamina-icon.svg"
                              width={32}
                              height={32}
                              alt="stamina"
                            />
                          </div>
                          <div>Stamina</div>
                          <div>
                            <Image
                              src="/icons/price-icon.svg"
                              width={36}
                              height={24}
                              alt="price"
                            />{" "}
                            {boost.stamina}
                          </div>
                        </div>
                        <div className={styles.boost__item_actions}>
                          <button type="button" onClick={() => {}}>
                            <Image
                              src="/icons/minus-icon.svg"
                              width={32}
                              height={32}
                              alt="minus"
                            />
                          </button>
                          <div>{2}</div>
                          <button type="button" onClick={() => {}}>
                            <Image
                              src="/icons/plus-icon.svg"
                              width={32}
                              height={32}
                              alt="plus"
                            />
                          </button>
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
    </div>
  );
};
