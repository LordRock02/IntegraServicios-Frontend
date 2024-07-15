import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ModalDetallesRecurso.css'
import {faXmark} from '@fortawesome/free-solid-svg-icons'


const ModalDetallesRecurso = ({setShowDetallesRecurso,recursoDetalles}) => {
    return(
        <div className='background-modal'>
            <div className='containerDetalles'>
            <FontAwesomeIcon icon={faXmark} className='closeModal' onClick={()=>setShowDetallesRecurso(false)}/>
                <h3>{recursoDetalles.nombre}</h3>
                <div className='horariosRecurso'>
                    <h4>Horario del recurso:</h4>
                    <div>
                        {
                            recursoDetalles.horarioDisponible.map((horario)=>{
                                return (
                                    <div className='horarioDia' key={horario.id}>
                                        <p>{horario.dia.nombre} - </p>
                                        <span>{horario.horaInicio}</span> : 
                                        <span>{horario.horaFin}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='horariosUnidad'>
                    <h4>Unidad: {recursoDetalles.unidad.nombre}</h4>
                    <p>Hora inicio: {recursoDetalles.unidad.horaInicio}</p>
                    <p>Hora fin: {recursoDetalles.unidad.horaFinal}</p>
                    <p>Tiempo min: {recursoDetalles.unidad.tiempoMinimo}</p>
                    <p>Tiempo max: {recursoDetalles.unidad.tiempoMaximo}</p>
                </div>
            </div>
        </div>
        
    )

}

export default ModalDetallesRecurso