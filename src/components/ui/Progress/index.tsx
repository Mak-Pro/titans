import Image from "next/image";
import styles from "./style.module.scss";
import { ProgressProps } from "@/Types";
import LightIcon from "@public/icons/light-side-icon.svg";
import DarkIcon from "@public/icons/dark-side-icon.svg";
import { numberFormatter } from "@/helpers";

export const Progress = ({ light = 450, dark = 300 }: ProgressProps) => {
  const lightPercent = (light / (light + dark)) * 100;
  const darkPercent = (dark / (light + dark)) * 100;

  return (
    <div className={styles.progress}>
      <div className={styles.progress__bar}>
        <span>PROGRESS OF WAR</span>
        <div className={styles.progress__bar_line}>
          <span style={{ width: `${lightPercent}%` }}></span>
          <span style={{ width: `${darkPercent}%` }}></span>
        </div>
      </div>
      <div className={styles.progress__ruler}>
        <Image src="/images/ruler.svg" width={358} height={16} alt="ruler" />
        <div className={styles.progress__ruler_points}>
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
      <div className={styles.progress__stats}>
        <div>
          <LightIcon />
          <span>{numberFormatter(light)} users</span>
        </div>
        <div>
          <DarkIcon />
          <span>{numberFormatter(dark)} users</span>
        </div>
      </div>
    </div>
  );
};
