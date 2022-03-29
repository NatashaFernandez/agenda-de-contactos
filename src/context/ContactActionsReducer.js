/** Un Objeto Contacto
 * @typedef Contact
 * @property {number} id - identificador de un contacto
 * @property {string} name - nombre del contacto
 * @property {string} lastName - apellido del contacto
 * @property {string} phoneNumber - numero telefonico del contacto
 */

/**
 * @typedef ContactAction
 * @type {(
 *  {type:"ADD_CONTACT"|"DELETE_CONTACT"|"EDIT_CONTACT",payload:Contact}|
 *  {type:"DELETE_CONTACTS",payload:Contact[]}
 * )}
 */

/** Reducer para ser usado en un Hook useReducer de React y despachar acciones de AMB en contactos
 * @param {Contact[]} contactsState - estado de contactos es un array de {@link Contact Contactos}
 * @param {ContactAction} action - objeto enviado por un despachador de acciones
 * @returns Contact[]
 */
export default function ContactActionsReducer(contactsState, action){
  switch (action.type) {
    case "ADD_CONTACT":
      action.payload.id = Math.random().toString(36).slice(2);
      return [...contactsState, action.payload];

    case "DELETE_CONTACT":
      return contactsState.filter(({ id }) => id !== action.payload.id);

    case "DELETE_CONTACTS":
      const selectedContacts = action.payload;
      return contactsState.filter(contact => !selectedContacts.includes(contact));

    case "EDIT_CONTACT":
      const editedContact = action.payload;

      return contactsState.map(contac => {
        //reviso si el id del contacto actual es el mismo que el contacto editado
        if(contac.id === editedContact.id)
            return editedContact;

        return contac;
      })
    
    default:
      throw new Error("No existe accion para el tipo especificado");
  }
}