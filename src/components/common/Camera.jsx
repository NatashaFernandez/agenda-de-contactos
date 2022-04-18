import { useRef, useEffect, useState } from "react";
import cancelIcon from "../../assets/Icons/cancel.svg";
import checkIcon from "../../assets/Icons/check.svg";
import repeatIcon from "../../assets/Icons/repeat.svg";
import Button from "../common/Button";

const Camera = ({ onConfirmPicture, onExitCamera }) => {
  const [hasPicture, setHasPicture] = useState(false);
  const [cameraIsOn, setCameraIsOn] = useState(false);
  const videoReference = useRef();
  const canvasReference = useRef();

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 390, height: 390 } })
      .then((stream) => {
        videoReference.current.srcObject = stream;
        videoReference.current.play();
        setCameraIsOn(true);
      })
      .catch(console.error);
  };

  const stopCamera = () => {
    if (!hasPicture) {
      const stream = videoReference.current.srcObject;
      const tracks = stream.getTracks();
      tracks.map((track) => track.stop());
      setCameraIsOn(false);
      videoReference.current.srcObject = undefined;
    }
  };

  const takePhoto = () => {
    canvasReference.current.width = 390;
    canvasReference.current.height = 390;

    const canvasContext = canvasReference.current.getContext("2d");
    canvasContext.drawImage(videoReference.current, 0, 0, 390, 390);
    setHasPicture(true);
    stopCamera();
  };

  const discardPhoto = () => {
    const canvasContext = canvasReference.current.getContext("2d");
    canvasContext.clearRect(0, 0, 390, 390);
    setHasPicture(false);
  };

  useEffect(() => {
    if (!hasPicture) {
      startCamera();
    }
  }, [videoReference, hasPicture]);

  return (
    <>
      <section className="camera-photo">
        <canvas
          className={`camera-photo_canvas ${!hasPicture ? "--hidden" : ""}`}
          ref={canvasReference}
        ></canvas>
        <video
          className={`camera-photo_taker ${hasPicture ? "--hidden" : ""}`}
          ref={videoReference}
        ></video>
        <div className="camera-photo_controls">
          <Button
            className="camera-photo_cancel"
            icon={cancelIcon}
            tooltip="Cancelar captura"
            toolTipDirection="top-right"
            action={(e) => {
              e.preventDefault();
              stopCamera();
              onExitCamera();
            }}
          />
          <Button
            className="camera-photo_capturer"
            disabled={!cameraIsOn && !hasPicture}
            tooltip={hasPicture ? "Tomar otra" : ""}
            toolTipDirection="top"
            action={(e) => {
              e.preventDefault();
              if (!hasPicture) {
                takePhoto();
              } else {
                discardPhoto();
              }
            }}
            icon={hasPicture ? repeatIcon : ""}
          />
          <Button
            className={`camera-photo_check ${
              !hasPicture ? "--visibility-hidden" : ""
            }`}
            icon={checkIcon}
            tooltip="Confirmar foto"
            toolTipDirection="top-left"
            action={(e) => {
              e.preventDefault();
              onConfirmPicture(canvasReference.current.toDataURL("image/jpg"));
              onExitCamera();
            }}
          />
        </div>
      </section>
    </>
  );
};

export default Camera;
