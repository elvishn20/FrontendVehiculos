import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

export const DataMovimientos = forwardRef(({globalFiltro}, ref) => {
    const [movimientos, setMovimientos] = useState([]);

    // Manda a llamar los datos ingresados del formulario
    const fetchMovimientos = async () => {
        try {
            const response = await fetch('https://backendvehiculos.onrender.com/lista-movimientos');
            const datosJson = await response.json();
            if (datosJson.success) {
                setMovimientos(datosJson.data);
            } 
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    // Expone la funcion para que realice el llamado al archivo principal de App.jsx
    useImperativeHandle(ref, () => ({
        refreshData: () => {
            fetchMovimientos();
        }
    }));

    // Cuando detecta cambios actualiza la tabla
    useEffect(() => {
        fetchMovimientos();
    }, []);

    const tipoBodyTemplate = (rowData) => {
        const severity = rowData.fn_tipo_movimiento === 'Entrada' ? 'success' : 'warning';
        return <Tag value={rowData.fn_tipo_movimiento} severity={severity} />;
    };

    return (
        <DataTable 
            value={movimientos} 
            columnResizeMode="expand" 
            resizableColumns 
            showGridlines 
            tableStyle={{ minWidth: '50rem' }}
            globalFilter={globalFiltro}
            emptyMessage="No se encontraron entradas o salidas registradas"
        >
            <Column header="Id" body={(data, options) => options.rowIndex + 1}></Column>
            <Column field="fn_placa" header="Vehiculo"></Column>
            <Column field="fn_tipo_movimiento" header="Tipo de Movimiento" body={tipoBodyTemplate}></Column>
            <Column field="fn_nombre_motorista" header="Nombre del Motorista"></Column>
            <Column field="fn_fecha" header="Fecha"></Column>
            <Column field="fn_hora" header="Hora"></Column>
            <Column field="fn_kilometraje" header="Kilometraje" body={(d) => `${d.fn_kilometraje} km`}></Column>
        </DataTable>
    )
});