import React, { useEffect, useState } from 'react'
import './ModalEditarUsuario.css'
import getUnidades from '../../services/get/getUnidades';
import { useIntegraStates } from '../utils/global.Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import { validarEditarUsuarioForm } from '../utils/validacionForms/validacionFormEditarUsuario';
import { actualizarUsuario } from '../../services/update/actualizarUsuario';

const ModalEditarUsuario = ({setShowModalEditarUsuario,reload,setReload,usuarioEditar}) => {
    const [formData, setFormData] = useState({
        fullname: '',
        cedula:'',
        email:'',
        rol:''
    });
    const [errors, setErrors] = useState({});
    const {state, dispatch} = useIntegraStates()

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validarEditarUsuarioForm(formData);
        console.log(validationErrors)
        setErrors(validationErrors);
        
        if (Object.keys(validationErrors).length === 0) {
            console.log(formData)
            actualizarUsuario(formData)
                .then((response) => {
                    if(response.succes){
                        console.log(response)
                        setShowModalEditarUsuario(false)
                        alert("Usuario modificado correctamente.")
                        setReload(!reload)
                    }
                }) 
        }
    };

    const getRol=(idRol)=>{
        switch(idRol){
            case 1:
                return "ADMIN"
            case 2:
                return "USER"
            case 3:
                return "ALIADO"
        }
    }

    useEffect(() => {
        console.log(usuarioEditar)
        if(usuarioEditar){
            setFormData(
                {
                    ...formData,
                    id:usuarioEditar.id,
                    fullname:usuarioEditar.fullname,
                    cedula:usuarioEditar.cedula,
                    email:usuarioEditar.email,
                    rol:usuarioEditar.rol
                }
            )
        }

    }, [])


    return (
    <div className='background-modal'>
        <div className='containerForm'>
            <FontAwesomeIcon icon={faXmark} className='closeModal' onClick={()=>setShowModalEditarUsuario(false)}/>
            <h3>Editar Usuario</h3>
            {/* <FontAwesomeIcon icon={faXmark} /> */}
            <form action="" onSubmit={handleSubmit}>
                <div className={errors.fullname ? 'error-field' : ''}>
                    <label htmlFor="">Nombre</label>
                    <input
                        type="text"
                        placeholder='Nombre'
                        value={formData.fullname}
                        onChange={handleChange}
                        name="fullname"
                    />
                    {errors.fullname && <span className="error-message">{errors.fullname}</span>}
                </div>
                <div className={errors.cedula ? 'error-field' : ''}>
                    <label htmlFor="">Cedula</label>
                    <input
                        type="text"
                        placeholder='Cedula'
                        value={formData.cedula}
                        onChange={handleChange}
                        name="cedula"
                    />
                    {errors.cedula && <span className="error-message">{errors.cedula}</span>}
                </div>
                <div className={errors.email ? 'error-field' : ''}>
                    <label htmlFor="">Email</label>
                    <input
                        type="text"
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                        name="email"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className={errors.rol ? 'error-field' : ''}>
                    <label htmlFor="">Rol</label>
                    <select name="rol" id="" onChange={handleChange}>
                        <option defaultValue hidden>{formData.rol?getRol(formData.rol):'Seleccionar'}</option>
                        <option value="1">ADMIN</option>
                        <option value="2">USER</option>
                        <option value="3">ALIADO</option>
                    </select>
                    {errors.rol && <span className="error-message">{errors.rol}</span>}
                </div>
                <div>
                    <button className='btn-signin'>Guardar</button>
                </div>
            </form>
      </div>
    </div>
  )
}

export default ModalEditarUsuario