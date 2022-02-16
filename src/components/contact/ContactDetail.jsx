import Body from "../common/Body";
import EditContact from "./EditContact";
import React, { useEffect } from "react";
import goBackIcon from "../../img/go-back.svg";
import messageIcon from "../../img/envelope-solid.svg"
import phoneIcon from "../../img/phone-solid.svg"

const ContactDetail = ({contact, titleSetter, contacActions, onGoback}) => {
  useEffect(() => {
    titleSetter("Contacto");
  });

  return (
    <Body
      className="contact-detail"
      onActionComponent={
        <>
          <button className="body__go-back-btn" onClick={onGoback}>
            <img src={goBackIcon} alt="botón para volver atras" />
          </button>
          <EditContact
            contact={contact}
            contacActions={contacActions}
            titleSetter={titleSetter}
          />
        </>
      }
    >
      <section className="contact-detail__media">
        <span className="contact-detail__media__avatar--empty">{`${contact.name[0].toUpperCase()}${contact.lastName[0].toUpperCase()}`}</span>
        <h2 className="contact-detail__media__fullname">{`${contact.name.toUpperCase()} ${contact.lastName.toUpperCase()}`}</h2>
      </section>
      <section className="contact_info">
        <div className="contact_info--phone">
          <a href={`tel:${contact.phoneNumber}`}>
            <img src={phoneIcon} alt="Icono de telefono" />
          </a>
          <p>{contact.phoneNumber}</p>
          <a href={`sms:${contact.phoneNumber}`}>
            <img src={messageIcon} alt="icono de mensaje" />
          </a>
          
          </div>
        
      </section>
    </Body>
  );
};

export default ContactDetail;
