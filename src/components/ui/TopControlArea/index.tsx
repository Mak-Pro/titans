"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components";
import styles from "./style.module.scss";
import { TopControlAreaProps } from "@/Types";

export const TopControlArea = ({
  back,
  backHandler,
  children,
}: TopControlAreaProps) => {
  const router = useRouter();
  return (
    <div className={styles.top__area}>
      {back && (
        <Button
          className={styles.top__area_back}
          radius={0}
          onClick={() => {
            backHandler ? backHandler() : router.back();
          }}
        >
          <Image
            src="/icons/angle-left-icon.svg"
            width={24}
            height={24}
            alt="back"
          />
          Back
        </Button>
      )}
      {children && children}
    </div>
  );
};
