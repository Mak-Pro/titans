"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import Schema from "@public/images/schema-overlay.svg";

interface SelectorProps {
  icon?: React.ReactNode;
  text?: string;
  color?: string;
}

export const Selector = ({ icon, text, color = "#5F676F" }: SelectorProps) => {
  return (
    <div className={styles.selector}>
      <span
        className={styles.selector__border}
        style={{ backgroundColor: color }}
      ></span>
      <div className={styles.selector__overlay} style={{ color: color }}>
        <Schema />
      </div>
      {icon && <div style={{ color: color }}>{icon}</div>}
      {text && (
        <span className={styles.selector__text} style={{ color: color }}>
          {text}
        </span>
      )}
    </div>
  );
};
