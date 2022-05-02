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
  const contactsContextRef = useRef(useContactsContext());

  const [isSelectionModeActive, setSelectionMode] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const alphabet = useRef([]);
  const [onHeaderSearch, setOnHeaderSearch] = useState({
    query: "",
    isSearching: false,
    results: [],
  });

  const enterInSelectionMode = (contact, isChecked) => {
    if (isChecked) {
      if (!isSelectionModeActive) {
        setSelectionMode(true);
      }
      setSelectedContacts([...selectedContacts, contact]);
    } else {
      setSelectedContacts(
        selectedContacts.filter(({ id }) => id !== contact.id)
      );
    }
  };

  const withFullNameOrPhoneFilter = (contact, currentQuery) => {
    const { name, lastName, phoneNumber } = contact;
    const fullName = `${name} ${lastName}`.toLowerCase();

    if (fullName.includes(currentQuery.toLowerCase())) {
      return true;
    }

    if (phoneNumber.includes(currentQuery)) {
      return true;
    }

    return false;
  };

  const withFullNameAscSorting = (prev, curr) =>
    prev.name > curr.name ? 1 : prev.name < curr.name ? -1 : 0;

  useEffect(() => {
    appContextRef.current.update({
      header: {
        type: isSelectionModeActive ? "defaut" : "search",
        onSearch: (search) => {
          if (search.isSearching && search.query !== '') {
            if(search.query !== onHeaderSearch.query){
              const queryResult = contactsContextRef.current.contacts.filter((contact) =>
                withFullNameOrPhoneFilter(contact, search.query)
              );
              setOnHeaderSearch({
                ...search,
                results: queryResult,
              });
            }
          } else
            setOnHeaderSearch({
              isSearching: false,
              query: '',
              results: [],
            });
        },
        navigation: {
          action: isSelectionModeActive
            ? {
                displayName: `Cancelar seleccion`,
                icon: "cancel",
                execute: () => {
                  setSelectionMode(false);
                  setSelectedContacts([]);
                },
              }
            : null,
          title: !isSelectionModeActive
            ? "Contactos"
            : !selectedContacts.length
            ? "Seleccionar contactos"
            : `Se ${
                selectedContacts.length === 1 ? "seleccionó" : "seleccionaron"
              }  ${selectedContacts.length}`,
        },
        toolbar: {
          promotedActions: [
            isSelectionModeActive && selectedContacts.length
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
                    contactsContextRef.current.contactActions({
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
            !isSelectionModeActive
              ? {
                  displayName: "Seleccionar",
                  execute: () => {
                    setSelectedContacts([]);
                    setSelectionMode(true);
                  },
                }
              : null,
            selectedContacts.length !== contactsContextRef.current.length
              ? {
                  icon: "../../assets/Icons/select.svg",
                  displayName: "Seleccionar todos",
                  execute: () => {
                    if (!isSelectionModeActive) {
                      setSelectionMode(true);
                    }
                    setSelectedContacts(contactsContextRef.current.contacts);
                  },
                }
              : null,
          ],
        },
      },
    });
    // eslint-disable-next-line
  }, [isSelectionModeActive, selectedContacts]);

  return (
    <main className="app-main">
      <ul className="contact-list">
        {contactsContextRef.current.contacts.length >= 1 ? (
          // si esta buscando y hay algo para buscar entonces muestro los resultados
          (onHeaderSearch.isSearching &&
          onHeaderSearch.query !== ''
            ? onHeaderSearch.results
            : contactsContextRef.current.contacts
          ) // del array resutante ordeno por el nombre completo de forma acendente
            .sort(withFullNameAscSorting)
            .map((contact, index) => {
              // inicializo el array de letras del alfabeto en el primer mapeo
              if (index === 0) {
                alphabet.current.length = 0;
              }
              // tomo la letra del contacto actual
              let currentLetter = contact.name[0];
              let type = "";
              // si no incluye la letra la incluyo e indico que es la primera
              if (!alphabet.current.includes(currentLetter)) {
                type = "--is-first"; // el elemento con esta clase se muestra
                alphabet.current.push(currentLetter);
              }
              // compruebo si el contacto actual esta entre los seleccionados
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
                      if (isSelectionModeActive) {
                        enterInSelectionMode(contact, !isSelected);
                      } else navigate(`view/${contact.id}`);
                    }}
                    isSelected={isSelected}
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
