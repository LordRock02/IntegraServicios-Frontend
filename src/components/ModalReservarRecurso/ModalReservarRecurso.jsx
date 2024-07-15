import React, { useEffect, useState } from 'react'
import './ModalReservarRecurso.css'
import { registrarReserva } from '../../services/post/registrarReserva';
import { useIntegraStates } from '../utils/global.Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { validarReservaForm } from '../utils/validacionForms/validacionFormRegistroReserva';
import { actualizarRecurso } from '../../services/update/actualizarRecurso';
import getReservasRecurso from '../../services/get/getReservasRecurso';

const ModalReservarRecurso = ({ setShowModalReservarRecurso, recursoReservar, reload, setReload }) => {
    const [errors, setErrors] = useState({});
    const { state, dispatch } = useIntegraStates()
    const [currentDate, setCurrentDate] = useState(undefined)
    const [reservasRecurso, setReservasRecurso] = useState([])
    const [horasFin, setHorasFin] = useState([])
    const [horasInicio, setHorasInicio] = useState([])
    const [idDiaSeleccionado,setIdDiaSeleccionado] = useState(undefined);
    const timeZone = 'America/Bogota'

    const [formData, setFormData] = useState({
        idRecurso: recursoReservar.id,
        idUsuario: state.userData.id,
        estado: 'Activa',
        fechaReserva: undefined,
        horaInicio: '',
        horaFin: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Actualizar el campo específico basado en el evento
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Si el campo cambiado es 'horaInicio', resetea 'horaInicio'
        if (name === 'horaInicio') {
            console.log("Cambiando hora fin vacio")
            setFormData(prevState => ({
                ...prevState,
                horaFin: ''
            }));
            console.log(formData)
        }
    };
    

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validarReservaForm(formData,recursoReservar);
        console.log(validationErrors)
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            registrarReserva(formData)
            .then((response) => {
                if (response.succes) {
                    alert("Reserva registrada exitosamente.")
                    setShowModalReservarRecurso(false)
                    setReload(!reload)
                }
            })
        }
    };

    const getNumeroDia = (diaTexto) => {
        let diaNumero = 0
        switch (diaTexto) {
            case 'Domingo': diaNumero = 0; break;
            case 'Lunes': diaNumero = 1; break;
            case 'Martes': diaNumero = 2; break;
            case 'Miércoles': diaNumero = 3; break;
            case 'Jueves': diaNumero = 4; break;
            case 'Viernes': diaNumero = 5; break;
            case 'Sábado': diaNumero = 6; break;
        }
        return diaNumero;
    }

    const getNombreDia = (diaNumero) => {
        let diaNombre = ''
        switch (diaNumero) {
            case 0: diaNombre = 'Domingo'; break;
            case 1: diaNombre = 'Lunes'; break;
            case 2: diaNombre = 'Martes'; break;
            case 3: diaNombre = 'Miércoles'; break;
            case 4: diaNombre = 'Jueves'; break;
            case 5: diaNombre = 'Viernes'; break;
            case 6: diaNombre = 'Sábado'; break;
        }
        return diaNombre;
    }

    const formatearFecha = (fecha) => {
        const anio = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');
        return `${anio}-${mes}-${dia}`;
    };

    const generarListaHorario = (tipo) => {

        let numeroDiaActual = currentDate.getDay()==0?7:currentDate.getDay();
        let horario = recursoReservar.horarioDisponible.find((horario)=>horario.dia.id == numeroDiaActual);

        let horaInicio = horario.horaInicio;
        let horaFin = horario.horaFin;

        let horaAux = horaInicio;
        let minutosAumento = recursoReservar.unidad.tiempoMinimo;
        let horasArr = []
        

        if (tipo == 'inicio') {
            while(horaAux!==horaFin){
                let reserva = null
                const horaInicioDate = new Date();
                horaInicioDate.setHours(horaAux.split(':')[0], horaAux.split(':')[1], 0);
                let fechaString = formatearFecha(currentDate);
                horaInicioDate.setFullYear(fechaString.split("-")[0])
                horaInicioDate.setMonth(parseInt(fechaString.split("-")[1])-1)
                horaInicioDate.setDate(fechaString.split("-")[2])


                const fechaHoraActual = new Date();

                reserva = reservasRecurso.find((recurso)=>recurso.horaInicio==horaAux);

                if(reserva){
                    horaAux=reserva.horaFin;
                    
                }
                else{
                    if(horaInicioDate>=fechaHoraActual){
                        horasArr.push(horaAux);
                    }

                    const [horas, minutos] = horaAux.split(':').map(Number);
                    let minutosTotales = horas * 60 + minutos;
                    minutosTotales += minutosAumento;
                    const nuevasHoras = Math.floor(minutosTotales / 60) % 24;
                    const nuevosMinutos = minutosTotales % 60;
                    horaAux = `${nuevasHoras.toString().padStart(2, '0')}:${nuevosMinutos.toString().padStart(2, '0')}`;
                }
            }
            return horasArr;
        }

        let horarioFinArr = []
        if (tipo == 'fin' && formData.horaInicio) {
            const [horas, minutos] = formData.horaInicio.split(':').map(Number);
            let minutosTotales = horas * 60 + minutos;
            minutosTotales += minutosAumento;
            const nuevasHoras = Math.floor(minutosTotales / 60) % 24;
            const nuevosMinutos = minutosTotales % 60;
            horaAux = `${nuevasHoras.toString().padStart(2, '0')}:${nuevosMinutos.toString().padStart(2, '0')}`;

            while(true){
                let reserva = null
                reserva = reservasRecurso.find((recurso)=>recurso.horaInicio==horaAux);
                if(reserva){
                    horarioFinArr.push(horaAux);
                    return horarioFinArr;
                }
                else{
                    let multiplo = recursoReservar.unidad.tiempoMaximo / recursoReservar.unidad.tiempoMinimo;
                    if(horarioFinArr.length==multiplo){
                        return horarioFinArr;
                    }
                    horarioFinArr.push(horaAux);
                }

                if(horaAux==horaFin){
                    return horarioFinArr;
                }

                const [horas, minutos] = horaAux.split(':').map(Number);
                let minutosTotales = horas * 60 + minutos;
                minutosTotales += minutosAumento;
                const nuevasHoras = Math.floor(minutosTotales / 60) % 24;
                const nuevosMinutos = minutosTotales % 60;
                horaAux = `${nuevasHoras.toString().padStart(2, '0')}:${nuevosMinutos.toString().padStart(2, '0')}`;
        
            }
            return horarioFinArr;
        }
        return []
    }

    useEffect(() => {
        console.log(formData)
        getReservasRecurso(recursoReservar.id)
            .then((response) => {
                if (response.succes) {
                    setReservasRecurso(response.responseData.filter((r)=>["Activa","Prestamo"].includes(r.estado)))
                }
            })
        console.log(`formData: ${formData}`)
    }, [horasInicio])

    useEffect(()=>{
        const fechaActualDate = new Date();

        setCurrentDate(fechaActualDate);
        setFormData({ ...formData, 'fechaReserva':formatearFecha(fechaActualDate)})

    },[reservasRecurso])


    return (
        <div className='background-modal'>
            <div className='containerForm'>
                <FontAwesomeIcon icon={faXmark} className='closeModal' onClick={() => setShowModalReservarRecurso(false)} />
                <h3>Reservar Recurso</h3>
                {/* <FontAwesomeIcon icon={faXmark} /> */}
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="">Nombre</label>
                        <h5>{recursoReservar.nombre}</h5>
                    </div>
                    <div>
                        <label htmlFor="">Unidad</label>
                        <h5>{recursoReservar.unidad.nombre}</h5>
                    </div>
                    <div>
                        <label htmlFor="">Dias Disponible</label>
                        <h5>{recursoReservar.horarioDisponible.map(horario => horario.dia.nombre).join(', ')}</h5>
                    </div>
                    <div className={errors.fechaReserva ? 'error-field' : ''}>
                        <div className='containerCalendar'>
                            <label htmlFor="">Fecha</label>
                            {currentDate && <input type="date" value={currentDate.toISOString().split('T')[0]} onChange={(e) => { setCurrentDate(new Date(e.target.valueAsDate.getTime() + (300 * 60 * 1000)));setFormData({ ...formData, 'fechaReserva': formatearFecha(new Date(e.target.valueAsDate.getTime() + (300 * 60 * 1000)) )})}} />}
                        </div>
                        {errors.fechaReserva && <span className="error-message">{errors.fechaReserva}</span>}
                    </div>
                    <div className={errors.fechaReserva ? 'error-field' : ''}>
                        <div className='containerCalendar'>
                            <label htmlFor="">Horario</label>
                            {currentDate && recursoReservar.horarioDisponible.map((horario)=>horario.dia.id).includes(currentDate.getDay()==0?7:currentDate.getDay()) && 
                            <div className='horasDisponible'>
                                <div>
                                    <span>{getNombreDia(currentDate.getDay())}</span>
                                    <select name="horaInicio" id="" onChange={handleChange}>
                                        <option defaultValue hidden>{formData.horaInicio!=''?formData.horaInicio:'Inicio'}</option>
                                        {generarListaHorario('inicio').map((horario, index) => {
                                            return (
                                                <option key={index} value={horario}>{horario}</option>
                                            )
                                        })}
                                    </select>
                                    :
                                    <select name="horaFin" id="" onChange={handleChange} value={formData.horaFin}>
                                        <option defaultValue hidden>{formData.horaFin!=""?formData.horaFin:'Fin'}</option>
                                        {generarListaHorario('fin').map((horario, index) => {
                                            return (
                                                <option key={index}>{horario}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>}
                        </div>
                        {errors.horario && <span className="error-message">{errors.horario}</span>}
                    </div>
                    <div>
                        <button className='btn-signin'>Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalReservarRecurso