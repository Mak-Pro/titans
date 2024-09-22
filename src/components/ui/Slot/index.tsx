import Image from "next/image";
import styles from "./style.module.scss";
import { SlotProps } from "@/Types";
import clsx from "clsx";

export const Slot = ({ icon, text, alt }: SlotProps) => {
  return (
    <div className={clsx(styles.slot, alt && styles.slot__alt)}>
      <div className={styles.slot__inner}>
        <div className={styles.slot__icon}>
          <Image
            src={icon ? icon : "/icons/empty-icon.svg"}
            width={24}
            height={24}
            alt="icon"
          />
        </div>
        {text && <div className={styles.slot__text}>{text}</div>}
      </div>
    </div>
  );
};
