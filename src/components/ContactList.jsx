import Contact from './Contact'

const ContactList = ({contacts, deleteContact }) => {
    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Contacto</th>
                    <th colSpan={2}>Acciones</th>
                </tr>
            </thead>
            <tbody>
            {
            contacts.map(contact => (
                <Contact contact={contact} deleteContact={deleteContact} key={contact.id} />
            ))
            }
            </tbody>
        </table>
        </>
    )
}
export default ContactList;