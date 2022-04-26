/** Informacion de un Contacto
 * @typedef Contact
 * @property {number} id - identificador de un contacto
 * @property {{picture:string,isDefault:boolean}} avatar
 * @property {string} name - nombre del contacto
 * @property {string} lastName - apellido del contacto
 * @property {string} phoneNumber - numero telefonico del contacto
 */

/** Data de un Usuario
 * @typedef UserData
 * @property {String} email
 * @property {String} name
 * @property {String} lastName
 * @property {{picture:string,isDefault:boolean}} avatar
 */

/** Un usuario autentificado que se logueo en la app
 * @typedef AuthenticatedUser
 * @property {boolean} isAuthenticated
 * @property {UserData} data
 * @property {Contact[]} contacts - lista de contactos del usuario
 */

/** Una solicitud de realizar una accion en una autentificacion de usuario
 * @typedef AuthUserRequest
 * @property {AuthenticatedUser} account
 * @property {String} authKey
 */