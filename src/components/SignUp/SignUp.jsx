import { useNavigate } from 'react-router-dom';
import './SignUp.css'
import { useState } from 'react';
import {validarSignUpForm} from '../utils/validacionForm'
import { ToastContainer, toast } from 'react-toastify';
import {registrarUsuario} from '../../services/post/registrarUsuario'
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    contraseña: '',
    cedula: '',
  });
  const [errors, setErrors] = useState({});

  const notify = (orden,mensaje,posicion)=>{
    if(orden=='success'){
      toast.success(mensaje,
      {position:posicion,autoClose: 500,onClose:()=>navigate('/login')});
    }
    else{
      toast.error(mensaje,
      {position:posicion,autoClose: 1000});
    }
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validarSignUpForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      registrarUsuario(formData)
        .then((response) => {
            console.log(response)
            if(response.succes){
              notify('success','Usuario creado!','bottom-right')
            }
            else{
              notify('error',response.error,'bottom-right')
            }
        }) 
    }
  };


  return (
    <div className='homeSignInSignUp'>
    <div className='containerSignUp'>
      <div className='containerForm'>
        <h3>Sign Up</h3>
        <form action="" onSubmit={handleSubmit}>
          <div className={errors.fullname ? 'error-field' : ''}>
            <label htmlFor="">Fullname</label>
            <input
              type="text"
              placeholder='Fullname'
              value={formData.fullname}
              onChange={handleChange}
              name="fullname"
            />
            {errors.fullname && <span className="error-message">{errors.fullname}</span>}
          </div>
          <div className={errors.email ? 'error-field' : ''}>
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              name="email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className={errors.contraseña ? 'error-field' : ''}>
            <label htmlFor="">contraseña</label>
            <input
              type="password"
              placeholder='Contraseña'
              value={formData.contraseña}
              onChange={handleChange}
              name="contraseña"
            />
            {errors.contraseña && <span className="error-message">{errors.email}</span>}
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
          <div>
            <button className='btn-signin'>Sign Up</button>
          </div>
        </form>
      </div>
      <div className='containerWelcome'>
        <div>
          <h2>Welcome to register</h2>
          <p>Do you have an account?</p>
          <button onClick={()=>navigate('/login')}>Sign In</button>
        </div>
      </div>
      <ToastContainer/>
    </div>
    </div>
  )
}

export default SignUp