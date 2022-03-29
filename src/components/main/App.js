import React, { useReducer } from "react";
import "./App.css";
import ContactList from "../contact/ContactList";
import ContactDetail from "../contact/ContactDetail";
import ContactActionsReducer from "../../context/ContactActionsReducer";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import Layout from "./Layout";
import AddContact from "../contact/AddContact";
import EditContact from "../contact/EditContact";
import AppContexProvider from "../provider/AppContextProvider";
import contactsDemo from "../../assets/json/contacts-demo.json";

function App() {
  /** Base de contactos y despachador de acciones
   * uso un useReducer para tener un estado donde guardar contactos y un despachador de acciones con el cual
   * poder realizar un ABM de contactos
   */
  const [contacts, dispathContactActions] = useReducer(ContactActionsReducer, contactsDemo);

  const useContact = (id) => contacts.find((contacto) => contacto.id === id);

  return (
    <AppContexProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ContactList
                contacts={contacts}
                contactActions={dispathContactActions}
              />
            }
          />
          <Route
            exact
            path="view/:id"
            element={
              <ContactDetail
                getContact={useContact}
                contactActions={dispathContactActions}
                onGoBack={() => console.log("atras")}
              />
            }
          />
          <Route
            exact
            path="add"
            element={<AddContact addContact={dispathContactActions} />}
          />
          <Route
          exact
          path="edit/:id"
          element={
            <EditContact
              getContact={useContact}
              contactActions={dispathContactActions}
            />
          }
        />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppContexProvider>
  );
}

export default App;
