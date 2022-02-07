import ContactItem from './ContactItem'

const ContactList = ({contacts, deleteContact }) => {
    return (
        <>
            <ul className='contact-list'>
            {contacts.map(contactDetails => 
                <ContactItem key={contactDetails.id} contact={contactDetails} deleteContact={deleteContact}/>)
            }
            </ul>
        </>
    )
}
export default ContactList;