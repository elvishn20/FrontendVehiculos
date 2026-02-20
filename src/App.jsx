import { ButtonGroup } from 'primereact/buttongroup';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import './App.css';
import { FormCrearVehiculos } from './components/forms/formCrearVehiculos';
import { DataVehiculos } from './components/datagrids/DataVehiculos';
import { useState, useRef } from 'react';

function App() {

  const [vistaVehiculos, setVistaVehiculos] = useState('none');
  const [visibleCrearVehiculo, setVisibleCrearVehiculo] = useState(false);

  // Hacemos referencia a la tabla del DataVehiculos.jsx
  const tablaRef = useRef();

  const manejarExitoInsercion = () => {
    console.log("4. Ejecutando manejarExito en App.jsx");
    if (tablaRef.current) {
      console.log("5. Intentando refrescar tabla...");
      tablaRef.current.refreshData(); 
    }
    console.log("6. Intentando cerrar modal...");
    setVisibleCrearVehiculo(false); // 
  };

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
            <h2 className="text-center" style={{marginBottom: "2rem"}}>Listado de Vehículos</h2>

            {/* Boton de apertura del formulario de creacion de vehiculo */}
            <Button 
              label="Crear Vehículo" 
              severity="info" 
              onClick={() => setVisibleCrearVehiculo(true)}
              style={{marginBottom: "2rem"}}
            />

            {/* Datagrid para la muestra de vehiculos */}
            <DataVehiculos ref={tablaRef}/>

            {/* Modal que muestra el formulario de crear vehiculo */}
            <Dialog 
              header="Nuevo Registro de Vehículo" 
              visible={visibleCrearVehiculo} 
              style={{ width: '90vw', maxWidth: '450px' }} 
              onHide={() => setVisibleCrearVehiculo(false)} // Cierra al hacer clic fuera o en X
            >
              <FormCrearVehiculos
                onSuccess={manejarExitoInsercion}
                onHide={() => setVisibleCrearVehiculo(false)}
              />
            </Dialog>
          </div>
        )}
      </div>
    </>
  )
}

export default App;
