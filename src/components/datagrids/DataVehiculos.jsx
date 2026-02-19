import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export const DataVehiculos = () => {

    const vehiculos = [
        { id: 1, placa: 'ABC-123', marca: 'Toyota', modelo: 'Hilux' },
        { id: 2, placa: 'XYZ-789', marca: 'Nissan', modelo: 'Frontier' },
    ];

    return (
        <DataTable value={vehiculos} columnResizeMode="expand" resizableColumns showGridlines tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header="Id"></Column>
            <Column field="placa" header="Placa"></Column>
            <Column field="marca" header="Marca"></Column>
            <Column field="modelo" header="Modelo"></Column>
            <Column field="operaciones" header="Operaciones"></Column>
        </DataTable>
    );
};