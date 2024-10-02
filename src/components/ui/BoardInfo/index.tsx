import styles from "./style.module.scss";

export const BoardInfo = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.boardinfo}>{children}</div>;
};
