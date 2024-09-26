import Image from "next/image";
import { Button } from "@/components";
import styles from "./style.module.scss";
import { CardProps } from "@/Types";

export const Card = ({
  position,
  image,
  subtitle,
  title,
  text,
  button,
}: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__overlay}></div>
      {position && (
        <div className={styles.card__position}>
          {+position < 10 ? `0${position}` : position}
        </div>
      )}
      <div className={styles.card__image}>
        {image && <Image src={image} fill alt="image" />}
      </div>
      <div className={styles.card__content}>
        {subtitle && <span className={styles.card__subtitle}>{subtitle}</span>}
        {title && <h5 className={styles.card__title}>{title}</h5>}
        {text && (
          <p>
            Dive into the world of Titans and join the battle for supremacy.
            Collect, upgrade, and compete to become the ultimate champion!
          </p>
        )}
        {button && (
          <>
            {button.link && (
              <Button
                href={button.link}
                size="medium"
                variant="outlined"
                textColor="var(--button-bg-primary)"
                bgColor="var(--button-bg-primary)"
                radius={0}
                target="_self"
              >
                {button.text}
              </Button>
            )}
            {button.onClick && (
              <Button
                onClick={button.onClick}
                size="medium"
                variant="outlined"
                textColor="var(--button-bg-primary)"
                bgColor="var(--button-bg-primary)"
                radius={0}
                target="_self"
              >
                {button.text}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
