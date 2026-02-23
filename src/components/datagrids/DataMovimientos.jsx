import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export const DataMovimientos = () => {

    const movimientos = {

    }
    return (
        <DataTable value={movimientos} columnResizeMode="expand" resizableColumns showGridlines tableStyle={{ minWidth: '50rem' }}>
            <Column header="Id" body={(data, options) => options.rowIndex + 1}></Column>
            <Column field="placa" header="Vehiculo"></Column>
            <Column field="tipo_movimiento" header="Tipo de Movimiento"></Column>
            <Column field="nombre_motorista" header="Nombre del Motorista"></Column>
            <Column field="fecha" header="Fecha"></Column>
            <Column field="hora" header="Hora"></Column>
            <Column field="kilometraje" header="Kilometraje"></Column>
        </DataTable>
    )
}