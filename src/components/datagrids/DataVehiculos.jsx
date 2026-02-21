import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
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

    // Iconos para editar y eliminar
    const botonesOperaciones = (rowData) => {
        return (
            <div className="flex gap-4">
                <Button 
                    icon="pi pi-pencil" 
                    severity="warning" 
                    rounded 
                    outlined 
                    onClick={() => console.log("Editando:", rowData)} 
                    tooltip="Editar"
                />
                <Button 
                    icon="pi pi-trash" 
                    severity="danger" 
                    rounded 
                    outlined 
                    onClick={() => console.log("Eliminando:", rowData)} 
                    tooltip="Eliminar"
                />
            </div>
        );
    };

    return (
        <DataTable value={vehiculos} columnResizeMode="expand" resizableColumns showGridlines tableStyle={{ minWidth: '50rem' }}>
            <Column header="Id" body={(data, options) => options.rowIndex + 1}></Column>
            <Column field="placa" header="Placa"></Column>
            <Column field="marca" header="Marca"></Column>
            <Column field="modelo" header="Modelo"></Column>
            <Column header="Operaciones" body={botonesOperaciones}></Column>
        </DataTable>
    );
});