import getUnidades from '../../services/get/getUnidades';
import { useIntegraStates } from '../utils/global.Context';
import { useEffect, useState } from 'react';
import { ToastContainer, toast} from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPencil} from '@fortawesome/free-solid-svg-icons'
import ModalUnidad from '../ModalUnidad/ModalUnidad';
import deleteUnidad from '../../services/delete/deleteUnidad'
import './Unidades.css'


const Unidades = () => {

  const {state, dispatch} = useIntegraStates()

  const [reload,setReload] = useState(true)
  const [idUnidadEditar,setIdUnidadEditar] = useState(undefined)
  const [showModalUnidad, setShowModalUnidad] = useState(false)


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

  const handleDelete =  (idUnidad)=>{
    if(confirm("¿Está seguro de eliminar la unidad?")){
      deleteUnidad(idUnidad)
      .then((response)=>{
        if(response.success){
          notify('success','Unidad eliminada!','bottom-right')
        }
        else{
          notify('error','Ocurrió un error...','bottom-right')
        }
      })
    }
  }

  useEffect(() =>{
    getUnidades()
    .then(response => {
      if(response.succes){
        console.log(state.unidadesList)
        dispatch({type: 'SET_LIST_UNIDADES', payload: response.responseData})
        console.log(state.unidadesList)
      }
    })
  },[reload])

  return (
    <div className='container-home'>
      {showModalUnidad && <ModalUnidad setShowModalUnidad={setShowModalUnidad} idUnidadEditar={idUnidadEditar} reload={reload} setReload={setReload}/>}
      <div className='containerUnidades'>
        <button onClick={() => {setIdUnidadEditar(undefined);setShowModalUnidad(true);}}>Crear</button>
        <div className='list-unidades'>
          <table className='table'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Apertura</th>
                <th>Cierre</th>
                <th>T. min</th>
                <th>T. max</th>
                <th>Dias disponible</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {state.unidadesList.map((unidad)=>{
                return(
                  <tr key={unidad.id}>
                    <td>{unidad.nombre}</td>
                    <td>{unidad.tipo}</td>
                    <td>{unidad.horaInicio}</td>
                    <td>{unidad.horaFinal}</td>
                    <td>{unidad.tiempoMinimo}</td>
                    <td>{unidad.tiempoMaximo}</td>
                    <td>{unidad.diasDisponibles.map((dia, index) => index === unidad.diasDisponibles.length - 1 ? dia.nombre : dia.nombre + ', ')}</td>
                    <td><FontAwesomeIcon onClick={()=>{setIdUnidadEditar(unidad.id);setShowModalUnidad(true);}} icon={faPencil} className='reserva-icon'/></td>
                    <td><FontAwesomeIcon onClick={()=>handleDelete(unidad.id)} icon={faTrashCan} className='reserva-icon'/></td>
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
  // return (
  //   <div className='containerReservas'>
  //     {/* {recursos.map((recurso,index)=>{
  //       // return <RecursoReserva key={index} recurso={recurso}/>
  //       return <></>
  //     })} */}
  //   </div>
  // )
}

export default Unidades