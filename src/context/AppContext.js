import { createContext, useContext } from "react";

const initialAppContextValue = {
  header: {
    navigation: {title: "", action: null },
    toolbar: {
      promotedActions: [],
      menuActions: [],
    },
  },
};

const AppContex = createContext({
  ...initialAppContextValue,
  update: ({
    header: {
      navigation: {title, action},
      toolbar: {promotedActions, menuActions}
    }
  }) => {},
});
const useAppContext = () => useContext(AppContex);

export default AppContex;
export { useAppContext, initialAppContextValue };
