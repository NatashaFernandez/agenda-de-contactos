import { useEffect } from "react";

const ContactItem = ({ contact, onTouch, isSelectionModeActive }) => {
  let AvatarEmpty = "";

  if (contact.name.length) AvatarEmpty += contact.name.trim()[0].toUpperCase();
  if (contact.lastName.length)
    AvatarEmpty += contact.lastName.trim()[0].toUpperCase();

  const fireOnTouch = () => {
    onTouch(contact);
  };

  return (
    <li
      key={contact.id}
      id={contact.id}
      className="contact-item"
      onClick={fireOnTouch}
    >
      <input
        className={`contact-item__selector ${
          isSelectionModeActive ? "" : "is-not-visible"
        }`}
        type={"checkbox"}
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
