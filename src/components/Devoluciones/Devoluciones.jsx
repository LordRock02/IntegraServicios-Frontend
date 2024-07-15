import getReservas from '../../services/get/getReservas';
import { useIntegraStates } from '../utils/global.Context';
import { useEffect, useState } from 'react';
import { ToastContainer, toast} from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPencil, faBan} from '@fortawesome/free-solid-svg-icons'
import './Devoluciones.css'
import cancelReserva from '../../services/delete/cancelReserva';


const Devoluciones = () => {

  const {state, dispatch} = useIntegraStates()
  
  const [reload, setReload] = useState(true)


  const notify = (orden,mensaje,posicion)=>{
    if(orden=='success'){
      toast.success(mensaje,
      {position:posicion,autoClose: 500,onClose:()=>setReload(!reload)});
    }
    else{
      toast.error(mensaje,
      {position:posicion,autoClose: 1000});
    }
  }

  const handleCancel =  (idReserva)=>{
    if(confirm("¿Está seguro de cancelar la reserva?")){
      cancelReserva(idReserva)
      .then((response)=>{
        if(response.success){
          notify('success','Reserva cancelada!','bottom-right')
        }
        else{
          notify('error','Ocurrió un error...','bottom-right')
        }
      })
    }
  }

  useEffect(() =>{
    getReservas()
    .then(response => {
      if(response.succes){
        let reservas = []
        if(state.userData){
          if(state.userData.rol == 'ROLE_ADMIN'){
            reservas=response.responseData;
          }
          if(state.userData.rol == 'ROLE_USER'){
            reservas = response.responseData.filter((r)=>r.usuario.id == state.userData.id && r.estado=="Devolucion");
          }
        }
        dispatch({type: 'SET_LIST_RESERVAS', payload: reservas})
        console.log(state.reservasList)
      }
    })
  },[state.userData,reload])

  return (
    <div className='container-home'>
      <div className='containerReservas'>
        <div className='list-reservas'>
          <table className='table'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Recurso</th>
                <th>Usuario</th>
                <th>Fecha Reserva</th>
                <th>Fecha Devolucion</th>
                <th>Hora Inicio</th>
                <th>Hora Fin</th>
                <th>Estado</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {state.reservasList.sort((a, b) => b.id - a.id).map((reserva)=>{
                return(
                  <tr key={reserva.id}>
                    <th>{reserva.id}</th>
                    <td>{reserva.recurso.nombre}</td>
                    <td>{reserva.usuario.fullname}</td>
                    <td>{reserva.fechaReserva}</td>
                    <td>{reserva.fechaDevolucion}</td>
                    <td>{reserva.horaInicio}</td>
                    <td>{reserva.horaFin}</td>
                    <td>{reserva.estado}</td>
                    {
                      state.userData.rol == 'ROLE_ADMIN' &&
                      <>
                        <td><FontAwesomeIcon icon={faPencil} className='reserva-icon'/></td>
                        <td onClick={()=>handleCancel(reserva.id)}><FontAwesomeIcon icon={faBan} className='reserva-icon'/></td>
                      </>
                    }
                    {
                      state.userData.rol == 'ROLE_USER' && reserva.estado == 'Activa' && 
                        <td onClick={()=>handleCancel(reserva.id)}><FontAwesomeIcon icon={faBan} className='reserva-icon'/></td>
                    }
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Devoluciones