import React, { useEffect, useState } from 'react'
import './ModalEditarRecurso.css'
import getUnidades from '../../services/get/getUnidades';
import { useIntegraStates } from '../utils/global.Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import { validarRecursoForm } from '../utils/validacionForms/validacionFormRegistroRecurso';
import { actualizarRecurso } from '../../services/update/actualizarRecurso';

const ModalEditarRecurso = ({setShowModalEditarRecurso,recursoEditar,reload,setReload}) => {
    const [formData, setFormData] = useState({
        nombre: '',
        unidad:undefined,
        horarioDisponible:[]
    });
    const [errors, setErrors] = useState({});
    const {state, dispatch} = useIntegraStates()
    const [unidad,setUnidad] = useState(undefined)
    const [diasUnidad,setDiasUnidad] = useState([])
    const [diasSeleccionados,setDiasSeleccionados] = useState([])

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validarRecursoForm(formData);
        console.log(validationErrors)
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log(formData)
            actualizarRecurso(formData)
                .then((response) => {
                    if(response.succes){
                        console.log(response)
                        alert("Recurso modificado correctamente.")
                        setShowModalEditarRecurso(false)
                        setReload(!reload)
                    }
                }) 
        }
    };

    const handleUnidad = (e)=>{
        let unidadSeleccionada = e.target.value;
        const unidadFiltrada = state.unidadesList.find((u)=>u.nombre==unidadSeleccionada);
        setFormData({ ...formData, unidad:unidadFiltrada.id,horarioDisponible:[]});
        setDiasUnidad(unidadFiltrada.diasDisponibles)
        setUnidad(unidadFiltrada)
        setDiasSeleccionados([])
    }

    const handleDia = (e)=>{
        let dia = e.target.textContent ;
        if(!diasSeleccionados.includes(dia)){
            setDiasSeleccionados([...diasSeleccionados,dia])
            formData.horarioDisponible.push({
                dia:getNumeroDia(dia),
                horaInicio:"",
                horaFin:""
            })
        }
        else{
            setDiasSeleccionados(diasSeleccionados.filter((d)=>d!==dia))
            formData.horarioDisponible = formData.horarioDisponible.filter((horario)=>horario.dia!==getNumeroDia(dia))
        }
    }

    const handleChangeHoraInicio = (e,infoDia)=>{
        let valorHora = e.target.value;
        infoDia.horaInicio=valorHora;
    }

    const handleChangeHoraFin = (e,infoDia)=>{
        let valorHora = e.target.value;
        infoDia.horaFin=valorHora;
    }

    const getNumeroDia = (diaTexto)=>{
        let diaNumero = 0
        switch(diaTexto){
            case 'Lunes': diaNumero = 1; break;
            case 'Martes': diaNumero = 2; break;
            case 'Miércoles': diaNumero = 3; break;
            case 'Jueves': diaNumero = 4; break;
            case 'Viernes': diaNumero = 5; break;
            case 'Sábado': diaNumero = 6; break;
            case 'Domingo': diaNumero = 7; break;
        }
        return diaNumero;
    }

    const getNombreDia = (diaNumero)=>{
        let diaNombre = ''
        switch(diaNumero){
            case 1: diaNombre = 'Lunes'; break;
            case 2: diaNombre = 'Martes'; break;
            case 3: diaNombre = 'Miércoles'; break;
            case 4: diaNombre = 'Jueves'; break;
            case 5: diaNombre = 'Viernes'; break;
            case 6: diaNombre = 'Sábado'; break;
            case 7: diaNombre = 'Domingo'; break;
        }
        return diaNombre;
    }

    const generarListaHorario = (tipo)=>{
        var inicio = new Date('2000-01-01T' + unidad.horaInicio);
        var fin = new Date('2000-01-01T' + unidad.horaFinal);

        var horarios = [];

        var hora = inicio;
        while (hora <= fin) {
            var horaActual = hora.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
            horarios.push(horaActual);

            hora.setMinutes(hora.getMinutes() + unidad.tiempoMinimo);
        }

        if(tipo=='fin'){
            horarios.shift()
            return horarios;
        }
        horarios.pop()
        return horarios;
    }

    const setHorarioDefault = ()=>{
        let horario = []
        unidad.diasDisponibles.forEach((dia)=>{
            horario.push({
                dia:dia.id,
                horaInicio:unidad.horaInicio,
                horaFin:unidad.horaFinal
            })
        })
        setFormData({...formData,['horarioDisponible']:horario})
        setDiasSeleccionados(unidad.diasDisponibles.map((dia)=>dia.nombre));
    }

    useEffect(() => {
        
        getUnidades()
        .then((response) => {
            if(response.succes){
                dispatch({type:'SET_LIST_UNIDADES',payload:response.responseData})
            }
        }) 

        let recursoEntrada = {
            nombre : recursoEditar.nombre,
            unidad:recursoEditar.unidad.id,
            horarioDisponible:[],
            id:recursoEditar.id
        };

        setFormData((prevFormData) => ({
            ...prevFormData,
            ...recursoEntrada,
          }));

        setDiasUnidad(recursoEditar.unidad.diasDisponibles)
        setUnidad(recursoEditar.unidad)
        setDiasSeleccionados(recursoEditar.horarioDisponible.map((horario)=>horario.dia.nombre))

        let horarioArr= []
        console.log(recursoEditar.horarioDisponible)
        recursoEditar.horarioDisponible.forEach((horario)=>{
            console.log(horario)
            // console.log(dia)
            horarioArr.push({
                dia:horario.dia.id,
                horaInicio:horario.horaInicio,
                horaFin:horario.horaFin
            })
        })
        console.log(horarioArr)
        setFormData((prevFormData) => ({
            ...prevFormData,
            horarioDisponible: horarioArr,
          }));

        console.log(formData)
        

    }, [])


    return (
    <div className='background-modal'>
        <div className='containerForm'>
            <FontAwesomeIcon icon={faXmark} className='closeModal' onClick={()=>setShowModalEditarRecurso(false)}/>
            <h3>Editar Recurso</h3>
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
                <div className={errors.unidad ? 'error-field' : ''}>
                    <label htmlFor="">Unidad</label>
                    <select onChange={handleUnidad} name="unidad" id="" value={unidad?unidad.nombre:''}>
                        <option defaultValue hidden>Seleccionar</option>
                        {state.unidadesList.map((unidad)=>{
                            return(
                                <option key={unidad.id}>{unidad.nombre}</option>
                            )
                        })}
                    </select>
                    {errors.unidad && <span className="error-message">{errors.unidad}</span>}
                </div>
                { unidad && <div className={errors.horario ? 'error-field' : ''}>
                    <label htmlFor="">Horario <span className='btn-default' onClick={setHorarioDefault}>Default</span></label>
                    <div className='diasDisponible'>
                        {diasUnidad.map((dia)=>{
                            return (
                                <span onClick={handleDia} key={dia.id} className={formData.horarioDisponible.filter((d)=>d.dia==dia.id).length>0?'diaSeleccionado':''}>{dia.nombre}</span>
                            )
                        })}
                    </div>
                    {formData.horarioDisponible.length>0 && <div className='horasDisponible'>
                        {formData.horarioDisponible.map((horario,index)=>{
                            return(
                                <div key={index}>
                                    <span key={index}>{getNombreDia(horario.dia)}</span>
                                    <select name="" id="" onChange={(e)=>{handleChangeHoraInicio(e,horario)}}>
                                        <option defaultValue hidden>{horario.horaInicio?horario.horaInicio:'Inicio'}</option>
                                        {generarListaHorario('inicio').map((horario,index)=>{
                                            return(
                                                <option key={index}>{horario}</option>
                                            )
                                        })}
                                    </select>
                                    :
                                    <select name="" id="" onChange={(e)=>{handleChangeHoraFin(e,horario)}}>
                                        <option defaultValue hidden>{horario.horaFin!=''?horario.horaFin:'Fin'}</option>
                                        {generarListaHorario('fin').map((horario,index)=>{
                                            return(
                                                <option key={index}>{horario}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            )
                        })}
                    </div>}
                    {errors.horario && <span className="error-message">{errors.horario}</span>}
                </div>}
                <div>
                    <button className='btn-signin'>Guardar</button>
                </div>
            </form>
      </div>
    </div>
  )
}

export default ModalEditarRecurso