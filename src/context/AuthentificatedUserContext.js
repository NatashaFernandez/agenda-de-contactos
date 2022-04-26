import {createContext, useContext} from "react";
import { InitialAuthenticatedUser,} from "./reducers/AuthenticatedUserReducer";

const AuthUserContextValue = {
    user: InitialAuthenticatedUser, 
    userActionsDispatcher: null
};

const AuthUserContext = createContext(AuthUserContextValue);

const useAuthUserContext = () => useContext(AuthUserContext);

export default AuthUserContext;
export {useAuthUserContext};