import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Dropzone from "react-dropzone";
import { Area } from "react-easy-crop";
import getCroppedImg from "./cropImage"; // Вспомогательная функция для получения обрезанного изображения

export const AvatarUploader: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(true); // Управляет отображением обрезки

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleImageUpload = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setIsCropping(true); // Сбрасываем состояние для повторной обрезки при загрузке нового изображения
    };
  };

  const showCroppedImage = useCallback(async () => {
    if (imageSrc && croppedAreaPixels) {
      try {
        const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
        setCroppedImage(croppedImg);
        setIsCropping(false); // Скрываем окно обрезки после обрезки
      } catch (e) {
        console.error(e);
      }
    }
  }, [imageSrc, croppedAreaPixels]);

  return (
    <div>
      <Dropzone onDrop={handleImageUpload} accept={{ "image/*": [] }}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Перетащите изображение сюда или кликните для загрузки</p>
          </div>
        )}
      </Dropzone>

      {imageSrc && isCropping && (
        <div
          className="crop-container"
          style={{ width: "300px", height: "300px" }}
        >
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round" // Указываем форму обрезки круга
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      )}

      {imageSrc && isCropping && (
        <button onClick={showCroppedImage}>Обрезать</button>
      )}

      {!isCropping && croppedImage && (
        <div>
          <h2>Предпросмотр:</h2>
          <img
            src={croppedImage}
            alt="Cropped Avatar"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
        </div>
      )}
    </div>
  );
};
