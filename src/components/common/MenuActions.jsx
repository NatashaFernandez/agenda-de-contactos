import {useState, useEffect} from "react";
import MenuIcon from "../../assets/Icons/ellipsis-vertical.svg"
import Button from "../common/Button";

const MenuActions = ({actions}) => {

    const [shouldShowMenuActions, setShouldShowMenuActions] = useState(false);
  
    useEffect(() => {
      if(!actions.length){
        setShouldShowMenuActions(false);
      }
    },[actions]);

    const showMenuActions = () => {
      setShouldShowMenuActions(!shouldShowMenuActions);
    }

    const doAction = (callback) => {
      callback();
      setShouldShowMenuActions(false);
    }

    return(
        <div className='menu-actions'>
          {actions.length? 
            <Button className="menu-actions_toggler" icon={MenuIcon} action={showMenuActions}/>
          :<></>}
          <ul className={`menu-actions_list${shouldShowMenuActions? '--expanded':''}`}>
            {shouldShowMenuActions && actions.map((action, i) =>
                <li key={i} className="menu-actions_actionItem" onClick={() => doAction(action.execute)}>{action.displayName}</li>
            )}
          </ul>
        </div>
    );
}

export default MenuActions;