import React from 'react';
import { useState } from 'react';
import './App.css';
import AddContact from './components/contact/AddContact';
import Body from './components/common/Body';
import ContactList from './components/contact/ContactList'

function App() {
  const [contacts, setContacts] = useState([
    {id: "4e7d556c-72e4-44cc-b01b-40134d22f0a0", name: "Adrienne", lastName: "Hagenes", phoneNumber:"(135) 377-4251"},
    {id: "b65b5c71-8620-4fc5-ba03-75dc070a735f", name: "Mohamed", lastName: "Smitham", phoneNumber:"(109) 651-9982"},
    {id: "0bc52297-1404-4ed7-aaf1-caa25041cf61", name: "Kacey", lastName: "Beahan", phoneNumber:"024-494-9208"},
    {id: "765a6db1-80fc-4d6f-a00c-8037bc3a241d", name: "Darren", lastName: "Walker", phoneNumber:"(667) 240-1548"},
    {id: "a4f85ef7-bfe8-4df1-828f-f2a101e70cba", name: "Ila", lastName: "Schroeder", phoneNumber:"(797) 865-1316"},
    {id: "bd14787b-f06d-441d-8f99-639b0fa026f7", name: "Vaughn", lastName: "O'Conner", phoneNumber:"568-963-8182"},
    {id: "58cbd2ac-1e72-46ab-9679-b6765e3725c5", name: "Alessia", lastName: "Morissette", phoneNumber:"242-711-1867"},
    {id: "72bd8459-75dc-44c1-9dcb-2111a9c889a3", name: "Carlo", lastName: "Brown", phoneNumber:"368-697-7392"},
    {id: "a5327d1c-7ee3-4e56-b593-c56a587e57dc", name: "Raven", lastName: "Skiles", phoneNumber:"1-893-112-4060"},
    {id: "da6525c2-036a-4d52-b8e8-d535b6bfc6c6", name: "Logan", lastName: "Bailey", phoneNumber:"054-915-8442"},
    {id: "fed64245-fe28-4d4a-be1e-fdfadb9242f5", name: "Giovanna", lastName: "Towne", phoneNumber:"426-513-0548"},
    {id: "3b8a5e2a-392d-4a51-b952-20ceeb800e62", name: "Kiarra", lastName: "Welch", phoneNumber:"617-466-5886"},
    {id: "4cb398e2-2dcf-4117-a465-14272edee28d", name: "Hortense", lastName: "Barton", phoneNumber:"1-283-170-2188"},
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
      <Body className="app-body" onActionComponent={<AddContact addContact={addContact}/>}>
        <ContactList contacts={contacts} deleteContact={deleteContact}/>
      </Body>
    </>
  );
}

export default App;
