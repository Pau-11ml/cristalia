import { useState } from 'react';

import LoginScreen from './src/screens/loginScreen';
import SolicitudScreen from './src/screens/solicitudScreen';
import PerfilScreen from './src/screens/perfilScreen';
import InicioScreen from './src/screens/inicioScreen';
import UbicacionScreen from './src/screens/ubicacionScreen';
import MenuInferior from './src/components/menuInferior';
import NotificacionesPush from './src/screens/NotificacionesPush';


export default function App() {


  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);
  const [pantallaActual, setPantallaActual] = useState('inicio');

  if (!usuarioAutenticado){
    return(
      <LoginScreen onLogin={() => setUsuarioAutenticado(true)}/>
    )
  }

  let pantalla;
  if (pantallaActual === 'solicitudes'){
    pantalla = <SolicitudScreen/>
  } else if (pantallaActual === 'ubicacion'){
    pantalla = <UbicacionScreen/>
  } else if (pantallaActual === 'perfil'){
    pantalla = <PerfilScreen/>
  } else if (pantallaActual === 'notificaciones') {
    pantalla = <NotificacionesPush/>
  } else{
    pantalla = <InicioScreen/>
  }

  return(
    <>
    {pantalla}
    <MenuInferior
    cambiarPantalla={setPantallaActual}
    pantallaActual={pantallaActual}
    />
    </>
  )
}
