"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useTelegram } from "@/providers/telegram";
import {
  CropperBox,
  PhotoUploader,
  Spacer,
  BoardInfo,
  Preloader,
} from "@/components";
import styles from "./style.module.scss";
import { numberFormatter, readFile, checkImageFileType } from "@/helpers";
import { infoUser, updateUser } from "@/api";
import toast from "react-hot-toast";
import { UserInfoProps, TitanProps } from "@/Types";
import clsx from "clsx";

export const Account = () => {
  const uploaderRef = useRef<any>(null);
  const router = useRouter();
  const { user } = useTelegram();
  const [modal, setModal] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageFile, setImageFile] = useState<Blob>();
  const [croppedImageSrc, setCroppedImageSrc] = useState("");
  const [event, setEvent] = useState<React.ChangeEvent<HTMLInputElement>>();
  const [userData, setUserData] = useState<UserInfoProps | undefined>(
    undefined
  );
  const [titans, setTitans] = useState<TitanProps[]>([]);
  const [updating, setUpdating] = useState(false);

  const onFileChange = async (e: any) => {
    const imageTypes = ["jpg", "jpeg", "png", "webp", "ico"];
    const limitSize = 5242880;

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!checkImageFileType(file.type.toLowerCase(), imageTypes)) {
        toast.error("Image file must be jpg, jpeg, png, webp or ico", {
          id: "imageType",
        });
      } else if (file.size > limitSize) {
        toast.error("File size must be max 5mb", {
          id: "imageSize",
        });
      } else {
        setImageFile(file);
        let imageDataUrl = await readFile(file);
        setImageSrc(imageDataUrl as any);
        setEvent(e);
        setModal(true);
      }
    }
  };

  const handleCroppedImage = (url: string) => {
    setCroppedImageSrc(url);
    submitHandler();
  };

  const triggerInput = () => {
    uploaderRef.current.click();
  };

  useEffect(() => {}, [imageSrc, croppedImageSrc]);

  useEffect(() => {
    if (user) {
      infoUser(user.id).then((data: UserInfoProps) => {
        const allTitans = [{ ...data.currentTitan }, ...data.titans];
        setTitans(allTitans);

        setUserData(data);
        if (
          data.avatarLink &&
          !data.avatarLink.includes("null") &&
          !data.avatarLink !== null
        ) {
          setCroppedImageSrc(data.avatarLink);
        } else {
          setCroppedImageSrc("/icons/spinner-color.svg");
        }
      });
    }
  }, [user]);

  const submitHandler = async (url?: string) => {
    setUpdating(true);
    const data = {
      username: userData?.username,
      avatar: "",
    };

    if (url) {
      const base64url = await fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          return new Promise((res) => {
            reader.onloadend = () => {
              res(reader.result);
            };
          });
        });
      data.avatar = base64url as string;
      if (user) {
        updateUser(user.id, data).then((response) => {
          setUpdating(false);
          toast.success("The profile has been updated!", {
            id: "profile_update_1",
            position: "top-center",
          });
        });
      }
    }

    if (imageFile && !url) {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile as Blob);
      reader.onload = function () {
        const base64 = reader.result;
        data.avatar = base64 as string;
        if (user) {
          updateUser(user.id, data).then((response) => {
            setUpdating(false);
            toast.success("The profile has been updated!", {
              id: "profile_update_2",
              position: "top-center",
            });
          });
        }
      };
    }
  };

  return (
    <>
      {updating && <Preloader className={styles.account_preloader} />}
      <div className={styles.account}>
        <form autoComplete="off">
          <input
            type="hidden"
            name="avatar"
            value={croppedImageSrc ? croppedImageSrc : ""}
          />
          <Spacer space={70} />
          <PhotoUploader
            url={croppedImageSrc}
            callBack={(e) => onFileChange(e)}
            ref={uploaderRef}
          />
        </form>
        <h2 className={styles.account__name}>{userData?.username}</h2>
        <BoardInfo>
          <div className={styles.account__ballance}>
            <span className={styles.account__ballance_title}>Balance:</span>
            <div className={styles.account__ballance_value}>
              <Image
                src="/icons/coin-icon-alt.svg"
                width={40}
                height={40}
                alt="ballance"
              />{" "}
              {userData?.points && numberFormatter(userData?.points)}
            </div>
          </div>
        </BoardInfo>

        <Spacer space={24} />
        {titans.length > 0 && (
          <>
            <h5 className={styles.account__robots_title}>Select Your Avatar</h5>
            <div className={styles.account__robots}>
              {titans.map((titan, i) => (
                <div
                  key={titan.name}
                  className={clsx(
                    styles.account__robot,
                    !titan.available && styles.account__robot_locked
                  )}
                  onClick={() => {
                    setCroppedImageSrc(`/images/avatar-stub-${i + 1}.jpg`);
                    submitHandler(`/images/avatar-stub-${i + 1}.jpg`);
                  }}
                >
                  {!titan.available && (
                    <Image
                      src="/icons/lock-icon.svg"
                      width={40}
                      height={40}
                      alt="locked"
                      className={styles.account__robot_lock}
                    />
                  )}

                  <div className={styles.account__robot_title}>
                    {titan.name}
                  </div>
                  <div className={styles.account__robot_avatar}>
                    <Image
                      src={`/images/avatar-stub-${i + 1}.jpg`}
                      fill
                      alt={titan.name}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div
        className={`${styles.account__modal} ${
          modal ? styles.account__modal_show : ""
        }`}
      >
        {imageSrc && (
          <>
            <Spacer space={40} />
            <h2>Crop Your Avatar</h2>
            <Spacer space={30} />
            <CropperBox
              event={event}
              applyHandler={handleCroppedImage}
              cancelHandler={() => setModal(false)}
              selectHandler={() => triggerInput()}
              changeHandler={(e) => onFileChange(e)}
            />
          </>
        )}
      </div>
    </>
  );
};
