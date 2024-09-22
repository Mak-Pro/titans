import Image from "next/image";
import { Board, Slot, TopControlArea, Spacer } from "@/components";
import styles from "./style.module.scss";

export const Account = () => {
  const url = "/images/profile-stub.jpg";

  return (
    <>
      <TopControlArea back />
      <div className={styles.account}>
        <Spacer space={20} />
        <div className={styles.account__uploader}>
          <div className={styles.account__uploader_picture}>
            {url ? (
              <Image src={url} fill alt="avatar" />
            ) : (
              <Image
                src={"/icons/camera-icon.svg"}
                width={40}
                height={40}
                alt="avatar"
              />
            )}
          </div>
          <button className={styles.account__uploader_btn} type="button">
            <Image
              src="/icons/pen-icon.svg"
              width={20}
              height={20}
              alt="edit"
            />{" "}
            Edit
          </button>
        </div>
        <h2 className={styles.account__title}>John Cee</h2>
        <div className={styles.account__list}>
          <Slot text="Slot: balance" alt />
          <Board
            avatar="/images/image-stub.jpg"
            position={1}
            title="Chapter 2"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
            type="alt"
          />
          <Slot text="Slot: Chapter" alt />
        </div>
      </div>
    </>
  );
};
