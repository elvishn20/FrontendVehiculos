import { ButtonGroup } from 'primereact/buttongroup';
import { Button } from 'primereact/button';
import './App.css';
import { DataVehiculos } from './components/datagrids/DataVehiculos';
import { useState } from 'react';

function App() {

  const [vistaVehiculos, setVistaVehiculos] = useState('none');

  return (
    <>
      <h1 style={{textAlign: "center", marginTop: "2rem", marginBottom: "2rem"}}>Registro de Vehículos con Entradas y Salidas</h1>
      <div className="w-full px-4 mt-3">
        <ButtonGroup className="w-full flex">
          <Button 
            label="Registro de Vehículos"
            severity="info"
            className="flex-1"
            onClick={() => setVistaVehiculos(vistaVehiculos === 'tablaVehiculos' ? 'none' : 'tablaVehiculos')}
          />  
          <Button 
            label="Entradas / Salidas"
            severity="success"
            className="flex-1"
          />
        </ButtonGroup>
      </div>
      <div className="mt-5 px-4">
        {vistaVehiculos === 'tablaVehiculos' && (
          <div className="card">
             <h2 className="text-center">Listado de Vehículos</h2>
             <DataVehiculos />
          </div>
        )}
      </div>
    </>
  )
}

export default App;
