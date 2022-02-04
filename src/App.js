import React from 'react';
import { useState } from 'react';
import './App.css';
import AddContact from './components/AddContact';
import Header from './components/Header';
import ContactList from './components/ContactList'

function App() {
  const [contacts, setContacts] = useState([
    {id: 1, name: "Jose", lastName: "Perez", phoneNumber:"11 5555-5555"}
  ]);

  const deleteContact = id => {
    setContacts(contacts.filter((contact) => contact.id !== id))
  }

  const addContact = contact => {
    const id = Math.floor( Math.random()*1000) +1;
    const newContact = {id, ...contact}

    setContacts([...contacts, newContact]);
  }

  return(
    <>
      <Header/>
      <AddContact addContact={addContact}/>
      <ContactList contacts={contacts} deleteContact={deleteContact}/>
    </>
  );
}

export default App;
