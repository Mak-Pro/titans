"use client";
import { useState, ReactNode } from "react";
import clsx from "clsx";
import styles from "./style.module.scss";

interface TabProps {
  label: string;
  children: ReactNode;
}

interface TabsProps {
  children: React.ReactElement<TabProps>[];
}

export const Tabs = ({ children }: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className={styles.tabs}>
      <div className={styles.tabs__controls}>
        {children.map((tab, index) => (
          <button
            key={index}
            className={clsx(
              styles.tabs__control,
              index === activeIndex && styles.tabs__control_active
            )}
            onClick={() => handleTabClick(index)}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div className={styles.tabs__content}>{children[activeIndex]}</div>
    </div>
  );
};

export const Tab = ({ children }: TabProps) => {
  return <div className={styles.tabs__panel}>{children}</div>;
};
