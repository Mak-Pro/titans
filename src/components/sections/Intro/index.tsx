import Image from "next/image";
import { Board, Button } from "@/components";
import styles from "./style.module.scss";

export const Intro = () => {
  return (
    <>
      <div className={styles.intro}>
        <div className={styles.intro__media}>
          <Image src="/images/intro-img-stub.png" fill alt="media" />
        </div>
        <div className={styles.intro__content}>
          <div className={styles.intro__chapters}>
            <Board
              type="alt"
              position={1}
              avatar="/images/image-stub.jpg"
              title="Titan1"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
              mainLink="/intro/Titan1"
            />
            <Board
              type="alt"
              position={2}
              avatar="/images/image-stub.jpg"
              title="Titan2"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
              mainLink="/intro/Titan2"
            />
            <Board
              type="alt"
              position={3}
              avatar="/images/image-stub.jpg"
              title="Titan3"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
              mainLink="/intro/Titan3"
            />
          </div>
        </div>
      </div>
      <div className={styles.intro__actions}>
        <Button
          size="medium"
          variant="filled"
          textColor="var(--button-text-primary)"
          bgColor="var(--button-bg-primary)"
          radius={0}
        >
          Skip
        </Button>
      </div>
    </>
  );
};
