import "./entities/types";

//uso la libreria CryptoJS para cifrar y descifrar informacion del usuario a loguear
var CryptoJS = require("crypto-js");

/**Estado inicial de un usuario que se desea loguear
 * @type {AuthenticatedUser}
 */
const InitialAuthenticatedUser = {
  isAuthenticated: false,
  _authToken: "",
  data: {
    avatar: "",
    email: "",
    name: "",
    lastName: "",
  },
  contacts: [],
};

/** Tipos de acciones validas para despachar con AuthenticatedUserReducer
 * @typedef AuthUserActionType
 * @type {"SIGIN" | "LOGOUT" | "SINGUP"}
 */

/**
 * @typedef AuthenticatedUserAction
 * @property {AuthUserActionType} type
 * @property {AuthUserRequest} payload
 */

/**
 * @param {AuthenticatedUser} AuthenticatedUserState
 * @param {AuthenticatedUserAction} userAction
 * @returns {AuthenticatedUser}
 */
const AuthenticatedUserReducer = (AuthenticatedUserState, userAction) => {
  switch (userAction.type) {
    case "SIGIN":
      try {
        if (AuthenticatedUserState.isAuthenticated)
          return AuthenticatedUserState;

        //tomo los datos enviados
        const UserFromAccountEmail = userAction.payload.account.data.email;
        const authKey = userAction.payload.authKey;

        //intento tomar un usuario con el email como key para local storage getItem()
        const userAccountEncryptedText =
          localStorage.getItem(UserFromAccountEmail);

        //compruebo si se pudo obtener un objeto con esa key (null or string) devuelto por getItem
        if (userAccountEncryptedText) {
          /**el usuario devuelto es un string con la informacion cifrada, lo desifro con authkey*/
          const bytesToParse = CryptoJS.AES.decrypt(
            userAccountEncryptedText,
            authKey
          );

          //compruebo si el string tiene un valor para saber si fue decifrado y asi hacer un parse
          if (bytesToParse) {
            const AuthenticatedUser = JSON.parse(
              bytesToParse.toString(CryptoJS.enc.Utf8)
            );

            if (AuthenticatedUser) {
              AuthenticatedUser.isAuthenticated = true;
              AuthenticatedUser._authToken = CryptoJS.AES.encrypt(
                authKey,
                userAccountEncryptedText
              ).toString();
              return AuthenticatedUser; //devuelvo el nuevo estado para el usuario de la app
            }
          }
        }
        return InitialAuthenticatedUser;
      } catch (error) {
        return InitialAuthenticatedUser;
      }

    case "LOGOUT":
      return InitialAuthenticatedUser;

    case "SINGUP":
      const newUserAccount = userAction.payload.account;
      const newUserAccountJSON = JSON.stringify(newUserAccount);

      const cipherUser = CryptoJS.AES.encrypt(
        newUserAccountJSON,
        userAction.payload.authKey
      );

      localStorage.setItem(newUserAccount.data.email, cipherUser.toString());
      return InitialAuthenticatedUser;

    case "SAVE_USER_CONTACTS_DATA":
      if (AuthenticatedUserState.isAuthenticated) {
        const userAccountEncryptedText = localStorage.getItem(
          AuthenticatedUserState.data.email
        );
        if (userAccountEncryptedText) {
          const authKey = CryptoJS.AES.decrypt(
            AuthenticatedUserState._authToken,
            userAccountEncryptedText
          );
          if (authKey) {
            const userAccount = JSON.stringify(userAction.payload);
            const cipherUser = CryptoJS.AES.encrypt(
              userAccount,
              authKey.toString(CryptoJS.enc.Utf8)
            );
            localStorage.setItem(AuthenticatedUserState.data.email ,cipherUser.toString());
            AuthenticatedUserState._authToken = CryptoJS.AES.encrypt(
              authKey.toString(CryptoJS.enc.Utf8),
              cipherUser.toString()
            ).toString();
          }
        }
      }

       return AuthenticatedUserState;
    default:
      throw new Error("No se pudo resolver la accion de usuario solicitada");
  }
};

export default AuthenticatedUserReducer;
export { InitialAuthenticatedUser };
