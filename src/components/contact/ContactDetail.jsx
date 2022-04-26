import React, { useState, useEffect } from "react";
import editIcon from "../../assets/Icons/edit-regular.svg";
import messageIcon from "../../assets/Icons/message.svg";
import phoneIcon from "../../assets/Icons/phone-solid.svg";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import FloatingButton from "../common/FloatingButton";
import { useAppContext } from "../../context/AppContext";
import Anchor from "../common/Anchor";
import ContactMedia from "./ContactMedia";
import { useContactsContext } from "../../context/UserContactsContext";

const ContactDetail = () => {

  const { contactActions, getContact } = useContactsContext();
  const contactid = useParams("id");
  const app = useAppContext();
  const navigate = useNavigate();
  const [contact, setContact] = useState(getContact(contactid.id));

  useEffect(() => {
    app.update({
      header: {
        type: "overlay",
        navigation: {
          action: {
            icon: "back",
            execute: () => navigate("/", { replace: true }),
          },
          title: "Contacto",
        },
        toolbar: {
          promotedActions: [],
          menuActions: [
            {
              displayName: "Eliminar Contacto",
              useDialog: true,
              content: "¿Estas seguro que deseas eliminar el contacto?",
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
      {!contact ? (
        <Navigate to="/" replace />
      ) : (
        <main className="app-main">
          <ContactMedia
            avatar={contact.avatar}
            onLoadPicture={() => {}}
            editMode={true}
            name={contact.name}
            lastName={contact.lastName}
          />
          <section className="contact-info">
            <ul className="contact-info_list">
              <li className="contact-info_item">
                <div className="contact-info_content">
                  <Anchor
                    className="contact-info_action call-phone"
                    href={`tel:${contact.phoneNumber}`}
                    icon={phoneIcon}
                    tooltip={"Llamar al contacto"}
                    toolTipDirection="bottom-right"
                  />
                  <div className="contact-info_divider" />
                  <p className="contact-info_info">{contact.phoneNumber}</p>
                </div>
                <div className="contact-info_actions">
                  <Anchor
                    className="contact-info_action"
                    href={`sms:${contact.phoneNumber}`}
                    icon={messageIcon}
                    tooltip="Enviar SMS"
                    toolTipDirection="bottom-left"
                  />
                </div>
              </li>
            </ul>
          </section>
          <FloatingButton
            className="app-main_action"
            urlToAction={`/edit/${contact.id}`}
            img={editIcon}
            tooltip={"Editar contacto"}
          />
        </main>
      )}
    </>
  );
};

export default ContactDetail;
