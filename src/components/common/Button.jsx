import {useState} from "react";


/**
 * Botton con tooltip.
 * @param {{
 *  className?:string,
 *  label?:string,
 *  tooltip?:string,
 *  toolTipDirection?:"left"|"right"|"bottom-left"|"bottom-right"|"top-left"|"top-right"
 *  icon?:string,
 *  action: () => {}
 * }} props
 * @returns 
 */
const Button = ({className, label = "", tooltip, toolTipDirection, icon, action}) => {
    const [shouldShowTooltip, setShoudShowToolTip] = useState(false);

    return(
        <div className="button-container" htmlFor={tooltip? tooltip : label?label: 'button'}>
            {shouldShowTooltip && tooltip?
                <span className={`button-tooltip ${toolTipDirection}`}>{tooltip}</span>:
            <></>}
            <button onClick={action} 
             className={`button${className? ' '+className:''}`}
             onMouseEnter={() => {if(tooltip)setShoudShowToolTip(true)}} 
             onMouseLeave={() => {if(tooltip)setShoudShowToolTip(false)}}
            >{icon && <img className="button-icon" src={icon} alt=""/>}{label}</button>
        </div>
    )
}

export default Button;