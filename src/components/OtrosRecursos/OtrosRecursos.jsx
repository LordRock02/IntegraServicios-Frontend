import './OtrosRecursos.css'

import getOtrosRecursos from '../../services/get/getOtrosRecursos'
import { useIntegraStates } from '../utils/global.Context'
import { useEffect } from 'react'


const OtrosRecursos = () => {
  const {state, dispatch} = useIntegraStates()


  const handleReserva = ()=>{
    alert("Para concretar la reserva por favor dirigirse a www.integra-servicios-developer.com")
  }


  useEffect(() => {
    getOtrosRecursos()
    .then((response) => {
        if(response.succes){
          dispatch({type:'SET_LIST_OTROS_RECURSOS',payload:response.responseData})
        }
        else{
          notify('error','Ocurrió un error...','bottom-right')
        }
    }) 
    }, [])

    function formatearPesosColombianos(numero) {
      return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(numero);
    }

  
  return (
    <div className='container-home'>
      <div className='containerRecursos'>
        <div className='list-recursos'>
          <table className='table'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Valor Hora</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {state.otrosRecursosList.sort((a, b) => a.id - b.id).map((recurso)=>{
                return(
                  <tr key={recurso.id}>
                    <td>{recurso.id}</td>
                    <td>{recurso.nombreRecurso}</td>
                    <td>{recurso.estadoRecurso}</td>
                    <td>{formatearPesosColombianos(recurso.valorHora)}</td>
                    <td onClick={handleReserva}><button className='btn-detalles'>Reservar</button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default OtrosRecursos