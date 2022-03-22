import ControlInput from "../common/ControlInput";
import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

const ContactForm = ({
  title,
  contactAttributes,
  onSubmitContact,
}) => {

  const fireOnSubmitContact = (e) => {
    e.preventDefault();
    onSubmitContact();
  };

  return (
    <form className="contact-form">
      <div className="contact-form__body">
        {contactAttributes.map(([attributeName, attribute]) => (
          <ControlInput
            key={attributeName}
            attributeName={attributeName}
            label={attribute.label}
            value={attribute.getValue()}
            onChangeHandler={attribute.setValue}
          />
        ))}
      </div>
      <div className="contact-form__footer">
        <button
          className="contact-form__action--primary"
          onClick={fireOnSubmitContact}
          type="submit"
        >
          {title}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
