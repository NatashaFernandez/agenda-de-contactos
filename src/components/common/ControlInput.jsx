
const ControlInput = ({attributeName, label, type, placeHolder, value, onChangeHandler, isRequired}) => {

    const fireOnChangeHandler = ({target}) => {
        onChangeHandler(target.value);
    }

    return(
        <div className="control">
            {label && <label className="control__label" htmlFor={attributeName}>{label}</label>}
            <input className="control__input" type={type||"text"} id={attributeName}
                name={attributeName} placeholder={placeHolder||''} isrequired={isRequired}
                value={value} onChange={fireOnChangeHandler}/>
        </div>
    )
}

export default ControlInput;