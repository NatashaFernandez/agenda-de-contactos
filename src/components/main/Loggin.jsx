import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ControlInput from "../common/ControlInput";
import { useAuthUserContext } from "../../context/AuthentificatedUserContext";
import userProfileCheckIcon from "../../assets/Images/user-profile-check.png";

const SignIn = () => {
  const navigate = useNavigate();

  const auth = useAuthUserContext();
  const [userData, setUserData] = useState(auth.user.data);
  const [authKey, setAuthKey] = useState("");
  const [summary, setSummary] = useState("");
  const [isLogging, setIsLogging] = useState(false);

  useEffect(() => {
    if (auth.user.isAuthenticated) {
      setSummary("");
      navigate("/"); //un usuario logueado ya puede estar en la ruta inicial
    }
    if (isLogging) {
      if (!auth.user.isAuthenticated) {
        setSummary("Email o contraceña invalida, intente de nuevo");
        setIsLogging(false);
      }
    }
  }, [auth.user.isAuthenticated, navigate, isLogging]);

  const siginHandler = (e) => {
    e.preventDefault();

    const authRequestAction = {
      type: "SIGIN",
      payload: {
        account: auth.user,
        authKey: authKey,
      },
    };

    authRequestAction.payload.account.data = userData;

    auth.userActionsDispatcher(authRequestAction);
    setIsLogging(true);
  };

  const singupHandler = (e) => {
    navigate("/signup");
  };

  return (
    <main className="login">
      <header className="login-header">Ingresar a Contactos</header>
      <section className="login-presenttion">
        <img src={userProfileCheckIcon} alt="" width={90} />
      </section>
      <form className="login-form" onSubmit={siginHandler}>
        <section className="login-form_controls">
          <ControlInput
            key={"email"}
            attributeName={"email"}
            onChangeHandler={(email) => setUserData({ ...userData, email })}
            value={userData.email}
            label={"Email"}
            placeHolder="Ingresa tu email"
            type="email"
            isRequired={true}
          />
          <ControlInput
            key={"password"}
            attributeName={"password"}
            onChangeHandler={setAuthKey}
            value={authKey}
            label="Contraceña"
            placeHolder={"Ingresa la contraseña de Contactos"}
            type="password"
            isRequired={true}
          />
        </section>
        <footer className="login-form_footer">
          {summary && (
            <section className="login-form_sumary">{summary}</section>
          )}
          <button className="login-form_action --is-primary" type="submit">
            Iniciar session
          </button>
        </footer>
      </form>
      <footer className="login-footer">
        <button
          className="login-form_action"
          onClick={singupHandler}
        >
          No tienes cuenta? Registarse
        </button>
      </footer>
    </main>
  );
};

const SignUp = () => {
  const navigate = useNavigate();

  const auth = useAuthUserContext();
  const [userData, setUserData] = useState({...auth.user.data, email: ""});
  const [authKey, setAuthKey] = useState("");
  const [authKeyConfirmation, setAuthKeyConfirmation] = useState("");
  const [summary, setSummary] = useState("");

  const authKeyConfirmationCheck = () => {
    if (authKey !== authKeyConfirmation) {
      setSummary("Las contraceñas no coinciden");
    } else {
      setSummary("");
    }
  };

  const singinHandler = () => {
    navigate("/signin");
  };


  const singupHandler = (e) => {
    e.preventDefault();

    authKeyConfirmationCheck();

    /**@type {AuthUserRequest}*/
    const authRequest = {
      account: auth.user,
      authKey: authKey,
    };

    authRequest.account.data = userData;

    auth.userActionsDispatcher({ type: "SINGUP", payload: authRequest });
    singinHandler();
  };

  return (
    <main className="login">
      <header className="login-header">Registarse en Contactos</header>
      <form className="login-form" onSubmit={singupHandler}>
        <section className="login-form_controls">
          <ControlInput
            key={"name"}
            attributeName={"name"}
            onChangeHandler={(name) => setUserData({ ...userData, name })}
            value={userData.name}
            label={"Nombre"}
            placeHolder="Ingresa tu Nombre"
            type="text"
            isRequired={true}
          />
          <ControlInput
            key={"last-name"}
            attributeName={"last-name"}
            onChangeHandler={(lastName) =>
              setUserData({ ...userData, lastName })
            }
            value={userData.lastName}
            label={"Apellido"}
            placeHolder="Ingresa tu Apellido"
            type="text"
            isRequired={true}
          />
          <ControlInput
            key={"email"}
            attributeName={"email"}
            onChangeHandler={(email) => setUserData({ ...userData, email })}
            value={userData.email}
            label={"Email"}
            placeHolder="Ingresa tu Email"
            type="email"
            isRequired={true}
          />
          <ControlInput
            key={"password"}
            attributeName={"password"}
            onChangeHandler={setAuthKey}
            value={authKey}
            label="Contraceña"
            placeHolder={"Ingresa la contraseña para Contactos"}
            type="password"
            isRequired={true}
          />
          <ControlInput
            key={"password-confirmation"}
            attributeName={"password-confirmation"}
            onChangeHandler={setAuthKeyConfirmation}
            value={authKeyConfirmation}
            label="Confirme la contraceña"
            placeHolder={"Reingrese la contraseña para Contactos"}
            type="password"
            isRequired={true}
          />
        </section>
        <footer className="login-form_footer">
          {summary && (
            <section className="login-form_sumary">{summary}</section>
          )}
          <button className="login-form_action --is-primary" type="submit">
            Registrarse
          </button>
        </footer>
      </form>
      <footer className="login-footer">
        <button
          className="login-form_action"
          onClick={singinHandler}
        >
          Ya tengo una cuenta
        </button>
      </footer>
    </main>
  );
};

export { SignIn, SignUp };
