import editRegular from "../img/edit-regular.svg";
import trashSolid from "../img/trash-solid.svg"

const Contact = ({contact, deleteContact}) => {
    return (
        <>
            {      
            <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.lastName}</td>
                <td>{contact.phoneNumber}</td>
                <td>
                    <img src={editRegular} alt="" height={20} />
                </td>
                <td>
                    <img src={trashSolid} alt="" height={20}
                        onClick={() => deleteContact(contact.id)} />
                </td>
            </tr>
            }
        </>
    )
}
export default Contact;