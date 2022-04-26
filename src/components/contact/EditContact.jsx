import { useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import ContactForm from "./ContactForm";
import PictureChanger from "../common/PictureChanger";
import { useContactsContext } from "../../context/UserContactsContext";

const EditContact = () => {
  let contactid = useParams("id");
  const { contactActions, getContact } = useContactsContext();
  const navigate = useNavigate();
  const [contact, setContact] = useState(getContact(contactid.id));

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
    const editedContact = contact;
    if (contact.avatar.picture === "" || contact.avatar.isDefault) {
      let AvatarLetters = contact.name || contact.lastName;
      if (AvatarLetters) {
        AvatarLetters = AvatarLetters[0].toUpperCase();
        const picture = PictureChanger.createDefaultPicture(AvatarLetters);
        editedContact.avatar = { picture, isDefault: true };
      }
    }
    contactActions({ type: "EDIT_CONTACT", payload: contact });
    navigate(`/view/${contact.id}`, { replace: true });
  };

  return (
    <>
      {!contact ? (
        <Navigate to="/" replace />
      ) : (
        <main className="app-main">
          <ContactForm
            title="Editar contacto"
            contactAttributes={contactAttributes}
            onSubmitContact={saveContact}
            onCancelInteractios={() =>
              navigate(`/view/${contact.id}`, { replace: true })
            }
          >
            <PictureChanger
              avatar={contact.avatar}
              onSetPicture={(newAvatar) =>
                contactAttributes.avatar.setValue(newAvatar)
              }
            />
          </ContactForm>
        </main>
      )}
    </>
  );
};

export default EditContact;
