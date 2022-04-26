import { useReducer} from 'react'
import { Navigate, useLocation } from 'react-router-dom';

import AuthUserContext, {useAuthUserContext} 
  from '../../context/AuthentificatedUserContext';
import AuthenticatedUserReducer, {InitialAuthenticatedUser} 
  from "../../context/reducers/AuthenticatedUserReducer";

const AuthProvider = ({ children }) => {
  
  const [AuthenticatedUser, userActionsDispatcher] = useReducer(
    AuthenticatedUserReducer, 
    InitialAuthenticatedUser
  );
  
  return(
    <AuthUserContext.Provider value={
      {
        user: AuthenticatedUser,
        userActionsDispatcher
      }
    }>
      {children}
    </AuthUserContext.Provider>
  );
}

const RequireAuth = ({ children }) => {

  let {user} = useAuthUserContext();
  let location = useLocation();

  if (!user.isAuthenticated) {
    return <Navigate to="signin" state={{ from: location }} replace />;
  }

  return(<>{children}</>);
}

export default AuthProvider;
export {RequireAuth};