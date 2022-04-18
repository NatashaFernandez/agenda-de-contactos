const ControlInput = ({
  attributeName,
  label,
  type,
  placeHolder,
  value,
  onChangeHandler,
  isRequired,
}) => {
  const fireOnChangeHandler = (e) => onChangeHandler(e.target.value);

  return (
    <div className="form-control">
      {label && (
        <label className="form-control_label" htmlFor={attributeName}>
          {label}
        </label>
      )}
      <input
        className="form-control_input"
        type={type || "text"}
        id={attributeName}
        name={attributeName}
        placeholder={placeHolder || ""}
        isrequired={isRequired}
        value={value}
        onChange={fireOnChangeHandler}
      />
    </div>
  );
};

export default ControlInput;
