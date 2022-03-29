import { useState } from "react";
import { useEffect } from "react";

const ContactItem = ({
  contact,
  onTouch,
  isSelectionModeActive,
  onLongTouch,
}) => {
  let AvatarEmpty = "";

  const [isChecked, setChecket] = useState(false);
  if (contact.name.length) AvatarEmpty += contact.name.trim()[0].toUpperCase();
  if (contact.lastName.length)
    AvatarEmpty += contact.lastName.trim()[0].toUpperCase();

  const fireOnTouch = () => {
    if (isSelectionModeActive) {
      setChecket(!isChecked);
      onLongTouch(contact);
    } else {
      onTouch(contact);
      setChecket(false);
    }
  };

  useEffect(() => {
    if (!isSelectionModeActive) {
      setChecket(false);
    }

    return () => setChecket(false);
  }, [isSelectionModeActive]);

  return (
    <li id={contact.id} onClick={fireOnTouch} className="contact-item">
      <input
        type={"checkbox"}
        checked={isChecked}
        readOnly
        className={`contact-item_selector ${
          isSelectionModeActive ? "" : "is-not-visible"
        }`}
      />
      <div
        className={`contact-item__media__avatar-icon${
          !contact.avatar && "--empty"
        }`}
      >
        {!contact.avatar ? AvatarEmpty : contact.avatar}
      </div>
      <h4 className="contact-item__media-info_name">{`${contact.name} ${contact.lastName}`}</h4>
    </li>
  );
};

export default ContactItem;
