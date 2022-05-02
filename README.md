# AGENDA DE CONTACTOS
Aplicación de agenta de contactos hecho en React, permite realizar un CRUD de contactos y guardar los contactos del usuario de forma cifrada en el local storage del navegador.

 &nbsp;
## Funcionalidades
Listado de funcionalides disponibles en la aplicación y breve descripción (Expandir): 

* <details><!--Crear una cuenta-->
    <summary>Crear una cuenta</summary>
    <hr/>

    * Botón para dirigirse a iniciar sesión
    * Advertencia cuando las contraseñas no coinciden
    * Redireccionamiento al inicio de sesión al crear cuenta
    <hr/>
    </details>

* <details><!--Iniciar sesión-->
    <summary>Iniciar sesión</summary>
    <hr/>

    * Botón para dirigirse al registro de cuentas
    * Advertencia cuando las credenciales no son correctas
    * Redireccionamiento a la lista de contactos al iniciar sesión
    <hr/>
    </details>
* <details><!--Agregar contacto-->
    <summary>Agregar contacto</summary>
    <hr/>

    * Diálogo de confirmación de descarte si no se guarda un contacto
    * Uso de avatar por defecto si no fue establecido
    * Redireccionamiento hacia el detalle del contacto al ser creado
    * Redireccionamiento a la la lista de contactos al cancelar
    <hr/>
  </details>
* <details><!--Ver detalle de contacto-->
    <summary>Ver detalle de contacto</summary>
    <hr/>

    * Acceso a eliminar contacto en el menú
    * Botón para llamar al contacto
    * Botón para enviar sms al contacto
    * Botón para acceder a la edición del contacto
    * Redireccionamiento a la lista de contactos cuando no existe el ID del contacto
    <hr/>
  </details>
* <details><!--Eliminar contacto--> 
    <summary>Eliminar contacto</summary>
    <hr/>
        
    * Elimina un contacto
    * Eliminacion de multiples contactos
    * Uso de dialogo de confirmacion de acción
    <hr/>
  </details>
* <details><!--Modificar contacto-->
    <summary>Modificar contacto</summary>
    <hr/>

    * Puedes alterar todas las propiedades de un contacto
    * Dialogo de confirmación de acción de descartar cambios no guardados
    * Si actualizas el nombre/apellido y el avatar es el default se actualiza el avatar
    * Redireccionamiento a la lista de contactos cuando no existe el ID del contacto
    <hr/>
  </details>
* <details><!--Buscar contacto-->
    <summary>Buscar contacto</summary>
    <hr/>

    * Se listan solo los resultados de la busqueda
    * Puedes buscar contactos por Nombre, Apellido o telefono
    * La coincidencia de busqueda se marca de color azul
    * Si estas buscando puedes cancelar la seleccion y ver el listado completo

    <hr/>
  </details>
* <details><!--Listar contactos-->
    <summary>Listar contactos</summary>
    <hr/>

    * Se muestra el avatar y nombre completo de cada contacto
    * Al clickear un item te lleva a su detalle
    * La lista de contactos esta ordenada de forma acendente
    * Cada contacto listado se muestra junto a la letra inicial.\
        La primera incidencia dentro del alfabeto es visible.
    * Se puede seleccionar contactos desde el menú
    * Si tienes contactos seleccionados puedes usar la eliminación múltiple
    <hr/>
  </details>
* <details><!--Agregar avatar-->
    <summary>Agregar avatar</summary>
    <hr/>

    *  Se establece un avatar por defecto. Con letra y color aleatorio
    *  Se puede tomar una foto desde la cámara
    *  Permite seleccionar una foto de la galería
    <hr/>
  </details>
  
### Funcionalidades que aun no estan disponibles

*  Eliminar cuenta del usuario
*  Configurar preferencias del usuario
*  Modificar datos del usuario
*  Visualizar datos del usuario
*  Adicionar mas campos para los contactos
    
&nbsp;
## Clonando el repositorio
 Abre la Terminal. Cambia el directorio de trabajo actual a la ubicación en donde quieres clonar el directorio y corre el siguiente comando para crear tu clon local.
```bash
$ git clone https://github.com/NatashaFernandez/agenda-de-contactos
```

Luego de este comando puedes acceder a la carpeta del proyecto con:
```bash
$ cd agenda-de-contactos
```
Por ultimo en esta ubicación puedes ejecutar los comandos de la [seccion de scripts](#comandos-disponibles)

&nbsp;
## Dependencias del proyecto
Este proyecto tiene como dependencias:
* React v16
* React Router v6
* CryptoJS

Revisa la seccion de [instalacion de dependencias](#instalar-las-dependencias) para asegurarte de tener lo necesario.
  
&nbsp;
## Bugs
Hasta el momento no hay bugs conocidos

&nbsp;
## Comandos disponibles:

En este proyecto puedes usar comandos para:

&nbsp;
### `Instalar las dependencias`
Instala las dependencias mediante el siguiente script
```bash
$ npm install
```

&nbsp;
### `Lanzar la aplicacion`
Usa el siguiente script para correr la aplicacion en modo desarrollo:
```
$ npm start
```

Luego dirigete a [http://localhost:3000](http://localhost:3000) para ver la aplicacion en el navegador.

Para empezar puedes crearte una cuenta y empezar a usar la aplicacion.\
Si recargas la aplicacion debes loguarte nuevamente.

&nbsp;
### `Testear la aplicacion`
```
$ npm test
```

Lanza el corredor de pruebas en el modo de observacion interactivo .\
Para mas informacion revise la seccion [running tests](https://facebook.github.io/create-react-app/docs/running-tests).

&nbsp;
### `Construir la aplicacion`
```
$ npm run build
```

Construye la aplicacion en modo productivo en la carpeta `build`.\
Este modo optimiza la aplicacion con la mejor optimizacion.

La contruccion minifica el codigo y agrega los hashes a los nombres de archivos.\
Con ello la app esta lista para deployarse a un ambiente productivo!

Para mas informacion revise la guia de [deployment](https://facebook.github.io/create-react-app/docs/deployment).

&nbsp;
## Mas informacion

Puedes encontrar mas informacion sobre los scripts, code splitting, Bundle size analyzing, configuraciones avanzadas y creacion de una progressive web app en la documentacion de react: [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

Para aprender sobre la tecnologia de React, revisa el link a [Documentacion de React](https://reactjs.org/).
