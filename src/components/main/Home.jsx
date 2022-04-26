import ContactList from "../contact/ContactList";
import Sidebar from "./Sidebar";
import { useAuthUserContext } from "../../context/AuthentificatedUserContext";
import logoutIcon from "../../assets/Icons/logout.svg"

const Home = ({contacts, dispathContactActions}) => {
  const auth = useAuthUserContext();

  return(
    <>
      <Sidebar options={{
        onFooter: [
          {
            displayName: "Cerrar session",
            icon: logoutIcon,
            useDialog: true,
            content: "¿Esta seguro que desea cerrar la sesion?",
            execute: () => {
              auth.userActionsDispatcher({type: "LOGOUT", payload: auth.user})
            }
          }
        ]
      }}/>
      <ContactList
        contacts={contacts}
        contactActions={dispathContactActions}
      />
    </>
  )
}

export default Home;