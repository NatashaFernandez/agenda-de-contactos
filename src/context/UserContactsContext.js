import {createContext, useContext} from "react";
import "./reducers/entities/types.js";

const ContactsContextValue = {
    contacts: [],
    contactActions: null,
    /** Obtiene un contacto que coincida con el Id
     * @param {string} id
     * @returns {Contact{*/
    getContact: (id) => {}
}

const UserContactsContext = createContext(ContactsContextValue);

const useContactsContext = () => useContext(UserContactsContext);

export default UserContactsContext;
export {useContactsContext};