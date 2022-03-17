import React, { useState, useReducer } from "react";
import "./App.css";
import ContactList from "../contact/ContactList";
import ContactDetail from "../contact/ContactDetail";
import ContactActionsReducer from "../../context/ContactActionsReducer";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import Layout from "./Layout";
import AddContact from "../contact/AddContact";
import EditContact from "../contact/EditContact";

function App() {
  //titulo que se le envia al Header y seteador del titulo que se envian a los otros componentes
  const [title, setTitle] = useState("");

  /** Base de contactos y despachador de acciones
   * uso un useReducer para tener un estado donde guardar contactos y un despachador de acciones con el cual
   * poder realizar un ABM de contactos
   */
  const [contacts, dispathContactActions] = useReducer(ContactActionsReducer, [
    {
      id: "4e7d556c72e4",
      name: "Adrienne",
      lastName: "Hagenes",
      phoneNumber: "(135) 377-4251",
    },
    {
      id: "b65b5c718620",
      name: "Mohamed",
      lastName: "Smitham",
      phoneNumber: "(109) 651-9982",
    },
    {
      id: "0bc522971404",
      name: "Kacey",
      lastName: "Beahan",
      phoneNumber: "024-494-9208",
    },
    {
      id: "765a6db180fc",
      name: "Darren",
      lastName: "Walker",
      phoneNumber: "(667) 240-1548",
    },
    {
      id: "a4f85ef7bfe8",
      name: "Ila",
      lastName: "Schroeder",
      phoneNumber: "(797) 865-1316",
    },
    {
      id: "bd14787bf06d",
      name: "Vaughn",
      lastName: "O'Conner",
      phoneNumber: "568-963-8182",
    },
    {
      id: "58cbd2ac1e72",
      name: "Alessia",
      lastName: "Morissette",
      phoneNumber: "242-711-1867",
    },
    {
      id: "72bd845975dc",
      name: "Carlo",
      lastName: "Brown",
      phoneNumber: "368-697-7392",
    },
    {
      id: "a5327d1c7ee3",
      name: "Raven",
      lastName: "Skiles",
      phoneNumber: "1-893-112-4060",
    },
    {
      id: "da6525c2036a",
      name: "Logan",
      lastName: "Bailey",
      phoneNumber: "054-915-8442",
    },
    {
      id: "fed64245fe28",
      name: "Giovanna",
      lastName: "Towne",
      phoneNumber: "426-513-0548",
    },
    {
      id: "3b8a5e2a392d",
      name: "Kiarra",
      lastName: "Welch",
      phoneNumber: "617-466-5886",
    },
    {
      id: "4cb398e22dcf",
      name: "Hortense",
      lastName: "Barton",
      phoneNumber: "1-283-170-2188",
    }
  ]);

  const useContact = id => contacts.find(contacto => contacto.id === id)

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <ContactList
              contacts={contacts}
              titleSetter={setTitle}
              contactActions={dispathContactActions}
            />
          }
        />
        <Route
          exact
          path="view/:id"
          element={
            <ContactDetail
              titleSetter={setTitle}
              getContact={useContact}
              contacActions={dispathContactActions}
              onGoBack={() => console.log("atras")}
            />
          }
        />
        <Route
          exact
          path="add"
          element={
            <AddContact
              titleSetter={setTitle}
              addContact={dispathContactActions}
            />
          }
        />
      </Route>
      <Route
        exact
        path="edit/:id"
        element={
          <EditContact
            getContact={useContact}
            contactActions={dispathContactActions}
            titleSetter={setTitle}
          />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;