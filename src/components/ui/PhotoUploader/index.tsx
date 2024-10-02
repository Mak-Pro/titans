"use client";
import { forwardRef } from "react";
import Image from "next/image";
import styles from "./style.module.scss";

interface PhotoUploaderProps {
  url: string;
  callBack: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PhotoUploader = forwardRef(
  ({ url, callBack }: PhotoUploaderProps, ref: any) => {
    return (
      <div className={styles.uploader}>
        <input type="file" onChange={callBack} accept="image/*" ref={ref} />
        <div className={styles.uploader__picture}>
          {url ? (
            <img
              src={url}
              alt="avatar"
              className={styles.uploader__picture_avatar}
            />
          ) : (
            <Image
              src={"/icons/camera-icon.svg"}
              width={40}
              height={40}
              alt="avatar"
            />
          )}
        </div>
        <button className={styles.uploader_btn} type="button">
          <Image src="/icons/pen-icon.svg" width={20} height={20} alt="edit" />{" "}
          Edit
        </button>
      </div>
    );
  }
);

PhotoUploader.displayName = "PhotoUploader";
