import React, { useEffect, useState } from "react";
import messageIcon from "../../img/envelope-solid.svg";
import phoneIcon from "../../img/phone-solid.svg";
import { useParams } from "react-router-dom";
import FloatingButton from "../common/FloatingButton";

const ContactDetail = ({
  titleSetter,
  contacActions,
  onGoback,
  getContact,
}) => {
  let contactid = useParams("id");
  const [contact, setContact] = useState(getContact(contactid.id));
  
  useEffect(() => {
    titleSetter("Contacto");
  });

  return (
    <>
      <section className="contact-detail__media">
        <span className="contact-detail__media__avatar--empty">{`${contact.name[0].toUpperCase()}${contact.lastName[0].toUpperCase()}`}</span>
        <h2 className="contact-detail__media__fullname">{`${contact.name.toUpperCase()} ${contact.lastName.toUpperCase()}`}</h2>
      </section>
      <section className="contact_info">
        <div className="contact_info--phone">
          <div className="contact_info--display">
            <a
              className="contact_info--heigth"
              href={`tel:${contact.phoneNumber}`}
            >
              <img src={phoneIcon} alt="Icono de telefono" />
            </a>
            <div className="divider"></div>
            <p>{contact.phoneNumber}</p>
          </div>
          <a
            className="contact_info--heigth"
            href={`sms:${contact.phoneNumber}`}
          >
            <img src={messageIcon} alt="icono de mensaje" />
          </a>
        </div>
      </section>
      <FloatingButton title="Editar Contacto" urlToAction={`/edit/${contact.id}`}/>
    </>
  );
};

export default ContactDetail;
