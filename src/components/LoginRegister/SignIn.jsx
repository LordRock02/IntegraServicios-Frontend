import { useState,useEffect } from 'react';
import './LoginRegister.css'
import { useForm } from "react-hook-form";
import { toast,ToastContainer } from "react-toastify";
import { ErrorMessage } from "@hookform/error-message";
import { Navigate,useNavigate } from 'react-router-dom';

import inicioSesionService from "../../services/iniciarSesionUsuario";

const SignIn = ({formData,setFormData}) => {


    const {handleSubmit, register, errors} = useForm();
    const [email,setEmail] = useState('');
    // const [password,setPassword] = useState('');

    const navigate = useNavigate();


    const notifyError = ()=>{
        toast.error("Login Incorrect!",
        {position:"top-right",autoClose: 2000});
    }
    const notifySuccess = ()=>{
        toast.success("Login exitoso!",
        {position:"top-right",autoClose: 2000,onClose:()=>navigate("/home/reserva")});
    }


    const onSubmit = values =>{
        console.log(values)

        inicioSesionService(values)
        .then((response) => {
            console.log(response)
            if(response){
                notifySuccess();
            }
            else{
                notifyError();
            }
        })       

    }

    const handleClick = ()=>{
        navigate("/register");
    }

  return (
    <>
        <div className="homeLoginRegister">
            <div className="containerFormLogin">
                <form action="" className="formLoginRegister" onSubmit={handleSubmit(onSubmit)}>
                    <h2>Sign In</h2>
                    <div className="containerInputs">

                    <div className="form-group">
                        <label htmlFor="apellido" className="col-form-label">Apellido:</label>
                        <input type="text" value={''} className="form-control" id="apellido" onChange={(e)=>{setFormData({...formData,apellido:e.target.value})}}/>
                        {/* {errores.apellido?<ErrorForm texto={errores.apellido}/>:''} */}
                    </div>

                    <div className="form-group">
                        <label htmlFor="apellido" className="col-form-label">Apellido:</label>
                        <input type="text" value={''} className="form-control" id="apellido" onChange={(e)=>{setFormData({...formData,apellido:e.target.value})}}/>
                        {/* {errores.apellido?<ErrorForm texto={errores.apellido}/>:''} */}
                    </div>

                        <p>¿Olvidaste tu contraseña? <a href="" className="">Click aqui</a></p>
                    </div>
                    <div className="divButtons">
                        <button type="submit" className="primaryButton">Sign In</button>
                        <button type="button" className="secondaryButton"
                        onClick={handleClick}
                        >Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    <ToastContainer/>
    </>
  )
}

export default SignIn