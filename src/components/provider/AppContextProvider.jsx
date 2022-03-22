import {useState, useCallback} from "react";
import AppContex, {initialAppContextValue} from "../../context/AppContext";

const AppContexProvider = ({children}) => {

    const [app, setApp] = useState(initialAppContextValue);

    const set = useCallback(updates => setApp({...app, ...updates}), [app, setApp]);
    const getAppContext = useCallback(()  => ({...app, update: set}), [app, set]);

    return(
        <AppContex.Provider value={getAppContext()}>
            {children}
        </AppContex.Provider>
    );
}

export default AppContexProvider;