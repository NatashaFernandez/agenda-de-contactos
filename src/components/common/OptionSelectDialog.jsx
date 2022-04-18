const OptionSelectDialog = ({ title, optionList, onCancel }) => {
  return (
    <dialog open className="optionselect-dialog">
      <div className="optionselect-dialog_header">
        <button className="optionselect-dialog_closer" onClick={onCancel}>
          X
        </button>
        <span className="optionselect-dialog_title">{title}</span>
      </div>
      <div className="optionselect-dialog_options">
        {optionList.map((option, index) => (
          <button
            key={index}
            className="optionselect-dialog_option"
            onClick={option.onSelect}
          >
            {option.displayName}
          </button>
        ))}
      </div>
    </dialog>
  );
};

export default OptionSelectDialog;
