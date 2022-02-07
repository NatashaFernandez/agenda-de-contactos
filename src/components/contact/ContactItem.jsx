const ContactItem = ({contact, handlers}) => {

    const AvatarEmpty = (contact.name[0]+contact.lastName[0]).toUpperCase();

    return (
        <li key={contact.id} className="contact-item">
            <div className={`contact-item__media_avatar-icon${!contact.avatar && "--empty"}`}>{!contact.avatar?AvatarEmpty:contact.avatar}</div>
            <div className="contact-item__media-info_name"><h4>{`${contact.name} ${contact.lastName}`}</h4></div>
        </li>
    )
}

export default ContactItem;