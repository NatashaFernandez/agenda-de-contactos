import React, { useState, useEffect, useRef } from "react";
import ContactItem from "./ContactItem";
import { useNavigate } from "react-router-dom";
import FloatingButton from "../common/FloatingButton";
import { useAppContext } from "../../context/AppContext";
import addContact from "../../assets/Icons/person-add.svg";
import noContactsICon from "../../assets/Images/no-contacts.png";

const ContactList = ({ contacts, contactActions }) => {
  let navigate = useNavigate();
  const appContextRef = useRef(useAppContext());

  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [onHeaderSearch, setOnHeaderSearch] = useState({
    query: "",
    isSearching: false,
    results: [],
  });

  const enterInSelectionMode = (contact, isChecked) => {
    if (isChecked) {
      setSelectionMode(true);
      setSelectedContacts([...selectedContacts, contact]);
    } else {
      setSelectedContacts(
        selectedContacts.filter(({ id }) => id !== contact.id)
      );
    }
  };

  const byFullNameOrPhone = ({ name, lastName, phoneNumber }) => {
    const fullName = `${name} ${lastName}`.toLowerCase();

    if (fullName.includes(onHeaderSearch.query.toLowerCase())) {
      return true;
    }

    if (phoneNumber.includes(onHeaderSearch.query)) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    appContextRef.current.update({
      header: {
        type: selectionMode ? "defaut":"search",
        onSearch: (search) => {
          console.log(search)
          if (search.isSearching && search.query) {
            const findedContacts = contacts.filter(byFullNameOrPhone);
            setOnHeaderSearch({ ...search, results: findedContacts });
          } else setOnHeaderSearch({ ...search, results: [] });
        },
        navigation: {
          action: selectionMode
          ?
            {
              displayName: `Cancelar seleccion`,
              icon: "cancel",
              execute: () => {
                setSelectionMode(false);
                setSelectedContacts([]);
              }
            }
          :null,
          title:
            selectionMode && selectedContacts.length
              ? `${selectedContacts.length} seleccionado${
                  selectedContacts.length > 1 ? "s" : ""
                }`
              : "Contactos",
        },
        toolbar: {
          promotedActions: [],
          menuActions: [
            {
              icon: "../../assets/Icons/select.svg",
              displayName: selectionMode
                ? "Cancelar selección"
                : "Seleccionar contactos",
              execute: () => {
                setSelectedContacts([]);
                setSelectionMode(!selectionMode);
              },
            },
            {
              icon: "",
              enabled: selectedContacts.length >= 1,
              hidden: selectedContacts.length < 1,
              displayName:
                selectedContacts.length === 1
                  ? "Eliminar Contacto"
                  : "Eliminar Contactos",
              useDialog: true,
              content: `¿Esta seguro que desea eliminar ${
                selectedContacts.length > 1
                  ? "los contactos seleccionados"
                  : "el contacto seleccionado"
              }?`,
              execute: () => {
                contactActions({
                  type: "DELETE_CONTACTS",
                  payload: selectedContacts,
                });
                setSelectedContacts([]);
                setSelectionMode(false);
              },
            },
          ],
        },
      },
    });
  }, [selectionMode, selectedContacts, contacts, contactActions]);

  return (
    <main className="app-main">
      <ul className="contact-list">
        {contacts.length >= 1 ? (
          (onHeaderSearch.isSearching && onHeaderSearch.query
            ? contacts.filter(byFullNameOrPhone)
            : contacts
          ).map((contact) => (
            <ContactItem
              className={
                selectionMode &&
                selectedContacts.find(({ id }) => id === contact.id)
                  ? "--is-selected"
                  : ""
              }
              key={contact.id}
              contact={contact}
              onTouch={() => navigate(`view/${contact.id}`)}
              onLongTouch={enterInSelectionMode}
              isSelectionModeActive={selectionMode}
              contactActions={contactActions}
            />
          ))
        ) : (
          /* hay que mostrar el empty state */ <div className="contact-list_empty">
            <img src={noContactsICon} alt="" />
            <span>No tienes contactos agendados</span>
          </div>
        )}
      </ul>
      <FloatingButton
        className="app-main_action"
        tooltip={"Agregar contacto"}
        urlToAction="add"
        img={addContact}
      />
    </main>
  );
};

export default ContactList;
