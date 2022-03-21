import React, { useState } from "react";
import goBackIcon from "../../assets/Icons/go-back.svg"

/**Cuerpo contenedor de componentes que dispone de una propiedad para renderizar un componente de accion al ser pulsado
 * @param {{onActionComponent:JSX.Element,children:React.ReactChildren}
 */
const Body = ({onActionComponent,children,className}) => {

    /**Componente a ser cargado
     * @type {[componentToLoad:JSX.Element,setComponentToLoad:React.SetStateAction<JSX.Element>]}
    */
    const [actionComponentToLoad, setComponentToLoad] = useState(null)
    
    /**Setea el componente de la action en nulo para que se vuelva a renderizar {@link children los hijos} del Body*/
    const goBack = () => setComponentToLoad(null)

    /**Setea el {@link actionComponentToLoad componente de la accion} a renderizar como el indicado por {@link onActionComponent}*/
    const loadComponent = () => setComponentToLoad(onActionComponent);

    return(
        <>
            <main className={className}>
                {!actionComponentToLoad? //si el no se indico un componente para cargar entonces cargo los hijos del body
                <>
                    {children}
                    <button className="body__action-btn" onClick={loadComponent}>+</button>
                </>
                ://si hay un componente de accion que cargar lo cargo y renderizo tambien un boton para volver atras
                <>
                    <button className="body__go-back-btn" onClick={goBack}><img src={goBackIcon} alt=""/></button>
                    {actionComponentToLoad}
                </>
                }
            </main>
        </>
    );
}

export default Body;