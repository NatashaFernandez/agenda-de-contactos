import { useAppContext } from "../../context/AppContext";
import HeaderNav from "./HeaderNav";
import HeaderToolbar from "./HeaderToolbar";

const Header = () => {
  const {header} = useAppContext();

  return (
    <header className={`app-header`}>
      <HeaderNav {...header.navigation}/>
      <HeaderToolbar promotedActions={header.promotedActions} menuActions={header.toolbar.menuActions} />
    </header>
  );
};
export default Header;
