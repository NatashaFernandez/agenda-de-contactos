import React, { useState, useEffect, useRef } from "react";
import ContactItem from "./ContactItem";
import { useNavigate } from "react-router-dom";
import FloatingButton from "../common/FloatingButton";
import { useAppContext } from "../../context/AppContext";
import { useContactsContext } from "../../context/UserContactsContext";
import addContactIcon from "../../assets/Icons/person-add.svg";
import noContactsIcon from "../../assets/Images/no-contacts.png";
import trashIcon from "../../assets/Icons/trash-solid.svg";

const ContactList = () => {

  let navigate = useNavigate();
  const appContextRef = useRef(useAppContext());
  const {contacts, contactActions } = useContactsContext();

  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const alphabet = useRef([]);
  const [onHeaderSearch, setOnHeaderSearch] = useState({
    query: "",
    isSearching: false,
    results: [],
  });

  const enterInSelectionMode = (contact, isChecked) => {
    if (isChecked) {
      if (!selectionMode) {
        setSelectionMode(true);
      }
      setSelectedContacts([...selectedContacts, contact]);
    } else {
      setSelectedContacts(
        selectedContacts.filter(({ id }) => id !== contact.id)
      );
    }
  };

  const withFullNameOrPhoneFilter = ({ name, lastName, phoneNumber }) => {
    const fullName = `${name} ${lastName}`.toLowerCase();

    if (fullName.includes(onHeaderSearch.query.toLowerCase())) {
      return true;
    }

    if (phoneNumber.includes(onHeaderSearch.query)) {
      return true;
    }

    return false;
  };

  const withFullNameAscSorting = (prev, curr) =>
    prev.name > curr.name ? 1 : prev.name < curr.name ? -1 : 0;

  useEffect(() => {
    appContextRef.current.update({
      header: {
        type: selectionMode ? "defaut" : "search",
        onSearch: (search) => {
          if (search.isSearching && search.query) {
            const findedContacts = contacts.filter(withFullNameOrPhoneFilter);
            setOnHeaderSearch({ ...search, results: findedContacts });
          } else setOnHeaderSearch({ ...search, results: [] });
        },
        navigation: {
          action: selectionMode
            ? {
                displayName: `Cancelar seleccion`,
                icon: "cancel",
                execute: () => {
                  setSelectionMode(false);
                  setSelectedContacts([]);
                },
              }
            : null,
          title: !selectionMode
            ? "Contactos"
            : !selectedContacts.length
            ? "Seleccionar contactos"
            : `Se ${
                selectedContacts.length === 1 ? "seleccionó" : "seleccionaron"
              }  ${selectedContacts.length}`,
        },
        toolbar: {
          promotedActions: [
            selectionMode && selectedContacts.length
              ? {
                  icon: trashIcon,
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
                }
              : null,
          ],
          menuActions: [
            selectedContacts.length !== contacts.length
              ? {
                  icon: "../../assets/Icons/select.svg",
                  displayName: !selectionMode
                    ? "Seleccionar contactos"
                    : "Seleccionar todos",
                  execute: () => {
                    if (!selectionMode) {
                      setSelectedContacts([]);
                      setSelectionMode(true);
                    } else {
                      setSelectedContacts(contacts);
                    }
                  },
                }
              : null,
          ],
        },
      }
    });
  }, [selectionMode, selectedContacts, contacts]);

  return (
    <main className="app-main">
      <ul className="contact-list">
        {contacts.length >= 1 ? (
          (onHeaderSearch.isSearching && onHeaderSearch.query
            ? contacts.filter(withFullNameOrPhoneFilter)
            : contacts
          )
            .sort(withFullNameAscSorting)
            .map((contact, index) => {
              if (!index) {
                alphabet.current.length = index;
              }
              let currentLetter = contact.name[0];
              let type = "";
              if (!alphabet.current.includes(currentLetter)) {
                type = "--is-first";
                alphabet.current.push(currentLetter);
              }
              const isSelected = selectedContacts.find(
                ({ id }) => id === contact.id
              );

              return (
                <div
                  className="contact-list_item"
                  key={`${currentLetter}.${index}`}
                >
                  <div className={`contact-list_letter ${type}`}>
                    {currentLetter}
                  </div>
                  <ContactItem
                    key={contact.id}
                    contact={contact}
                    onTouch={() => {
                      if (selectionMode) {
                        enterInSelectionMode(contact, !isSelected);
                      } else navigate(`view/${contact.id}`);
                    }}
                    onLongTouch={enterInSelectionMode}
                    isSelected={isSelected}
                    isSelectionModeActive={selectionMode}
                    contactActions={contactActions}
                    matchQuery={onHeaderSearch.query}
                  />
                </div>
              );
            })
        ) : (
          /* hay que mostrar el empty state */
          <div className="contact-list_empty">
            <img src={noContactsIcon} alt="" />
            <span>No tienes contactos agendados</span>
          </div>
        )}
      </ul>
      <FloatingButton
        className="app-main_action"
        tooltip={"Agregar contacto"}
        urlToAction="add"
        img={addContactIcon}
      />
    </main>
  );
};

export default ContactList;
