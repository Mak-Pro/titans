import Image from "next/image";
import styles from "./style.module.scss";
import { Selector } from "@/components";
import LightSideIcon from "@public/icons/light-side-icon.svg";
import DarkSideIcon from "@public/icons/dark-side-icon.svg";

export const Side = () => {
  return (
    <div className={styles.side}>
      <div className={styles.side__media}>
        <Image src={"/images/side-select-img.png"} fill alt="Select side" />
        <div className={styles.side__select}>
          <h2>Choose a side of force</h2>
          <p>It’s time to choose a side of force</p>
          <div className={styles.selectors}>
            <Selector icon={<LightSideIcon />} text="Light side" />
            <Selector icon={<DarkSideIcon />} text="Dark side" />
            {/* <button className={styles.selector}>
              <Image
                src={"/icons/light-side-icon.svg"}
                width={33}
                height={32}
                alt="Light side"
              />
              <span>Light Side</span>
            </button> */}
            {/* <button className={styles.selector}>


              <Image
                src={"/icons/dark-side-icon.svg"}
                width={33}
                height={32}
                alt="Dark side"
              />
              <span>Dark Side</span>
            </button> */}
          </div>
        </div>
      </div>

      <div className={styles.note}>
        <span>
          You will only be able to choose a side once! <br /> Each week, the
          side that has released the most SFORCE will receive an additional 20%
          of $FORCE
        </span>
      </div>

      <div className={styles.side__timer}></div>
    </div>
  );
};
