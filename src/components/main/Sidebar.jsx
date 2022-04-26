import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import Dialog from "../common/Dialog";

const Sidebar = ({options, children}) => {

  const app = useAppContext();
  const [shouldShowDialog, setShouldShowDialog] = useState(false);
  const [actionDialog, setActionDialog] = useState({
    displayName: "",
    execute: () => {},
    icon: "",
    content: "",  
  });

  const closeSidebar = () => {
    app.update({sidebar: {
      ...app.sidebar,
      showSidebar: false,
    }})
  }

  const doAction = (action) => {
    closeSidebar();
    if(action.useDialog){
      setActionDialog(action);
      setShouldShowDialog(true);
    }
    else{
      action.execute();
    }
  }

  const optionActions = (action, i) => (
      <li
        key={i}
        className={`app-sidebar_action ${
          action.hidden ? "--is-hidden" : ""
        }`}
        onClick={() => doAction(action)}
      >
        {action.icon && <img className="app-sidebar_actionicon" src={action.icon} alt="" />}
        <span className="app-sidebar_actionname">{action.displayName}</span>
      </li>
  );

  return(
    <>
      {app.sidebar.showSidebar && <span className="app-sidebar_layerOut" onClick={closeSidebar}></span>}
      <section className={`app-sidebar ${!(app.sidebar && app.sidebar.showSidebar)?"--is-hidden":""}`}>
        <header className="app-sidebar_header">
          {children}
        </header>
        <div className="app-sidebar_body">
          <ul className="app-sidebar_actions">
            {options.onBody && options.onBody
              .filter(Boolean)
              .map(optionActions)
            }
          </ul>
        </div>
        <footer className="app-sidebar_footer">
          <ul className="app-sidebar_actions">
            {options.onFooter && options.onFooter
              .filter(Boolean)
              .map(optionActions)
            }
          </ul>
        </footer>
      </section>
      {
        //una capa trasnparente o de sombra que se usa para capturar un click y salid del menu o un dialogo
      (shouldShowDialog) && (
          <span
            className="menu-actions_layerOut --has-shadow"
            onClick={() => {
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
    </>
  )
}

export default Sidebar;