import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState, useImperativeHandle, forwardRef } from "react";

export const DataVehiculos = forwardRef((props, ref) => {
    const [vehiculos, setVehiculos] = useState([]);

    const formatoData = data => {
        return data.map(item => ({
            placa: item.traer_vehiculos.fn_placa,
            marca: item.traer_vehiculos.fn_marca,
            modelo: item.traer_vehiculos.fn_modelo
        }));
    };

    // Manda a llamar los datos ingresados del formulario
    const fetchVehiculos = async () => {
        try {
            const response = await fetch('http://localhost:3000/lista-vehiculos');
            const datosJson = await response.json();
            if (datosJson.success) {
                const datosFinales = formatoData(datosJson.data)
                setVehiculos(datosFinales);
            }
        } catch (error) {
            console.error('Error: ', error);
        };
    };

    // Expone la funcion para que realice el llamado al archivo principal de App.jsx
    useImperativeHandle(ref, () => ({
        refreshData: () => {
            fetchVehiculos();
        }
    }));

    // Cuando detecta cambios actualiza la tabla
    useEffect(() => {
        fetchVehiculos();
    }, []);

    return (
        <DataTable value={vehiculos} columnResizeMode="expand" resizableColumns showGridlines tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header="Id"></Column>
            <Column field="placa" header="Placa"></Column>
            <Column field="marca" header="Marca"></Column>
            <Column field="modelo" header="Modelo"></Column>
            <Column field="operaciones" header="Operaciones"></Column>
        </DataTable>
    );
});