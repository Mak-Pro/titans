import clsx from "clsx";
import styles from "./style.module.scss";
import Schema from "@public/images/schema-overlay.svg";

interface NumberBadgeProps {
  number: number | string;
  borderColor?: string;
  bgColor?: string;
}

export const NumberBadge = ({
  number,
  borderColor,
  bgColor,
}: NumberBadgeProps) => {
  return (
    <div className={styles.badge}>
      <span
        className={styles.badge__border}
        style={{ backgroundColor: clsx(borderColor && borderColor) }}
      ></span>
      <span
        className={styles.badge__overlay}
        style={{
          backgroundColor: clsx(bgColor && bgColor),
          color: clsx(borderColor && borderColor),
        }}
      >
        <Schema />
      </span>
      <span className={styles.badge__text}>{number}</span>
    </div>
  );
};
