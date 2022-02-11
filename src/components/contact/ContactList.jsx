import React, {useState ,useEffect} from 'react';
import ContactItem from './ContactItem'
import ContactDetail from './ContactDetail';
import AddContact from './AddContact';
import Body from '../common/Body';
import goBackIcon from "../../img/go-back.svg";

const ContactList = ({ contacts, titleSetter, contactActions}) => {
    const [shouldRenderTouchedContact, renderTouchedComponentView] = useState(false);
    const [touchedContact, selectContact] = useState(null);
    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedContacts, setSelectedContacts] = useState([]);

    useEffect(() => {
        if (!shouldRenderTouchedContact)
            titleSetter("Contactos");
    })

    const enterInSelectionMode = (contact) => {
        setSelectedContacts([...selectedContacts, contact]);
        setSelectionMode(true);
    }

    /** Renderizar el contacto indicado
     *  @description Guarda en {@link touchedContact} el usuario que se toco e indica que hay que renderizar el componente */
    const renderTouchedContact = (contact) => {
        selectContact(contact)
        renderTouchedComponentView(true);
    }

    const goBack = () => {
        selectContact(null);//limpio el contacto seleccionado
        renderTouchedComponentView(false);//indico que no hay que renderizae un contacto
    }

    return (
        <>
            {shouldRenderTouchedContact ? // si hay que renderizar un contacto indicado
                <>
                    <button className="body__go-back-btn" onClick={goBack}>
                        <img src={goBackIcon} alt="" />
                    </button>
                    <ContactDetail titleSetter={titleSetter} contact={touchedContact} contacActions={contactActions} />
                </>
            /*caso contrario se listan todos los contactos*/ :
                <Body className="app-body" onActionComponent={
                    <AddContact titleSetter={titleSetter} addContact={contactActions} />
                }>
                    <ul className='contact-list'>
                        {contacts.map(contactDetails =>
                            <ContactItem key={contactDetails.id} contact={contactDetails}
                                onTouch={renderTouchedContact}
                                onLongTouch={enterInSelectionMode} isSelectionModeActive={selectionMode} />
                        )}
                    </ul>
                </Body>
            }
        </>
    );
}

export default ContactList;