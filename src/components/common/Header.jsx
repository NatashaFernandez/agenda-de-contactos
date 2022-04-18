import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import HeaderNav from "./HeaderNav";
import HeaderToolbar from "./HeaderToolbar";

const Header = () => {
  const { header } = useAppContext();
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
          onBlur={() => setSearch({ query: "", isSearching: false })}
        />
      )}
      <HeaderNav
        action={header.navigation.action}
        title={
          !search.isSearching
            ? header.navigation.title
            : search.query
            ? ""
            : "Buscar..."
        }
      />
      <HeaderToolbar
        promotedActions={header.toolbar.promotedActions}
        menuActions={header.toolbar.menuActions}
      />
    </header>
  );
};

export default Header;
