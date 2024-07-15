/* eslint-disable no-unused-vars */

import { useEffect, useState } from 'react'
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Reserva from './components/Reserva/Reserva';
import Recursos from './components/Recurso/Recurso'
import InfoUsuario from './components/InfoUsuario/InfoUsuario';
import Usuarios from './components/Usuarios/Usuarios';
import Unidades from './components/Unidades/Unidades'
import { ContextProvider } from './components/utils/global.Context';
import ProtectedRoute from './components/utils/ProtectedRoute';
import Prestamo from './components/Prestamo/Prestamo';
import Devoluciones from './components/Devoluciones/Devoluciones';
import OtrosRecursos from './components/OtrosRecursos/OtrosRecursos';

function App() {
  const [showNavBar, setShowNavBar] = useState(true)
  useEffect(() => {
    const currentPath = window.location.pathname
    setShowNavBar(currentPath != '/login' && currentPath != '/register')
  }, [])

  return (
    <ContextProvider>
      {/* <InfoUsuario/> */}
      {/* <RecursoHorarios/> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/register' element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<NavBar />}>
              <Route path='/info-usuario' element={<InfoUsuario />}></Route>
              <Route path="/recursos" element={<Recursos/>}></Route>
              <Route path="/otrosRecursos" element={<OtrosRecursos/>}></Route>
              <Route path="/reservas" element={<Reserva/>}></Route>
              <Route path="/prestamos" element={<Prestamo/>}></Route>
              <Route path="/devoluciones" element={<Devoluciones/>}></Route>
              <Route path="/usuarios" element={<Usuarios/>}></Route>
              <Route path="/unidades" element={<Unidades/>}></Route>
            </Route>
          </Route>

          <Route path='*' element={<Navigate to="/"/>}/>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App
