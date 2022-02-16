import Body from "../common/Body";
import EditContact from "./EditContact";
import React, { useEffect } from "react";
import goBackIcon from "../../img/go-back.svg";
import messageIcon from "../../img/envelope-solid.svg";
import phoneIcon from "../../img/phone-solid.svg";

const ContactDetail = ({ contact, titleSetter, contacActions, onGoback }) => {
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
          <div className="contact_info--display">
            <a className="contact_info--heigth" href={`tel:${contact.phoneNumber}`}>
              <img src={phoneIcon} alt="Icono de telefono" />
            </a>
            <div className="divider"></div>
            <p>{contact.phoneNumber}</p>
          </div>
          <a className="contact_info--heigth" href={`sms:${contact.phoneNumber}`}>
            <img src={messageIcon} alt="icono de mensaje" />
          </a>
        </div>
      </section>
    </Body>
  );
};

export default ContactDetail;
