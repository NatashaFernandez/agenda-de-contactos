import ContactForm from "./ContactForm";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import BackButton from "../common/BackButton";

const EditContact = ({ contactActions, getContact }) => {
  const app = useAppContext();

  useEffect(() => {
    app.update({
      header: {
        navigation: {action: <BackButton/>, title: "Editar contacto"},
        toolbar: {
          promotedActions: [],
          menuActions: [],
        },
      }
    });
  }, []);

  let contactid = useParams("id");
  const [contact, setContact] = useState(getContact(contactid.id));

  const [name, setName] = useState(contact.name);
  const [lastName, setLastName] = useState(contact.lastName);
  const [phoneNumber, setPhoneNumber] = useState(contact.phoneNumber);

  /**atributos del contacto a usar en el formulario*/
  const contactAttributes = {
    name: {
      getValue: () => name,
      setValue: (newValue) => setName(newValue),
      label: "Nombre",
    },
    lastName: {
      getValue: () => lastName,
      setValue: (newValue) => setLastName(newValue),
      label: "Apellido",
    },
    phoneNumber: {
      getValue: () => phoneNumber,
      setValue: (newValue) => setPhoneNumber(newValue),
      label: "Telefono",
    },
  };

  /**Obtiene las entries del objeto {@linkcode contactAttributes} */
  const getContactAttributesCollection = () =>
    Object.entries(contactAttributes);

  /**genera un contacto con los nombres de attributos para un contacto y sus valores y lo guarda en la lista*/
  const saveContact = () => {
    //reducir los atributos de la coleccion a un objeto contacto de clave-valor para ser añadido a la lista
    const editedContact = getContactAttributesCollection().reduce(
      (contact, [attributeName, attribute]) => {
        contact[attributeName] = attribute.getValue();
        return contact;
      },
      {}
    );

    editedContact.id = contact.id;
    contactActions({ type: "EDIT_CONTACT", payload: editedContact });
  };

  return (
    <ContactForm
      title="Editar contacto"
      contactAttributes={getContactAttributesCollection()}
      onSubmitContact={saveContact}
    />
  );
};

export default EditContact;
