import { useState } from "react";

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
                <h2>AGREGAR CONTACTO</h2>
            </div>
            <div>
                <form onSubmit={onSubmitContact}>
                    <div>
                        <label htmlFor="name">Nombre : </label>
                        <input 
                        type="text" 
                        placeholder="Nombre"
                        value={name}
                        onChange={(e)=> setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="lastName">Apellido : </label>
                        <input 
                        type="text" 
                        placeholder="Apellido"
                        value={lastName}
                        onChange={(e)=> setLastName(e.target.value)}  />
                    </div>
                    <div>
                        <label htmlFor="PhoneNumber">Teléfono : </label>
                        <input 
                        type="text"
                        value={phoneNumber}
                        onChange={(e)=> setPhoneNumber(e.target.value)}  />
                    </div>
                    <div>
                        <input 
                        type="submit" 
                        value="Agregar contacto"/>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddContact;