/* eslint-disable no-unused-vars */
import { Outlet, useNavigate } from 'react-router-dom'
import './InfoUsuario.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { useIntegraStates } from '../utils/global.Context'
import { useEffect } from 'react'
// import { useUsuario } from '../utils/global.Context'

const InfoUsuario = () => {
    const {state, dispatch} = useIntegraStates();
    
    useEffect(()=>{
        const info_usuario = JSON.parse(localStorage.getItem('info_usuario'));
        dispatch({type: 'SET_USER_INFO', payload: info_usuario})
    },[])


    return (
        <div id='containerUsuario'>
            {
                state.userData &&
                <div id='containerInfo' className='sombreado'>
                <h2><strong>Información del Usuario</strong></h2>
                <div className='containerData'>
                    <span id='userIcon'><FontAwesomeIcon icon={faUser} /></span>
                    <table id='tablaInfoUsuario'>
                        <tr>
                            <th>Nombre:</th>
                            <td>{state.userData.nombre}</td>
                        </tr>
                        <tr>
                            <th>Cedula:</th>
                            <td>{state.userData.cedula}</td>
                        </tr>
                        <tr>
                            <th>Correo:</th>
                            <td>{state.userData.email}</td>
                        </tr>
                        <tr>
                            <th>Rol:</th>
                            <td>{state.userData.rol}</td>
                        </tr>
                    </table>
                </div>
            </div>
            }
        </div>
    )
}

export default InfoUsuario