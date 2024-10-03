import clsx from "clsx";
import styles from "./style.module.scss";

export const MediaPreview = ({
  children,
  className,
  bgColor,
}: {
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
}) => {
  return (
    <div
      className={clsx(styles.preview, className && className)}
      style={{ backgroundColor: clsx(bgColor && bgColor) }}
    >
      {children}
    </div>
  );
};
