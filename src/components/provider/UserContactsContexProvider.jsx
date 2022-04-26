import { useReducer } from "react";
import ContactActionsReducer from "../../context/reducers/ContactActionsReducer";
import { useAuthUserContext } from "../../context/AuthentificatedUserContext";
import UserContactsContext from "../../context/UserContactsContext";

const UserContactsContextProvider = ({children}) => {
  const auth = useAuthUserContext();
  /** Base de contactos y despachador de acciones
   * uso un useReducer para tener un estado donde guardar contactos y un despachador de acciones con el cual
   * poder realizar un ABM de contactos
   */
  const [contacts, dispathContactActions] = useReducer(
      ContactActionsReducer,
      auth.user.contacts
    );
    
    return(
      <UserContactsContext.Provider value={{
        contacts: contacts,
        contactActions: (action) => {

          dispathContactActions({...action, afterResolve: (contacts) => {
            auth.userActionsDispatcher({type: "SAVE_USER_CONTACTS_DATA", payload: {
              ...auth.user,
              contacts: contacts
            }});
          }});
        },
        getContact: (id) => contacts.find((contacto) => contacto.id === id)
    }}>
      {children}
    </UserContactsContext.Provider>
    
  );
}

export default UserContactsContextProvider;