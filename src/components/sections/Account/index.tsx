"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, FormEvent, useContext, useRef } from "react";
import { useTelegram } from "@/providers/telegram";
import AppContext from "@/providers/context";
import { CropperBox, PhotoUploader, Spacer, BoardInfo } from "@/components";
import styles from "./style.module.scss";
import { numberFormatter, readFile, checkImageFileType } from "@/helpers";
import { userAxios, infoUser } from "@/api";
import toast from "react-hot-toast";
import { UserInfoProps } from "@/Types";

export const Account = () => {
  const uploaderRef = useRef<any>(null);
  const { setLoading } = useContext(AppContext);
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
  };

  const triggerInput = () => {
    uploaderRef.current.click();
  };

  useEffect(() => {}, [imageSrc, croppedImageSrc]);

  useEffect(() => {
    if (user) {
      infoUser(user.id).then((data) => {
        setUserData(data);
        if (!data.avatarLink.includes("null") && !data.avatarLink !== null) {
          setCroppedImageSrc(data.avatarLink);
        } else {
          setCroppedImageSrc("/icons/spinner-color.svg");
        }
      });
    }
  }, [user]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const token = sessionStorage.getItem("token");
    const data = {
      telegramId: String(user?.id),
      avatar: "",
    };

    if (imageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile as Blob);
      reader.onload = function () {
        const base64 = reader.result;
        data.avatar = base64 as string;

        console.log(data.avatar);

        userAxios
          .post("/users", data)
          .then((response) => {
            const { status } = response;
            if (status === 200) router.replace("/");
          })
          .finally(() => setLoading(false));
      };
    } else {
      userAxios
        .post("/users", data)
        .then((response) => {
          console.log(response);

          const { status } = response;
          if (status === 200) router.replace("/");
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <>
      <div className={styles.account}>
        <form onSubmit={submitHandler} autoComplete="off">
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
        <h5 className={styles.account__robots_title}>Select Your Avatar</h5>
        <div className={styles.account__robots}>
          <div
            className={styles.account__robot}
            onClick={() => setCroppedImageSrc("/images/image-stub.jpg")}
          >
            <div className={styles.account__robot_title}>Name</div>
            <div className={styles.account__robot_avatar}>
              <Image src="/images/image-stub.jpg" fill alt="robot" />
            </div>
          </div>
          <div
            className={styles.account__robot}
            onClick={() => setCroppedImageSrc("/images/image-stub.jpg")}
          >
            <div className={styles.account__robot_title}>Name</div>
            <div className={styles.account__robot_avatar}>
              <Image src="/images/image-stub.jpg" fill alt="robot" />
            </div>
          </div>
          <div
            className={styles.account__robot}
            onClick={() => setCroppedImageSrc("/images/image-stub.jpg")}
          >
            <div className={styles.account__robot_title}>Name</div>
            <div className={styles.account__robot_avatar}>
              <Image src="/images/image-stub.jpg" fill alt="robot" />
            </div>
          </div>
          <div
            className={styles.account__robot}
            onClick={() => setCroppedImageSrc("/images/image-stub.jpg")}
          >
            <div className={styles.account__robot_title}>Name</div>
            <div className={styles.account__robot_avatar}>
              <Image src="/images/image-stub.jpg" fill alt="robot" />
            </div>
          </div>
        </div>
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
