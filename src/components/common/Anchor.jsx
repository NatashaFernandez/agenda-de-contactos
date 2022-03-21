import { useState } from "react";


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
const Anchor = ({className, label, tooltip, icon, href, toolTipDirection}) => {
    const [shouldShowTooltip, setShoudShowToolTip] = useState(false);

    return(
        <div className="anchor-container" htmlFor={tooltip? tooltip : label?label: 'icon'}>
            {shouldShowTooltip && tooltip?
                <span className={`anchor-tooltip ${toolTipDirection}`}>{tooltip}</span>:
            <></>}
            <a href={href} 
              className={`anchor${className? ' '+className:''}`}
              onMouseEnter={() => {if(tooltip)setShoudShowToolTip(true)}} 
              onMouseLeave={() => {if(tooltip)setShoudShowToolTip(false)}}
            >{icon && <img className="anchor-icon" src={icon} alt=""/>}{label}</a>
        </div>
    );
}

export default Anchor;