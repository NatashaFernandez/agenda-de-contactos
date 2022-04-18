import Button from "../common/Button";

const Dialog = ({ title, description, onCancel, onAccept }) => {
  return (
    <dialog open className="action-dialog">
      <div className="action-dialog_header">
        <h4 className="action-dialog_title">{title}</h4>
      </div>
      <div className="action-dialog_content">{description}</div>
      <div className="action-dialog_footer">
        <Button
          className="action-dialog_cancel"
          action={onCancel}
          label="Cancelar"
        />
        <Button
          className="action-dialog_accept"
          action={onAccept}
          label="Aceptar"
        />
      </div>
    </dialog>
  );
};

export default Dialog;
