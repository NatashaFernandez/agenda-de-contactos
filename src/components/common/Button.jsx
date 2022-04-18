/**
 * Botton con tooltip.
 * @param {{
 *  className?:string,
 *  label?:string,
 *  tooltip?:string,
 *  toolTipDirection?:"left"|"right"|"top"|"bottom"|"bottom-left"|"bottom-right"|"top-left"|"top-right"
 *  icon?:string,
 *  action: () => {}
 * }} props
 * @returns
 */
const Button = ({
  className,
  label = "",
  tooltip,
  toolTipDirection,
  icon,
  action,
  disabled,
}) => {
  return (
    <>
      {tooltip ? (
        <button
          className={className || "button"}
          onClick={action}
          disabled={disabled}
          tooltip={tooltip}
          tooltip-direction={toolTipDirection || "top"}
        >
          {icon && <img className="button-icon" src={icon} alt="" />}
          {label}
        </button>
      ) : (
        <button
          className={className || "button"}
          onClick={action}
          disabled={disabled}
        >
          {icon && <img className="button-icon" src={icon} alt="" />}
          {label}
        </button>
      )}
    </>
  );
};

export default Button;
