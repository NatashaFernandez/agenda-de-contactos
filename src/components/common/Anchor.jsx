/**
 * Anchor con tooltip.
 * @param {{
 *  className?:string,
 *  label?:string,
 *  tooltip?:string,
 *  toolTipDirection?:"left"|"right"|"bottom-left"|"bottom-right"|"top-left"|"top-right"
 *  icon?:string,
 *  href:string
 * }} props
 * @returns
 */
const Anchor = ({
  className,
  label,
  tooltip,
  icon,
  href,
  toolTipDirection,
  disabled,
}) => {
  return (
    <>
      {tooltip ? (
        <a
          className={className || "button"}
          href={href}
          disabled={disabled}
          tooltip={tooltip}
          tooltip-direction={toolTipDirection || "top"}
        >
          {icon && <img className="button-icon" src={icon} alt="" />}
          {label}
        </a>
      ) : (
        <a className={className || "button"} href={href}>
          {" "}
          disabled={disabled}
          {icon && <img className="button-icon" src={icon} alt="" />}
          {label}
        </a>
      )}
    </>
  );
};

export default Anchor;
