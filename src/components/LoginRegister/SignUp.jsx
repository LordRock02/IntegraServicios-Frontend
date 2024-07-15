import { useEffect, useState } from "react";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import registerService from "../../services/registrarUsuario";
import {useNavigate } from "react-router-dom";
import ErrorForm from "../ErrorForm/ErrorForm";
import { validarFormulario } from "./validacionesFormulario";

const SignUp = ({formData,setFormData}) => {

    const [errores,setErrores] = useState({
        'nombre':'',
        'apellido':'',
        'email':'',
        'cedula':'',
        'contraseña':''
    });

    const navigate = useNavigate();

    const notify = ()=>{
        toast.success("Registro exitoso!",
        {position:"top-right",autoClose: 2000,onClose:()=>navigate("/login")});
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        setErrores({})

        const formConErrores = validarFormulario(
            formData,
            setErrores,
            registerService,
            notify
        );

          if (!formConErrores) {
            registerService(formData).then(response => {
              notify();
            });
          }
    }

    const handleClick = ()=>{
        navigate("/login");
    }
  return (
    <>
    <div className="containerFormRegister">
            <form action="" className="formLoginRegister" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div className="containerInputs">
                    <div className="form-group">
                        <label htmlFor="nombre" className="col-form-label">Nombre:</label>
                        <input type="text" value={formData.nombre} className="form-control" id="nombre" onChange={(e)=>{setFormData({...formData,nombre:e.target.value})}}/>
                        {errores.nombre?<ErrorForm texto={errores.nombre}/>:''}
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellido" className="col-form-label">Apellido:</label>
                        <input type="text" value={formData.apellido} className="form-control" id="apellido" onChange={(e)=>{setFormData({...formData,apellido:e.target.value})}}/>
                        {errores.apellido?<ErrorForm texto={errores.apellido}/>:''}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="col-form-label">Email:</label>
                        <input type="email" value={formData.email} className="form-control" id="email" onChange={(e)=>{setFormData({...formData,email:e.target.value})}}/>
                        {errores.email?<ErrorForm texto={errores.email}/>:''}
                    </div>
                    <div className="form-group">
                        <label htmlFor="cedula" className="col-form-label">Cedula:</label>
                        <input type="text" value={formData.cedula} className="form-control" id="cedula" onChange={(e)=>{setFormData({...formData,cedula:e.target.value})}}/>
                        {errores.cedula?<ErrorForm texto={errores.cedula}/>:''}
                    </div>
                    <div className="form-group">
                        <label htmlFor="contraseña" className="col-form-label">Contraseña:</label>
                        <input type="password" value={formData.contraseña} className="form-control" id="contraseña" onChange={(e)=>{setFormData({...formData,contraseña:e.target.value})}}/>
                        {errores.contraseña?<ErrorForm texto={errores.contraseña}/>:''}
                    </div>
                </div>
                <div className="divButtons">
                    <button type="submit" className="primaryButton">Sign Up</button>
                    <button type="button" className="secondaryButton" onClick={handleClick}>Sign In</button>
                </div>
            </form>
        </div>
        <ToastContainer/>
        </>
  )
}

export default SignUp