import Button from "../common/Button";
import BackButton from "./BackButton";
import Dialog from "./Dialog";
import cancelIcon from "../../assets/Icons/cancel.svg";
import menuIcon from "../../assets/Icons/menu.svg";
import { useState } from "react";

const HeaderNav = ({ title, action }) => {
  const [shouldShowDialog, setShouldShowDialog] = useState(false);

  const doAction = () => {
    if (action.useDialog) {
      setShouldShowDialog(true);
    } else action.execute();
  };

  return (
    <>
      <div className="header-navigation">
        <div className="header-navigation_action">
          {action && action.icon === "back" ? (
            <BackButton onBack={doAction} />
          ) : action && action.icon === "cancel" ? (
            <Button
              className={`header-navigation_icon${
                action.aditionalClassName ? " " + action.aditionalClassName : ""
              }`}
              action={doAction}
              icon={cancelIcon}
              tooltip={action.displayName}
              toolTipDirection="bottom-right"
            />
          ) : action.icon === "menu"? (
            <Button 
              className="header-navigation_icon"
              icon={menuIcon}
              action={action}
              tooltip={action.displayName}
              toolTipDirection="bottom-right"
           />
          ) : (
            <Button
              className="header-navigation_icon" 
              icon={action.icon}
              action={doAction}
              tooltip={action.displayName}
              toolTipDirection="bottom-right"
            />
          )}
        </div>
        <h1 className="header-navigation_title">{title}</h1>
      </div>
      {shouldShowDialog && (
        <Dialog
          title={title}
          description={action.content}
          onAccept={() => {
            action.execute();
            setShouldShowDialog(false);
          }}
          onCancel={() => setShouldShowDialog(false)}
        />
      )}
    </>
  );
};

export default HeaderNav;
