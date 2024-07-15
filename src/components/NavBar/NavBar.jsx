/* eslint-disable no-unused-vars */
import { Outlet, useNavigate, Link } from 'react-router-dom'
import './NavBar.css'
import Logo from '../../assets/Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDigg } from '@fortawesome/free-brands-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faHandshake } from '@fortawesome/free-solid-svg-icons'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faCubes,faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useIntegraStates } from '../utils/global.Context'

const NavBar = () => {

    const [btnSelected,setBtnSelected] = useState({
        "info-usuario": "unselected",
        "recursos": "unselected",
        "otrosRecursos": "unselected",
        "reservas": "unselected",
        "prestamos": "unselected",
        "devoluciones": "unselected",
        "usuarios": "unselected",
        "unidades": "unselected"
    })
    const {state, dispatch} = useIntegraStates();
    const navigate = useNavigate();

    useEffect(() => {

        console.log("Renderiza navbar")

        const info_usuario = JSON.parse(localStorage.getItem('info_usuario'));
        dispatch({type: 'SET_USER_INFO', payload: info_usuario})

        const lastSelectedButton = localStorage.getItem('lastSelectedButton');
        if (lastSelectedButton) {
            setBtnSelected(JSON.parse(lastSelectedButton));
        } else {
            setBtnSelected({
                ...btnSelected,
                "recursos": "selected"
            });
        }
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        const previousBtnSelected = Object.keys(btnSelected).find(
            (btnName) => btnSelected[btnName] === "selected"
        ); // Identificar el botón previamente seleccionado
        const clickedBtnName = e.target.name;

        setBtnSelected({
            ...btnSelected,
            [previousBtnSelected]: "unselected", // Deseleccionar el botón anterior
            [clickedBtnName]: "selected", // Seleccionar el nuevo botón
        });

        localStorage.setItem('lastSelectedButton', JSON.stringify({
            ...btnSelected,
            [previousBtnSelected]: "unselected",
            [clickedBtnName]: "selected"
        }));

        navigate(clickedBtnName);
    };

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('lastSelectedButton');
        localStorage.removeItem('info_usuario');
        navigate('/');
    };

    return (
        <>
            <nav>
                <Link to='/' className='logo'><FontAwesomeIcon icon={faDigg} className='icono' /><strong>Integra servicios</strong></Link>
                <ul className="nav__links">
                    <Link name='info-usuario' to='/info-usuario' className={`option ${btnSelected['info-usuario']}`} id='userOption' onClick={handleClick} ><FontAwesomeIcon icon={faUser} className='icono'/>Mi cuenta</Link>
                    <Link name='recursos' to='/recursos' className={`option ${btnSelected['recursos']}`} id='recursosOption' onClick={handleClick} ><FontAwesomeIcon icon={faList} className='icono' />Recursos</Link>
                    {
                        state.userData && state.userData.rol == 'ROLE_USER' &&
                        <Link name='otrosRecursos' to='/otrosRecursos' className={`option ${btnSelected['otrosRecursos']}`} id='otrosRecursosOption' onClick={handleClick} ><FontAwesomeIcon icon={faEllipsis} className='icono' />Otros Recursos</Link>
                    }
                    <Link name='reservas' to='/reservas' className={`option ${btnSelected['reservas']}`} id='reservasOption' onClick={handleClick}><FontAwesomeIcon icon={faCalendarCheck} className='icono' />Reservas</Link>
                    {
                        state.userData && state.userData.rol == 'ROLE_USER' &&
                        <>
                            <Link name='prestamos' to='/prestamos' className={`option ${btnSelected['prestamos']}`} id='prestamosOption' onClick={handleClick}><FontAwesomeIcon icon={faHandshake} className='icono' />Prestamos</Link>
                            <Link name='devoluciones' to='/devoluciones' className={`option ${btnSelected['devoluciones']}`} id='devolucionesOption' onClick={handleClick}><FontAwesomeIcon icon={faRotateLeft} className='icono' />Devoluciones</Link>
                        </>
                        
                    }
                    {
                        state.userData && state.userData.rol == 'ROLE_ADMIN' &&
                        <>
                            <Link name='usuarios' to='/usuarios' className={`option ${btnSelected['usuarios']}`} id='usuariosOption' onClick={handleClick}><FontAwesomeIcon icon={faUsers} className='icono' />Usuarios</Link>
                            <Link name='unidades' to='/unidades' className={`option ${btnSelected['unidades']}`} id='unidadesOption' onClick={handleClick}><FontAwesomeIcon icon={faCubes} className='icono' />Unidades</Link>
                        </>
                    }
                </ul>
                <Link to='/' className="option unselected" id='signOutOption' onClick={cerrarSesion} ><FontAwesomeIcon icon={faRightFromBracket} className='icono' />Cerrar Sesion</Link>
            </nav>
            <Outlet />
        </>

    )
}

export default NavBar