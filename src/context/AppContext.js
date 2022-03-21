import { createContext, useContext } from "react";

const initialAppContextValue = {
  header: {
    navigation: { title: "Contactos", action: null },
    toolbar: {
      promotedActions: [null],
      menuActions: [null],
    },
  },
};

const AppContex = createContext({
  app: initialAppContextValue,
  setApp: () => {},
});
const useAppContext = () => useContext(AppContex);

export default AppContex;
export { useAppContext, initialAppContextValue };
