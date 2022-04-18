import { useState, useEffect } from "react";
import MenuIcon from "../../assets/Icons/ellipsis-vertical.svg";
import Button from "../common/Button";
import Dialog from "./Dialog";

const MenuActions = ({ actions }) => {
  const [shouldShowMenuActions, setShouldShowMenuActions] = useState(false);
  const [shouldShowDialog, setShouldShowDialog] = useState(false);
  const [actionDialog, setActionDialog] = useState({
    displayName: "",
    execute: () => {},
    icon: "",
    content: "",
  });

  useEffect(() => {
    if (!actions.length) {
      setShouldShowMenuActions(false);
      setShouldShowDialog(false);
    }
  }, [actions]);

  const showMenuActions = () => {
    setShouldShowMenuActions(!shouldShowMenuActions);
  };

  const doAction = (action) => {
    if (action.useDialog) {
      setActionDialog(action);
      setShouldShowDialog(true);
    } else action.execute();
    setShouldShowMenuActions(false);
  };

  /** usa la clase especificada cuando la condicion se cumpla
   * @param {string} className
   * @param {boolean} contition
   * @returns {string} la clase especificada o un string vacio
   */
  const withClassWhen = (className, contition) => (contition ? className : "");

  return (
    <div className={`menu-actions ${actions.length ? "" : "--collapsed"}`}>
      {actions.length ? (
        <Button
          className="menu-actions_toggler"
          icon={MenuIcon}
          action={showMenuActions}
        />
      ) : (
        <></>
      )}
      <ul
        className={`menu-actions_list${withClassWhen(
          "--expanded",
          shouldShowMenuActions
        )}`}
      >
        {shouldShowMenuActions &&
          actions.map((action, i) => (
            <li
              key={i}
              className={`menu-actions_actionItem${
                action.hidden ? "--hidden" : ""
              }`}
              onClick={() => doAction(action)}
            >
              {action.icon && <img src={action.icon} alt="" />}
              {action.displayName}
            </li>
          ))}
      </ul>
      {
        //una capa trasnparente o de sombra que se usa para capturar un click y salid del menu o un dialogo
        (shouldShowMenuActions || shouldShowDialog) && (
          <span
            className={`menu-actions_layerOut ${withClassWhen(
              "--has-shadow",
              shouldShowDialog
            )}`}
            onClick={() => {
              setShouldShowMenuActions(false);
              setShouldShowDialog(false);
            }}
          />
        )
      }
      {shouldShowDialog && (
        <Dialog
          title={actionDialog.displayName}
          description={actionDialog.content}
          onAccept={() => {
            actionDialog.execute();
            setShouldShowDialog(false);
          }}
          onCancel={() => setShouldShowDialog(false)}
        />
      )}
    </div>
  );
};

export default MenuActions;
