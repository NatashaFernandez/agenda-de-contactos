import Body from "../common/Body";
import EditContact from "./EditContact";
import React, { useEffect } from "react";

const ContactDetail = ({ contact, titleSetter, contacActions }) => {
  useEffect(() => {
    titleSetter("Contacto");
  });

  return (
    <Body
      className="contact-detail"
      onActionComponent={
        <EditContact
          contact={contact}
          contacActions={contacActions}
          titleSetter={titleSetter}
        />
      }
    >
      <section className="contact-detail__media">
        <span className="contact-detail__media__avatar--empty">{`${contact.name[0].toUpperCase()}${contact.lastName[0].toUpperCase()}`}</span>
        <h2 className="contact-detail__media__fullname">{`${contact.name.toUpperCase()} ${contact.lastName.toUpperCase()}`}</h2>
      </section>
      <section className="contact_info">
        <p>{contact.phoneNumber}</p>
      </section>
    </Body>
  );
};

export default ContactDetail;
