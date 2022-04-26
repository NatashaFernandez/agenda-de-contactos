import { Outlet as AppMain } from "react-router-dom";
import Header from "../common/Header";
import { RequireAuth } from "../provider/AuthUserContextProvider";
import UserContactsContextProvider from "../provider/UserContactsContexProvider";

const Layout = () => {

  return (
    <RequireAuth>
      <UserContactsContextProvider>
        <Header />
        <AppMain />
      </UserContactsContextProvider>
    </RequireAuth>
  );
};

export default Layout;