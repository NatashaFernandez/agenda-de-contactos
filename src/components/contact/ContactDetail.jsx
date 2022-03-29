import React, { useState } from "react";
import messageIcon from "../../assets/Icons/envelope-solid.svg";
import phoneIcon from "../../assets/Icons/phone-solid.svg";
import { useNavigate, useParams } from "react-router-dom";
import FloatingButton from "../common/FloatingButton";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";
import Anchor from "../common/Anchor";
import BackButton from "../common/BackButton";

const ContactDetail = ({ contactActions, getContact }) => {
  const contactid = useParams("id");
  const app = useAppContext();
  const [contact, setContact] = useState(getContact(contactid.id));
  const navigate = useNavigate();
  useEffect(() => {
    app.update({
      header: {
        navigation: { action: <BackButton />, title: "Contacto" },
        toolbar: {
          promotedActions: [],
          menuActions: [
            {
              displayName: "Eliminar Contacto",
              execute: () => {
                contactActions({ type: "DELETE_CONTACT", payload: contact });
                navigate(-1);
              },
            },
          ],
        },
      },
    });
  }, []);

  return (
    <>
      <section className="contact-detail__media">
        <span className="contact-detail__media__avatar--empty">{`${contact.name[0].toUpperCase()}${contact.lastName[0].toUpperCase()}`}</span>
        <h2 className="contact-detail__media__fullname">{`${contact.name.toUpperCase()} ${contact.lastName.toUpperCase()}`}</h2>
      </section>
      <section className="contact_info">
        <div className="contact_info--phone">
          <div className="contact_info--display">
            <Anchor
              className="contact_info--heigth"
              href={`tel:${contact.phoneNumber}`}
              icon={phoneIcon}
              tooltip={"Llamar al contacto"}
              toolTipDirection="bottom-right"
            />
            <div className="divider"></div>
            <p>{contact.phoneNumber}</p>
          </div>
          <Anchor
            className="contact_info--heigth"
            href={`sms:${contact.phoneNumber}`}
            icon={messageIcon}
            tooltip="Enviar SMS"
            toolTipDirection="left"
          />
        </div>
      </section>
      <FloatingButton urlToAction={`/edit/${contact.id}`} />
    </>
  );
};

export default ContactDetail;
