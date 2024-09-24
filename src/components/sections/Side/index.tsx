import Image from "next/image";
import styles from "./style.module.scss";
import { Selector, Note, Spacer, CountdownTimer, Progress } from "@/components";
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
            <Selector
              icon={<LightSideIcon />}
              text="Light side"
              color="var(--button-bg-primary)"
            />
            <Selector
              icon={<DarkSideIcon />}
              text="Dark side"
              color="var(--orange-5)"
            />
          </div>
        </div>
      </div>
      <Spacer space={16} />
      <Note>
        <p>
          You will only be able to choose a side once! <br /> Each week, the
          side that has released the most SFORCE will receive an additional 20%
          of $FORCE
        </p>
      </Note>
      <Spacer space={20} />

      <CountdownTimer note="This battle will end in" showSeconds={false} />

      <Spacer space={12} />

      <Note>
        <p>
          Each week, the side that has released the most force will receive an
          additional 20% of force
        </p>
      </Note>
      <Spacer space={12} />
      <Progress light={270000} dark={450000} />
    </div>
  );
};
