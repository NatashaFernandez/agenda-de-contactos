import MenuActions from "./MenuActions";

const HeaderToolbar = ({ promotedActions, menuActions }) => {
  return (
    <div className="header-toolbar">
      <div className="header-toolbar_promotedActions">
        {promotedActions ? { promotedActions } : <></>}
      </div>
        {menuActions ? <MenuActions actions={menuActions} /> : <></>}
    </div>
  );
};
export default HeaderToolbar;
