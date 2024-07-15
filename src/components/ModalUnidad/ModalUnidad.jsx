import React, { useEffect, useState } from 'react'
import './ModalUnidad.css'
import getUnidades from '../../services/get/getUnidades';
import { useIntegraStates } from '../utils/global.Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import { registrarUnidad } from '../../services/post/registrarUnidad';
import { actualizarUnidad } from '../../services/update/actualizarUnidad';
import { validarUnidadForm } from '../utils/validacionForms/validacionFormRegistroUnidad';

const ModalUnidad = ({setShowModalUnidad,idUnidadEditar,reload,setReload}) => {
    const [formData, setFormData] = useState({
        nombre: '',
        tipo:'',
        tiempoMinimo: 0,
        tiempoMaximo: 0,
        horaInicio: '',
        horaFinal: '',
        diasDisponibles: [],
    });
    const [errors, setErrors] = useState({});
    const {state, dispatch} = useIntegraStates();
    const [tituloModal,setTituloModal] = useState("Registrar recurso")

    const getMinutosMinimo = ()=>{
        let minutosMinimo = 10;
        let arr = Array.from({length: 6}, (_, index) => minutosMinimo * (index + 1));
        return arr
    }

    const getMinutosMaximo = ()=>{
        let minimo = formData.tiempoMinimo;
        let arr = []
        if(formData.tiempoMinimo!=''){
            arr = Array.from({length: 7}, (_, index) => minimo * (index + 2));
        }
        return arr
    }

    const getHorasApertura = ()=>{
        const horas = [];
        for (let hora = 6; hora <= 23; hora++) {
            for (let minuto = 0; minuto < 60; minuto += 30) {
                const horaFormateada = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
                if(horaFormateada!=formData.horaFinal){
                    horas.push(horaFormateada);
                }

            }
        }
        return horas;
    }

    const getHorasCierre = ()=>{
        const horas = [];
        for (let hora = 6; hora <= 23; hora++) {
            for (let minuto = 0; minuto < 60; minuto += 30) {
                const horaFormateada = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
                if(horaFormateada!=formData.horaInicio){
                    horas.push(horaFormateada);
                }
            }
        }
        return horas;
    }

    const handleDiaDisponible = (e)=>{
        let dia = parseInt(e.target.getAttribute('name'));
        let listaDias = []
        if(!formData.diasDisponibles.includes(dia)){
            listaDias = [...formData.diasDisponibles];
            listaDias.push(dia);
            setFormData((prevFormData) => ({
                ...prevFormData,
                diasDisponibles:listaDias
            }));
        }
        else{
            setFormData((prevFormData) => ({
                ...prevFormData,
                diasDisponibles:formData.diasDisponibles.filter((d)=>d!=dia)
            }));
        }
    }

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData)
        const validationErrors = validarUnidadForm(formData);
        console.log(validationErrors)
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log(formData)
            console.log("Llamando registrar recurso")
            if(idUnidadEditar==undefined){
                registrarUnidad(formData)
                .then((response) => {
                    if(response.succes){
                        console.log(response)
                        alert("Usuario registrada correctamente.")
                        setShowModalUnidad(false)
                        setReload(!reload);
                    }
                }) 
            }
            else{
                actualizarUnidad(formData)
                .then((response) => {
                    if(response.succes){
                        alert("Unidad modificada correctamente.")
                        console.log(response)
                        setShowModalUnidad(false)
                        setReload(!reload);
                    }
                }) 
            }
        }
    };

    useEffect(() => {
        setTituloModal("Registrar unidad")
        getUnidades()
        .then((response) => {
            if(response.succes){
                dispatch({type:'SET_LIST_UNIDADES',payload:response.responseData})
            }
        })

        //Si viene una unidad
        if(idUnidadEditar!=undefined){
            setTituloModal("Editar unidad")
            const unidad = state.unidadesList.find((u)=>u.id==idUnidadEditar);
            console.log(unidad)
            setFormData({ ...formData, 'nombre': unidad.nombre,'tipo':unidad.tipo,'tiempoMinimo':unidad.tiempoMinimo,'tiempoMaximo':unidad.tiempoMaximo,'horaInicio':unidad.horaInicio,'horaFinal':unidad.horaFinal,'diasDisponibles':unidad.diasDisponibles.map((u)=>u.id),'id':unidad.id});
        }
            
    }, [])


    return (
    <div className='background-modal'>
        <div className='containerForm'>
            <FontAwesomeIcon icon={faXmark} className='closeModal' onClick={()=>setShowModalUnidad(false)}/>
            <h3>{tituloModal}</h3>
            {/* <FontAwesomeIcon icon={faXmark} /> */}
            <form action="" onSubmit={handleSubmit}>
                <div className={errors.nombre ? 'error-field' : ''}>
                    <label htmlFor="">Nombre</label>
                    <input
                        type="text"
                        placeholder='Nombre'
                        value={formData.nombre}
                        onChange={handleChange}
                        name="nombre"
                    />
                    {errors.nombre && <span className="error-message">{errors.nombre}</span>}
                </div>
                <div className={errors.tipo ? 'error-field' : ''}>
                    <label htmlFor="">Tipo</label>
                    <select name="tipo" onChange={handleChange} value={formData.tipo}>
                        <option defaultValue hidden>Seleccionar</option>
                        <option>Espacios físicos</option>
                        <option>Equipos y software</option>
                        <option>Libros, artículos, etc.</option>
                        <option>Cultural</option>
                        <option>Espacios de Enseñanza y Aprendizaje</option>
                    </select>
                    {errors.tipo && <span className="error-message">{errors.tipo}</span>}
                </div>
                <div className={errors.nombre ? 'error-field' : ''}>
                    <label htmlFor="">Horario</label>
                    <div className='divHorario'>
                        <span>Apertura:</span>
                        <select name="horaInicio" id="" onChange={handleChange} value={formData.horaInicio}>
                            <option defaultValue hidden>Seleccionar</option>
                            {
                                getHorasApertura().map((hora,index)=>{
                                    return (<option key={index}>{hora}</option>)
                                })
                            }
                        </select>
                        <span>Cierre:</span>
                        <select name="horaFinal" id="" onChange={handleChange} value={formData.horaFinal}>
                            <option defaultValue hidden>Seleccionar</option>
                            {
                                getHorasCierre().map((hora,index)=>{
                                    return (<option key={index}>{hora}</option>)
                                })
                            }
                        </select>
                    </div>
                    {errors.horario && <span className="error-message">{errors.horario}</span>}
                </div>
                <div className={errors.nombre ? 'error-field' : ''}>
                    <label htmlFor="">Tiempo prestamo (Minutos)</label>
                    <div className='divDisponibilidad'>
                        <span>Minimo:</span>
                        <select name="tiempoMinimo" id="" onChange={handleChange} value={formData.tiempoMinimo}>
                            <option defaultValue hidden>Seleccionar</option>
                            {
                                getMinutosMinimo().map((minuto,index)=>{
                                    return (<option key={index}>{minuto}</option>)
                                })
                            }
                        </select>
                        <span>Maximo:</span>
                        <select name="tiempoMaximo" id="" onChange={handleChange} value={formData.tiempoMaximo}>
                            <option defaultValue hidden>Seleccionar</option>
                            {
                                getMinutosMaximo().map((minuto,index)=>{
                                    return (<option key={index}>{minuto}</option>)
                                })
                            }
                        </select>
                    </div>
                    {errors.prestamo && <span className="error-message">{errors.prestamo}</span>}
                </div>
                <div className={errors.nombre ? 'error-field' : ''}>
                    <label htmlFor="">Dias disponibilidad</label>
                    <div className='diasDisponible'>
                        <span name={1} className={formData.diasDisponibles.includes(1)?'selected':''} onClick={handleDiaDisponible}>Lunes</span>
                        <span name={2} className={formData.diasDisponibles.includes(2)?'selected':''} onClick={handleDiaDisponible}>Martes</span>
                        <span name={3} className={formData.diasDisponibles.includes(3)?'selected':''} onClick={handleDiaDisponible}>Miércoles</span>
                        <span name={4} className={formData.diasDisponibles.includes(4)?'selected':''} onClick={handleDiaDisponible}>Jueves</span>
                        <span name={5} className={formData.diasDisponibles.includes(5)?'selected':''} onClick={handleDiaDisponible}>Viernes</span>
                        <span name={6} className={formData.diasDisponibles.includes(6)?'selected':''} onClick={handleDiaDisponible}>Sábado</span>
                        <span name={7} className={formData.diasDisponibles.includes(7)?'selected':''} onClick={handleDiaDisponible}>Domingo</span>
                    </div>
                    {errors.dias && <span className="error-message">{errors.dias}</span>}
                </div>
                <div>
                    {
                        idUnidadEditar==undefined?<button className='btn-signin'>Registrar</button>:<button className='btn-signin'>Guardar</button>
                    }
                    
                    
                </div>
            </form>
      </div>
    </div>
  )
}

export default ModalUnidad