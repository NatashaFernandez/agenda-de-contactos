import React, { useState } from "react";
import ContactItem from "./ContactItem";
import { useNavigate } from "react-router-dom";
import FloatingButton from "../common/FloatingButton";

const ContactList = ({ contacts, titleSetter, contactActions }) => {
  let navigate = useNavigate();
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const enterInSelectionMode = (contact) => {
    setSelectedContacts([...selectedContacts, contact]);
    setSelectionMode(true);
  };
  /** Renderizar el contacto indicado
   *  @description Guarda en {@link touchedContact} el usuario que se toco e indica que hay que renderizar el componente */
  const renderTouchedContact = (contact) => {
    navigate(`view/${contact.id}`);
  };

  /*   const goBack = () => {
    selectContact(null); //limpio el contacto seleccionado
    renderTouchedComponentView(false); //indico que no hay que renderizae un contacto
  }; */

  return (
    <>
      <ul className="contact-list">
        {contacts.map((contactDetails) => (
          <ContactItem
            key={contactDetails.id}
            contact={contactDetails}
            onTouch={renderTouchedContact}
            onLongTouch={enterInSelectionMode}
            isSelectionModeActive={selectionMode}
          />
        ))}
      </ul>
      <FloatingButton urlToAction="add" />
    </>
  );
};

export default ContactList;
