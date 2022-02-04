import { useState } from "react";
import App from "../App.css"

const AddContact = ({addContact}) => {

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const onSubmitContact= (e) => {
        //Cancelar el envio
        e.preventDefault();
        //Validar datos
        if(!name){
            alert('No se ah ingresado un nombre')
            return
        }
        if(!lastName){
            alert('No se ah ingresado un apellido')
            return
        }
        if(!phoneNumber){
            alert('No se ah ingresado un teléfono')
            return
        }
        //Ejecutar funcion prop, addContact
        addContact({name, lastName, PhoneNumber: phoneNumber});
        //Limpiar formulario
        setName('')
        setLastName('')
        setPhoneNumber('')
    }

    return(
        <>
            <div>
                <h1>Contactos</h1>
                <h2>AGREGAR CONTACTO</h2>
            </div>
            <div>
                <form className="container" onSubmit={onSubmitContact}>
                    <div>
                        <label htmlFor="name">Nombre : </label>
                        <input 
                        type="text" 
                        placeholder="Nombre"
                        className="container__input"
                        value={name}
                        onChange={(e)=> setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="lastName">Apellido : </label>
                        <input 
                        type="text" 
                        placeholder="Apellido"
                        className="container__input"
                        value={lastName}
                        onChange={(e)=> setLastName(e.target.value)}  />
                    </div>
                    <div>
                        <label htmlFor="PhoneNumber">Teléfono : </label>
                        <input 
                        type="text"
                        className="container__input"
                        value={phoneNumber}
                        onChange={(e)=> setPhoneNumber(e.target.value)}  />
                    </div>
                    <div className="container__btn">
                        <input 
                        type="submit" 
                        id="container--btnStyle"
                        value="Agregar contacto"/>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddContact;