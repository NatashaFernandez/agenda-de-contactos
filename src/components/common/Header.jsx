import { useAppContext } from "../../context/AppContext";
import HeaderNav from "./HeaderNav";
import HeaderToolbar from "./HeaderToolbar";

const Header = () => {
  const { app } = useAppContext();

  return (
    <header className={`app-header`}>
      <HeaderNav
        action={app.header.navigation.action}
        title={app.header.navigation.title}
      />
      <HeaderToolbar menuActions={app.header.toolbar.menuActions} />
    </header>
  );
};
export default Header;
