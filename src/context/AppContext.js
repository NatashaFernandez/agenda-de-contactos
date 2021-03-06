import { createContext, useContext } from "react";

/**
 * @typedef Action
 * @type {{
 *    displayName: string,
 *    execute: () => {},
 *    icon?: string,
 *    enabled?: boolean,
 *    hidden?: boolean,
 *    useDialog?: boolean,
 *    content?: string,
 *    aditionalClassName?: string
 * }}
 */

/** App
 * @typedef App
 * @type {{
 *    header: {
 *      type?:"default"|"overlay"|"search",
 *      onSearch?: (seachText:string, isSearching: boolean) => void,
 *      navigation: {title: string, action: Action },
 *      toolbar: {
 *        promotedActions: Action[],
 *        menuActions: Action[],
 *      },
 *    }
 *    sidebar: {
 *      showSidebar?: Boolean,
 *      actions?: Action[]
 *      sidebarHeader?: React.Component||null,
 *    }
 * }}
 */

/** Estado inicial del la applicacion
 * @type {App}
 */
const initialAppContextValue = {
  header: {
    type: "default",
    navigation: { title: "", action: null },
    toolbar: {
      promotedActions: [],
      menuActions: [],
    },
  },
  sidebar: {
    showSidebar: false,
  },
};

const AppContex = createContext({
  ...initialAppContextValue,
  /** @type {(changes:App) => void} actualiza el contexto de la applicacion*/
  update: (changes) => {},
});
const useAppContext = () => useContext(AppContex);

export default AppContex;
export { useAppContext, initialAppContextValue };
