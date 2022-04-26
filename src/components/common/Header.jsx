import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import HeaderNav from "./HeaderNav";
import HeaderToolbar from "./HeaderToolbar";
import menuIcon from "../../assets/Icons/menu.svg";

const Header = () => {
  const app = useAppContext();
  const [search, setSearch] = useState({ query: "", isSearching: false });

  useEffect(() => {
    if (app.header.onSearch && app.header.type === "search") {
      app.header.onSearch(search);
    }
  }, [search, app]);


  return (
    <header
      className={`app-header ${
        app.header.type !== "default" ? `--is-${app.header.type}-type` : ""
      }`}
    >
      <HeaderNav
        action={
          app.header.type === "search" && search.query
            ? {
                displayName: `Cancelar busqueda`,
                aditionalClassName: "--has-contrast-background",
                icon: "cancel",
                execute: () => {
                  setSearch({
                    query: "",
                    isSearching: false,
                  });
                },
              }
            : app.header.navigation.action == null
            ? {
                displayName: "Abrir panel lateral",
                icon: menuIcon,
                execute: () => {
                  app.update({
                    sidebar:{
                      ...app.layout,
                      showSidebar: true,
                    }
                  })
                },
              }
            : app.header.navigation.action
        }
        title={
          app.header.type === "search"
            ? search.query
              ? ""
              : "Buscar contactos"
            : app.header.navigation.title
        }
      />
      {app.header.type === "search" && (
        <input
          className="app-header_search"
          type="search"
          spellCheck="false"
          value={search.query}
          onClickCapture={() => setSearch({ ...search, isSearching: true })}
          onChange={(e) =>
            setSearch({ query: e.target.value, isSearching: true })
          }
          onKeyDown={(e) => {
            if (e.code === "Backspace" && search.query.length === 1) {
              setSearch({ query: "", isSearching: true });
            }
          }}
        />
      )}
      <HeaderToolbar
        promotedActions={app.header.toolbar.promotedActions.filter(Boolean)}
        menuActions={app.header.toolbar.menuActions.filter(Boolean)}
      />
    </header>
  );
};

export default Header;
