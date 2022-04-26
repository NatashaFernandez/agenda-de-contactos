import { useState } from "react";
import Button from "./Button";
import MenuActions from "./MenuActions";
import Dialog from "./Dialog";

const HeaderToolbar = ({ promotedActions, menuActions }) => {
  const [shouldShowDialog, setShouldShowDialog] = useState(false);
  const [actionDialog, setActionDialog] = useState({
    displayName: "",
    execute: () => {},
    icon: "",
    content: "",
  });

  const doAction = (action) => {
    if (action.useDialog) {
      setShouldShowDialog(true);
      setActionDialog(action);
    } else action.execute();
  };

  return (
    <div className="header-toolbar">
      <div
        className={`header-toolbar_promotedActions ${
          menuActions.length ? "" : "--full-width"
        }`}
      >
        {promotedActions?.length ? (
          promotedActions.map((action, index) => (
            <div className="header-toolbar_promotedAction" key={index}>
              <Button
                icon={action.icon}
                className={`header-toolbar_action ${action.icon?"--is-only-icon":""}`}
                disabled={action.enabled === false}
                action={() => doAction(action)}
                label={!action.icon? action.displayName:""}
                tooltip={action.icon? action.displayName:""}
                toolTipDirection={"bottom-left"}
              />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <MenuActions actions={menuActions} />
      {shouldShowDialog && (
        <Dialog
          title={actionDialog.title}
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
export default HeaderToolbar;
