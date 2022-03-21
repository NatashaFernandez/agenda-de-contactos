const HeaderNav = ({ title, action }) => {
  return (
    <div className="header-navigation">
      <div className="header-navigation_action">{action}</div>
      <h1 className="header-navigation_title">{title}</h1>
    </div>
  );
};

export default HeaderNav;
