"use client";
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Dropzone from "react-dropzone";
import { Area } from "react-easy-crop";
import getCroppedImg from "./cropImage";

export const AvatarUploader = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

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
    };
  };

  const showCroppedImage = useCallback(async () => {
    if (imageSrc && croppedAreaPixels) {
      try {
        const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
        setCroppedImage(croppedImg);
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

      {imageSrc && (
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

      <button
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          color: "#fff",
          fontSize: "30px",
        }}
        onClick={showCroppedImage}
      >
        Обрезать
      </button>

      {croppedImage && (
        <div>
          <h2>Предпросмотр:</h2>
          <img
            src={croppedImage}
            alt="Cropped Avatar"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      )}
    </div>
  );
};

export default AvatarUploader;
