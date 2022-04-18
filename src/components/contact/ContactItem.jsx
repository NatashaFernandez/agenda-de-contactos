import { useState } from "react";
import { useEffect } from "react";

const ContactItem = ({
  contact,
  onTouch,
  isSelectionModeActive,
  onLongTouch,
  className,
}) => {
  const [isChecked, setChecket] = useState(false);

  const fireOnTouch = () => {
    if (isSelectionModeActive) {
      const check = !isChecked;
      setChecket(check);
      onLongTouch(contact, check);
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
    <li
      id={contact.id}
      onClick={fireOnTouch}
      className={`contact-item ${isSelectionModeActive ? className : ""}`}
    >
      <input
        type={"checkbox"}
        checked={isChecked}
        readOnly
        className={`contact-item_selector ${
          isSelectionModeActive ? "" : "is-not-visible"
        }`}
      />
      <img
        className="contact-item_avatar"
        src={contact.avatar.picture}
        alt=""
      />
      <h4 className="contact-item_info">{`${contact.name} ${contact.lastName}`}</h4>
    </li>
  );
};

export default ContactItem;
