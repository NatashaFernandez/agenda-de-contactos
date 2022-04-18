import ControlInput from "../common/ControlInput";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState, useRef } from "react";

const ContactForm = ({
  title,
  children,
  contactAttributes,
  onCancelInteractios,
  onSubmitContact,
}) => {
  const app = useRef(useAppContext());
  const [receivedAttributes, setReceivedAttributes] = useState(null);
  const [hasMadeChages, setHasMadeChanges] = useState(false);

  useEffect(() => {
    app.current.update({
      header: {
        type: "default",
        navigation: {
          action: {
            icon: "cancel",
            execute: onCancelInteractios,
            useDialog: hasMadeChages,
            content: "¿Esta seguro que desea descartar sus cambios?",
          },
          title: title,
        },
        toolbar: {
          promotedActions: [
            {
              displayName: "Guardar",
              enabled: hasMadeChages,
              execute: onSubmitContact,
            },
          ],
          menuActions: [],
        },
      },
    });
  }, [hasMadeChages, title, onCancelInteractios, onSubmitContact]);

  useEffect(() => {
    setReceivedAttributes(Object.entries(contactAttributes));
  }, []);

  useEffect(() => {
    if (receivedAttributes) {
      const contactAttributesEntries = Object.entries(contactAttributes);
      if (
        receivedAttributes.every(
          ([attributeName, attribute], index) =>
            attribute.getValue() ===
            contactAttributesEntries[index][1].getValue()
        )
      )
        setHasMadeChanges(false);
      else setHasMadeChanges(true);
    }
  }, [contactAttributes, receivedAttributes, hasMadeChages, onSubmitContact]);

  const attributeAsControlsFilter = ([, attr]) => !attr.hasOwnControlInput;

  return (
    <form className="contact-form">
      <div className="contact-form_body">
        <div className="contact-form_header">{children}</div>
        <div className="contact-form_controls">
          {Object.entries(contactAttributes)
            .filter(attributeAsControlsFilter)
            .map(([attributeName, attribute]) => (
              <ControlInput
                key={attributeName}
                attributeName={attributeName}
                label={attribute.label}
                value={attribute.getValue()}
                onChangeHandler={attribute.setValue}
              />
            ))}
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
