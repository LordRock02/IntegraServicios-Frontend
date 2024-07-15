import getUsuarios from '../../services/get/getUsuarios';
import { useIntegraStates } from '../utils/global.Context';
import { useEffect, useState } from 'react';
import { ToastContainer, toast} from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPencil} from '@fortawesome/free-solid-svg-icons'
import './Usuarios.css'
import ModalEditarUsuario from '../ModalEditarUsuario/ModalEditarUsuario';
import deleteUsuario from '../../services/delete/deleteUsuario'


const Usuarios = () => {

  const {state, dispatch} = useIntegraStates()
  const [showModalEditarUsuario,setShowModalEditarUsuario] = useState(false)
  const [usuarioEditar,setUsuarioEditar] = useState(null)
  const [reload,setReload] = useState(true)

  const getRol = (idRol)=>{
    let rol = '';
    switch(idRol){
      case 1:
        rol = "ADMIN"
        break;
      case 2:
        rol = "USER"
        break;
      case 3:
        rol = "ALIADO"
        break;
    }
    return rol
  }

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

  const handleDelete =  (idUsuario)=>{
    if(confirm("¿Está seguro de eliminar el usuario?")){
      deleteUsuario(idUsuario)
      .then((response)=>{
        if(response.success){
          notify('success','Usuario eliminado!','bottom-right')
        }
        else{
          notify('error','Ocurrió un error...','bottom-right')
        }
      })
    }
  }

  useEffect(() =>{
    getUsuarios()
    .then(response => {
      if(response.succes){
        console.log(state.usuariosList)
        dispatch({type: 'SET_LIST_USUARIOS', payload: response.responseData})
        console.log(state.usuariosList)
      }
    })
  },[reload])

  return (
    <div className='container-home'>
      {showModalEditarUsuario && <ModalEditarUsuario setShowModalEditarUsuario={setShowModalEditarUsuario} reload={reload} setReload={setReload} usuarioEditar={usuarioEditar}/>}
      <div className='containerUsuarios'>
        <div className='list-usuarios'>
          <table className='table'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cedula</th>
                <th>E-mail</th>
                <th>Rol</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {state.usuariosList.map((usuario)=>{
                return(
                  <tr key={usuario.id}>
                    <td>{usuario.fullname}</td>
                    <td>{usuario.cedula}</td>
                    <td>{usuario.email}</td>
                    <td>{getRol(usuario.rol)}</td>
                    <td onClick={()=>{setUsuarioEditar(usuario);setShowModalEditarUsuario(true);}}><FontAwesomeIcon icon={faPencil} className='reserva-icon'/></td>
                    <td onClick={()=>handleDelete(usuario.id)}><FontAwesomeIcon icon={faTrashCan} className='reserva-icon'/></td>
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

export default Usuarios