"use client";
import Image from "next/image";
import { Button } from "@/components";
import styles from "./style.module.scss";
import clsx from "clsx";

export const Chapter = () => {
  return (
    <div className={styles.chapter}>
      <div className={styles.chapter__media}>
        <Image src={"/images/image-stub-2.jpg"} fill alt="media" />
      </div>
      <div className={styles.chapter__actions}>
        <Button
          variant="filled"
          size="medium"
          textColor="var(--button-text-primary)"
          bgColor="var(--button-bg-primary)"
          radius={0}
        >
          Play
        </Button>
        <Button
          variant="outlined"
          size="medium"
          textColor="var(--button-bg-primary)"
          bgColor="var(--button-bg-primary)"
          radius={0}
        >
          Upgrade
        </Button>
      </div>

      <div className={`${styles.chapter__content} title-list title-list-alt`}>
        <div className="title-list-header">
          <h6>SOL Titans: Echoes of the Lost</h6>
        </div>
        <div className={`${styles.chapter__content_body}  title-list-body`}>
          <h6>Premise</h6>

          <p>
            After a catastrophic plane crash over the Transantarctic Mountains,
            a lone survivor is saved by a shadowy organization known as the
            Obsidian Circle. This secret order has been active in society for
            centuries, guarding ancient knowledge and technology passed down
            from the Aeternum civilization. Their mission: to prepare for the
            return of the Xar'ul, a parasitic alien race that once ravaged the
            galaxy, draining entire worlds of their life force to sustain their
            existence. The Obsidian Circle takes the survivor to a hidden
            complex beneath the ice, where ancient Titans—colossal war machines
            created by the Aeternum—are buried. These Titans were designed to
            fend off the Xar'ul, who were nearly defeated by the Aeternum
            millennia ago. However, a few Xar'ul survivors escaped and have
            since wandered the galaxy in search of a way to reclaim their lost
            power. When the player, now aligned with the Obsidian Circle,
            activates the first Titan, a massive energy burst reverberates
            across space, alerting the Xar'ul to Earth’s location. Sensing an
            opportunity, the Xar'ul dispatch shapeshifters to Earth to confront
            the player, offering a chilling choice: join them in dominating the
            planet, or face annihilation. The player must decide whether to
            stand with the Obsidian Circle to protect humanity or betray them
            and align with the Xar'ul for power.
          </p>
        </div>
      </div>
    </div>
  );
};
