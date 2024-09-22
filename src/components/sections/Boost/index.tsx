"use client";
import Image from "next/image";
import { Spacer } from "@/components";
import styles from "./style.module.scss";

export const Boost = () => {
  return (
    <div className={styles.boost}>
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
                      src="/icons/robot-power-icon.svg"
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
                    1000
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
                      alt="power"
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
                    1000
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
                      alt="power"
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
                    1000
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
  );
};
