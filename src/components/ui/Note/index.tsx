import Image from "next/image";
import styles from "./style.module.scss";

export const Note = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.note}>
      <Image
        src="/images/line-overlay.png"
        fill
        alt="overlay"
        className={styles.note__overlay}
      />
      {children}
    </div>
  );
};
