import {useState} from "react";
import MenuIcon from "../../assets/Icons/ellipsis-vertical.svg"

const MenuActions = ({actions}) => {

    const [shouldShowMenuActions, setShouldShowMenuActions] = useState(false);
  
    const showMenuActions = () => {
      setShouldShowMenuActions(!shouldShowMenuActions);
    }

    const doAction = (callback) => {
      callback();
      setShouldShowMenuActions(false);
    }

    return(
        <div className='menu-actions'>
          {actions?.lenght && <button className="menu-actions_toggler" onClick={showMenuActions}><img src={MenuIcon} alt=""/></button>}
          <ul className={`menu-actions_list${shouldShowMenuActions? '--expanded':''}`}>
            {shouldShowMenuActions && actions.map((action, i) =>
                <li key={i} className="menu-actions_actionItem" onClick={() => doAction(action.execute)}>{action.displayName}</li>
            )}
          </ul>
        </div>
    );
}

export default MenuActions;