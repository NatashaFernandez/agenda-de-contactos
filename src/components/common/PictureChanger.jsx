import { useState, useRef } from "react";
import OptionSelectDialog from "./OptionSelectDialog";
import Camera from "./Camera";
import cameraAdd from "../../assets/Icons/camera-add.svg";
import emptyContact from "../../assets/Images/grey-silhouette.png";
import Button from "./Button";

const createDefaultPicture = (altText) => {
  const colors = [
    "#00AA55",
    "#009FD4",
    "#B381B3",
    "#939393",
    "#E3BC00",
    "#D47500",
    "#DC2A2A",
  ];

  const randomColorIndex =
    altText
      .split("")
      .map((char) => char.charCodeAt(0))
      .join("") % colors.length;

  const canvas = document.createElement("canvas");
  const canvasContext = canvas.getContext("2d");

  canvas.width = 390;
  canvas.height = 390;

  canvasContext.fillStyle = colors[randomColorIndex];
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  canvasContext.font = "bold 200px Arial";
  canvasContext.fillStyle = "white";
  canvasContext.textAlign = "center";
  canvasContext.textBaseline = "middle";
  canvasContext.fillText(altText, 190, 200);

  return canvas.toDataURL("image/jpg");
};

const PictureChanger = ({ avatar, onSetPicture }) => {
  const ChangerInputRef = useRef(null);

  const [picture, setPicture] = useState(avatar.picture || emptyContact);
  const [shouldAskForUploadOrTake, setShouldAskForUploadOrTake] =
    useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [changerType, setChangerType] = useState(null);

  const changePicture = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2 /*DONE*/) {
        setPicture(reader.result);
        onSetPicture({ picture: reader.result, isDefault: false });
      }
    };
    const [file] = e.target.files;
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const toggleDialog = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.detail) {
      setChangerType(null);
      setShouldAskForUploadOrTake(!shouldAskForUploadOrTake);
    }
  };

  return (
    <>
      <div className="picture-changer">
        <img className="picture-changer_picture" src={picture} alt="" />
        <Button
          className="picture-changer_button"
          action={toggleDialog}
          icon={cameraAdd}
          tooltip="Cambiar imagen"
          toolTipDirection="bottom"
        />
        <input
          className="picture-changer_input"
          ref={ChangerInputRef}
          type="file"
          accept="jpg"
          onChange={(e) => changePicture(e)}
        />
      </div>

      {shouldAskForUploadOrTake && (
        <OptionSelectDialog
          title="Establecer la foto del contacto"
          onCancel={toggleDialog}
          optionList={[
            {
              displayName: "Subir una foto",
              onSelect: () => {
                setChangerType("GALERY");
                setShouldAskForUploadOrTake(false);
                ChangerInputRef.current.click();
              },
            },
            {
              displayName: "Tomar una foto",
              onSelect: () => {
                setChangerType("CAMERA");
                setShouldAskForUploadOrTake(false);
                setShowCamera(true);
              },
            },
          ]}
        />
      )}

      {changerType === "CAMERA" && showCamera && (
        <Camera
          onConfirmPicture={(capturedPicture) => {
            setPicture(capturedPicture);
            onSetPicture({ picture: capturedPicture, isDefault: false });
          }}
          onExitCamera={() => {
            setChangerType(null);
            setShowCamera(false);
          }}
        />
      )}
    </>
  );
};

PictureChanger.createDefaultPicture = createDefaultPicture;

export default PictureChanger;
