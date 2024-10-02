"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, FormEvent, useContext, useRef } from "react";
import { useTelegram } from "@/providers/telegram";
import AppContext from "@/providers/context";
import { CropperBox, PhotoUploader, Spacer, Button, Side } from "@/components";
import { useDebounce } from "@/hooks";
import styles from "./style.module.scss";
import { readFile } from "@/helpers";
import { checkUserName, registerUser } from "@/api";
import { checkImageFileType } from "@/helpers";
import toast from "react-hot-toast";
import clsx from "clsx";
import { ForceSide, RegisterDataProps } from "@/Types";

export const Register = () => {
  const uploaderRef = useRef<any>(null);
  const { setLoading, setIsRegistered } = useContext(AppContext);
  const router = useRouter();
  const { user } = useTelegram();
  const [avatarModal, setAvatarModal] = useState(false);
  const [forceModal, setForceModal] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageFile, setImageFile] = useState<Blob>();
  const [croppedImageSrc, setCroppedImageSrc] = useState("");
  const [event, setEvent] = useState<React.ChangeEvent<HTMLInputElement>>();
  const [username, setUsername] = useState("");
  const debouncedUsername = useDebounce(username, 500);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessTextText] = useState("");

  const onFileChange = async (e: any) => {
    const imageTypes = ["jpg", "jpeg", "png", "webp", "ico"];
    const limitSize = 6291456;
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!checkImageFileType(file.type.toLowerCase(), imageTypes)) {
        toast.error("Image file must be jpg, jpeg, png, webp or ico", {
          id: "imageType",
        });
      } else if (file.size > limitSize) {
        toast.error("File size must be max 6mb", {
          id: "imageSize",
        });
        e.target.value = "";
      } else {
        setImageFile(file);
        let imageDataUrl = await readFile(file);
        setImageSrc(imageDataUrl as any);
        setEvent(e);
        setAvatarModal(true);
      }
    }
  };

  const handdleCroppedImage = (url: string) => {
    setCroppedImageSrc(url);
  };

  const triggerInput = () => {
    uploaderRef.current.click();
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (username.length >= 3 && username.length <= 15) {
      checkUserName(username).then((exists) => {
        if (exists) {
          setSuccessTextText("");
          setError(true);
          setErrorText("Crap! That username is not available");
        } else {
          setSuccessTextText("Great choice! That username is available");
          setError(false);
          setErrorText("");
        }
      });
    }
  }, [debouncedUsername]);

  const handleNickname = (value: string) => {
    setErrorText("");
    setError(true);
    const rex = /^[A-Za-z0-9 ]+$/;
    if (rex.test(value)) {
      setUsername(value);
    }
    if (value === "") setUsername("");
    if (value.length < 3 || value.length > 15) {
      setSuccessTextText("");
      setError(true);
      setErrorText(
        "User name length must be more than 3 and less than 15 symbols"
      );
    }
  };

  useEffect(() => {}, [imageSrc, croppedImageSrc]);

  const handleSubmit = (side: ForceSide) => {
    setLoading(true);
    const data: RegisterDataProps = {
      username: username,
      telegramId: user?.id,
      side,
    };

    if (imageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile as Blob);
      reader.onload = function () {
        const base64 = reader.result;
        data.avatar = base64 as string;

        registerUser(data).then(() => {
          setIsRegistered(true);
          router.replace("/");
        });
      };
    } else {
      registerUser(data).then(() => {
        setIsRegistered(true);
        router.replace("/");
      });
    }
  };

  return (
    <>
      <div className={styles.profile}>
        <form autoComplete="off">
          <input
            type="hidden"
            name="avatar"
            value={croppedImageSrc ? croppedImageSrc : ""}
          />
          <PhotoUploader
            url={croppedImageSrc}
            callBack={(e) => onFileChange(e)}
            ref={uploaderRef}
          />
          <div
            className={`form-control ${error ? "error" : ""} ${
              successText.length > 0 ? "success" : ""
            }`}
          >
            <input
              id="nickname"
              type="text"
              name="nickname"
              value={username}
              onChange={(e) => handleNickname(e.target.value)}
              placeholder="Enter your nickname"
            />
            {error && <span>{errorText}</span>}
            {successText.length > 0 && <span>{successText}</span>}
          </div>
          <Button
            className={clsx(styles.profile__submit, "fixed")}
            size="medium"
            variant="filled"
            bgColor={"var(--button-bg-primary)"}
            textColor={"var(--button-text-primary)"}
            disabled={error || username.length === 0}
            type="button"
            radius={0}
            onClick={() => setForceModal(true)}
          >
            Continue
          </Button>
        </form>
      </div>
      <div className={clsx(styles.modal, avatarModal && styles.modal_show)}>
        {imageSrc && (
          <>
            <Spacer space={40} />
            <h2>Crop Your Avatar</h2>
            <Spacer space={30} />
            <CropperBox
              event={event}
              applyHandler={handdleCroppedImage}
              cancelHandler={() => setAvatarModal(false)}
              selectHandler={() => triggerInput()}
              changeHandler={(e) => onFileChange(e)}
            />
          </>
        )}
      </div>
      <div
        className={clsx(
          styles.modal,
          styles.modal__force,
          forceModal && styles.modal_show
        )}
      >
        <Side callBack={(side) => handleSubmit(side)} />
      </div>
    </>
  );
};
