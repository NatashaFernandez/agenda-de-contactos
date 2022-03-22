import React, { useState, useEffect } from "react";
import ContactItem from "./ContactItem";
import { useNavigate } from "react-router-dom";
import FloatingButton from "../common/FloatingButton";
import { useAppContext } from "../../context/AppContext";

const ContactList = ({ contacts, contactActions }) => {
  let navigate = useNavigate();
  const app = useAppContext();

  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const enterInSelectionMode = (contact) => {
    setSelectedContacts([...selectedContacts, contact]);
    setSelectionMode(true);
  };

  useEffect(() => {
    app.update({
      header: {
        navigation: {action: null, title: "Contactos"},
        toolbar: {
          promotedActions: [],
          menuActions: [
            {
              displayName: selectionMode
              ? "Cancelar selección"
              : "Modo Seleccion",
              execute: () => setSelectionMode(!selectionMode),
            },
          ],
        },
      },
    });
  }, [selectionMode]);

  /** Renderizar el contacto indicado
   *  @description Guarda en {@link touchedContact} el usuario que se toco e indica que hay que renderizar el componente */
  const renderTouchedContact = (contact) => {
    navigate(`view/${contact.id}`);
  };

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
