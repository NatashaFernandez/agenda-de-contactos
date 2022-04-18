import MenuActions from "./MenuActions";

const HeaderToolbar = ({ promotedActions, menuActions }) => {
  return (
    <div className="header-toolbar">
      <div
        className={`header-toolbar_promotedActions ${
          menuActions.length ? "" : "--full-width"
        }`}
      >
        {promotedActions?.length ? (
          promotedActions.map((action, index) => (
            <button
              key={index}
              className="header-toolbar_action"
              disabled={action.enabled === false}
              onClick={() => action.execute()}
            >
              {action.displayName}
            </button>
          ))
        ) : (
          <></>
        )}
      </div>
      <MenuActions actions={menuActions} />
    </div>
  );
};
export default HeaderToolbar;
