import {useState} from "react";
import AppContex, {initialAppContextValue} from "../../context/AppContext";

const AppContexProvider = ({children}) => {

    const [app, setApp] = useState(initialAppContextValue); 

    return(
        <AppContex.Provider value={{app, setApp}}>
            {children}
        </AppContex.Provider>
    );
}

export default AppContexProvider;
export const AppContexConsumer = AppContex.Consumer;