import { ButtonGroup } from 'primereact/buttongroup';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import './App.css';
import { FormCrearVehiculos } from './components/forms/formCrearVehiculos';
import { FormActualizarVehiculos } from './components/forms/FormActualizarVehiculos';
import { DataVehiculos } from './components/datagrids/DataVehiculos';
import { DataMovimientos } from './components/datagrids/DataMovimientos';
import { useState, useRef } from 'react';

function App() {

  const [vistaActiva, setVistaActiva] = useState('vehiculos');
  const [visibleCrearVehiculo, setVisibleCrearVehiculo] = useState(false);
  const [vehiculoAEditar, setVehiculoAEditar] = useState(null);
  const [visibleActualizarVehiculo, setVisibleActualizarVehiculo] = useState(false);
  const toast = useRef(null); 
  const tablaRef = useRef(); 
  const tablaMovimientosRef = useRef();

  // Notificacion y refresh de la tabla, cuando se crea vehiculo.
  const manejarExitoInsercion = (mensajeServidor) => {
    toast.current.show({
      severity: 'success',
      summary: 'Éxito',
      detail: mensajeServidor,
      life: 3000 
    });
    if (tablaRef.current) {
      tablaRef.current.refreshData(); 
    }
    setVisibleCrearVehiculo(false); 
  };  

  // Levanta la modal de edicion de vehiculo
  const abrirEdicion = (vehiculo) => {
    setVehiculoAEditar(vehiculo);
    setVisibleActualizarVehiculo(true);
  }

  // Levanta la modal para borrar vehiculo
  const confirmarEliminacion = (id) => {
    confirmDialog({
      message: '¿Estás seguro de eliminar este vehículo?',
      header: 'Confirmación de Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí', 
      rejectLabel: 'No', 
      acceptClassName: 'p-button-danger', 
      accept: () => ejecutarEliminacion(id), 
      reject: () => console.log('Eliminación cancelada')
    });
  };

  // Ejecuta dicha eliminacion
  const ejecutarEliminacion = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/eliminar-vehiculo/${id}`, {
        method: 'DELETE'
      });
      const result = await response.json();

      if (result.success) {
        toast.current.show({ severity: 'success', summary: 'Eliminado', detail: result.message, life: 3000});
        tablaRef.current.refreshData();
      } else {
        toast.current.show({ severity: 'error', summary: 'Error', detail: result.message});
      }
    } catch (error) {
      console.error('Error al eliminar: ', error);
    }
  }

  return (
    <>
      <Toast ref={toast}/>
      <ConfirmDialog />
      <h1 style={{textAlign: "center", marginTop: "2rem", marginBottom: "2rem"}}>Registro de Vehículos con Entradas y Salidas</h1>
      <div className="w-full px-4 mt-3">
        <ButtonGroup className="w-full flex">
          <Button 
            label="Registro de Vehículos"
            severity={vistaActiva === 'vehiculos' ? 'info' : 'secondary'}
            className="flex-1"
            onClick={() => setVistaActiva('vehiculos')}
          />  
          <Button 
            label="Entradas / Salidas"
            severity={vistaActiva === 'movimientos' ? 'success' : 'secondary'}
            className="flex-1"
            onClick={() => setVistaActiva('movimientos')}
          />
        </ButtonGroup>
      </div>
      <div className="mt-5 px-4">
        {vistaActiva === 'vehiculos' && (
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
            <DataVehiculos 
              ref={tablaRef} 
              onEdit={abrirEdicion}
              onDelete={confirmarEliminacion}
            />

            {/* Modal que muestra el formulario de crear vehiculo */}
            <Dialog 
              header="Nuevo Registro de Vehículo" 
              visible={visibleCrearVehiculo} 
              style={{ width: '90vw', maxWidth: '450px' }} 
              onHide={() => setVisibleCrearVehiculo(false)} // Cierra al hacer clic fuera o en X
            >
              <FormCrearVehiculos
                onSuccess={(msg) => manejarExitoInsercion(msg)}
                onHide={() => setVisibleCrearVehiculo(false)}
                toast={toast}
              />
            </Dialog>

            {/* Modal que muestra el formulario para editar vehiculo */}
            <Dialog 
              header="Actualización de Vehículo"
              visible={visibleActualizarVehiculo} 
              style={{ width: '90vw', maxWidth: '450px' }} 
              onHide={() => setVisibleActualizarVehiculo(false)}>
              <FormActualizarVehiculos 
                  vehiculo={vehiculoAEditar} 
                  onSuccess={manejarExitoInsercion} 
                  toast={toast}
                  onHide={() => setVisibleActualizarVehiculo(false)}
              />
            </Dialog>
          </div>
        )}
        {vistaActiva === 'movimientos' && (
          <div className='card'>
            <h2 className='text-center' style={{marginBottom: "2rem"}}>Listado de Entradas / Salidas</h2>

            {/* Botón de apertura de formulario para la creación de un movimiento */}
            <Button 
              label="Crear Movimiento"
              severity="success"
              style={{marginBottom: "2rem"}}
            />

            {/* Datagrid para la muestra de movimientos */}
            <DataMovimientos 
              ref={tablaMovimientosRef}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default App;
