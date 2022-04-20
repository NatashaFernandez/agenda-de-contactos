import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import HeaderNav from "./HeaderNav";
import HeaderToolbar from "./HeaderToolbar";

const Header = () => {
  const {header } = useAppContext();
  const [search, setSearch] = useState({ query: "", isSearching: false });

  useEffect(() => {
    if (header.onSearch && header.type === "search") {
      header.onSearch(search);
    }
  }, [search, header]);

  return (
    <header
      className={`app-header ${
        header.type !== "default" ? `--is-${header.type}-type` : ""
      }`}
    >
      <HeaderNav
        action={header.type === "search" && search.query?
        {
          displayName: `Cancelar busqueda`,
          aditionalClassName: "--has-contrast-background",
          icon: "cancel",
          execute: () => {
            setSearch({
              query: "",
              isSearching: false,
            });
          }
        }: header.navigation.action}
        title={
          header.type === "search"
            ? search.query
              ? ""
              : "Buscar contactos"
            : header.navigation.title
        }
      />
      {header.type === "search" && (
        <input
          className="app-header_search"
          type="search"
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
        promotedActions={header.toolbar.promotedActions}
        menuActions={header.toolbar.menuActions}
      />
    </header>
  );
};

export default Header;
