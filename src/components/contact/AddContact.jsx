import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactForm from "./ContactForm";
import PictureChanger from "../common/PictureChanger";
import { useContactsContext } from "../../context/UserContactsContext";

const AddContact = ({ addContact }) => {
  const navigate = useNavigate();
  const {contactActions } = useContactsContext();
  const [contact, setContact] = useState({
    avatar: { picture: "", isDefault: true },
    name: "",
    lastName: "",
    phoneNumber: "",
  });

  /**atributos del contacto a usar en el formulario*/
  const contactAttributes = {
    avatar: {
      getValue: () => contact.avatar.picture,
      setValue: (avatar) => setContact({ ...contact, avatar }),
      label: "Avatar",
      hasOwnControlInput: true,
    },
    name: {
      getValue: () => contact.name,
      setValue: (name) => setContact({ ...contact, name }),
      label: "Nombre",
    },
    lastName: {
      getValue: () => contact.lastName,
      setValue: (lastName) => setContact({ ...contact, lastName }),
      label: "Apellido",
    },
    phoneNumber: {
      getValue: () => contact.phoneNumber,
      setValue: (phoneNumber) => setContact({ ...contact, phoneNumber }),
      label: "Telefono",
    },
  };

  const saveContact = () => {
    const newContact = contact;
    if (contact.avatar.picture === "") {
      let AvatarLetters = contact.name || contact.lastName;
      if (AvatarLetters) {
        AvatarLetters = AvatarLetters[0].toUpperCase();
        const picture = PictureChanger.createDefaultPicture(AvatarLetters);
        newContact.avatar = { picture, isDefault: true };
      }
    }
    contactActions({ type: "ADD_CONTACT", payload: newContact });
    navigate(`/view/${contact.id}`, { replace: true });
  };

  return (
    <ContactForm
      title="Agregar contacto"
      contactAttributes={contactAttributes}
      onSubmitContact={saveContact}
      onCancelInteractios={() => navigate("/", { replace: true })}
    >
      <PictureChanger
        avatar={contact.avatar}
        onSetPicture={(avatar) => contactAttributes.avatar.setValue(avatar)}
      />
    </ContactForm>
  );
};

export default AddContact;
