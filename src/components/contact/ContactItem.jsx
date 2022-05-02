import ItemResult from "../common/ItemResult";

const ContactItem = ({
  contact,
  onTouch,
  isSelected,
  matchQuery,
}) => {
  let fullName = `${contact.name} ${contact.lastName}`;
  let info = matchQuery && matchQuery.match(/\d+/)? contact.phoneNumber:fullName;

  return (
    <li
      id={contact.id}
      onClick={() => onTouch(contact)}
      className={`contact-item ${isSelected ? "--is-selected" : ""}`}
    >
      <img
        className="contact-item_avatar"
        src={contact.avatar.picture}
        alt=""
      />
      <h4 className="contact-item_info">
        {!matchQuery ? (
          fullName
        ) : (
          <ItemResult
            info={info} 
            matchQuery={matchQuery}
            defaultInfo={fullName}/>
        )}
      </h4>
    </li>
  );
};

export default ContactItem;
