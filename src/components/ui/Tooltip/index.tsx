import Image from "next/image";
import clsx from "clsx";
import styles from "./style.module.scss";

export const Tooltip = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx(styles.tooltip, className && className)}>
      <Image
        src={"/images/tooltip-overlay.svg"}
        fill
        alt="overlay"
        className={styles.tooltip__overlay}
      />
      <div className={styles.tooltip__content}>{children}</div>
    </div>
  );
};
