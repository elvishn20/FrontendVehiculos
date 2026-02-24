import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { useState, useEffect } from "react"; 

export const FormCrearMovimientos = ({onSuccess, onHide, toast}) => {
    const [vehiculos, setVehiculos] = useState([]);

    // Registro de la data al formulario
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            pr_id_vehiculo: null,
            pr_tipo_movimiento: null,
            pr_nombre_motorista: '',
            pr_fecha: null,
            pr_hora: null,
            pr_kilometraje: null
        }
    });

    // Traemos los vehiculos para cargar el dataset
    useEffect(() => {
        const obtenerVehiculos = async () => {
            try {
                const response = await fetch('https://backendvehiculos.onrender.com/lista-vehiculos');
                const json = await response.json();
                if (json.success && Array.isArray(json.data)) {
                    setVehiculos(json.data);
                } else {
                    console.error('No se pudo obtener la lista de vehiculos');
                }
            } catch (error) {
                console.error('Error al cargar los vehiculos: ', error);
            };
        };
        obtenerVehiculos();
    }, []);

    // Envio de datos al backend
    const onSubmit = async (data) => {
        try {
            const payload = {
                ...data,
                pr_fecha: data.pr_fecha.toISOString().split('T')[0], // YYYY-MM-DD
                pr_hora: data.pr_hora.toLocaleTimeString('en-GB'), // HH:MM:SS
            };
            const response = await fetch('https://backendvehiculos.onrender.com/insertar-movimiento', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            console.log("Contenido de la data: ", data);
            console.log("Respuesta del servidor:", result);
            if (result.success) {
                reset();
                if (onSuccess) {
                    onSuccess(result.message);
                }
                if (onHide) {
                    onHide();
                } 
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: result.message, life: 3000})
            }
        } catch (error) {
            console.error('Error: ', error);
        };
    };

    const tipoMovimiento = [
        { label: 'Entrada', value: 'Entrada'},
        { label: 'Salida', value: 'Salida'}
    ];

    return (
        <div className="card p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-3">
                
                {/* Select de Vehículo (Placa) */}
                <div className="flex flex-column gap-2">
                    <label className="font-bold">Seleccionar Vehiculo</label>
                    <Controller
                        name="pr_id_vehiculo"
                        control={control}
                        rules={{ required: 'Debe seleccionar un vehículo' }}
                        render={({ field, fieldState }) => (
                            <Dropdown 
                                {...field} 
                                options={vehiculos || []} 
                                optionLabel="fn_placa" 
                                optionValue="fn_id" 
                                placeholder="Seleccione una placa"
                                className={fieldState.invalid ? 'p-invalid' : ''} 
                            />
                        )}
                    />
                    {errors.pr_id_vehiculo && <small className="p-error">{errors.pr_id_vehiculo.message}</small>}
                </div>

                {/* Select Tipo de Movimiento */}
                <div className="flex flex-column gap-2">
                    <label className="font-bold">Tipo de Movimiento</label>
                    <Controller
                        name="pr_tipo_movimiento"
                        control={control}
                        rules={{ required: 'El tipo es obligatorio' }}
                        render={({ field, fieldState }) => (
                            <Dropdown 
                                {...field} 
                                options={tipoMovimiento} 
                                placeholder="Entrada o Salida"
                                className={fieldState.invalid ? 'p-invalid' : ''} 
                            />
                        )}
                    />
                    {errors.pr_tipo_movimiento && <small className="p-error">{errors.pr_tipo_movimiento.message}</small>}
                </div>

                {/* Nombre Motorista */}
                <div className="flex flex-column gap-2">
                    <label className="font-bold">Nombre del Motorista</label>
                    <Controller
                        name="pr_nombre_motorista"
                        control={control}
                        rules={{ 
                            required: 'El nombre es obligatorio',
                            maxLength: { value: 60, message: 'Máximo 60 caracteres' } 
                        }}
                        render={({ field }) => <InputText {...field} />}
                    />
                    {errors.pr_nombre_motorista && <small className="p-error">{errors.pr_nombre_motorista.message}</small>}
                </div>

                {/* Fecha y Hora */}
                <div className="flex gap-3">
                    <div className="flex-1 flex flex-column gap-2">
                        <label className="font-bold">Fecha</label>
                        <Controller
                            name="pr_fecha"
                            control={control}
                            rules={{ required: 'Obligatorio' }}
                            render={({ field }) => <Calendar {...field} dateFormat="yy-mm-dd" showIcon />}
                        />
                        {errors.pr_fecha && <small className="p-error">{errors.pr_fecha.message}</small>}
                    </div>
                    <div className="flex-1 flex flex-column gap-2">
                        <label className="font-bold">Hora</label>
                        <Controller
                            name="pr_hora"
                            control={control}
                            rules={{ required: 'Obligatorio' }}
                            render={({ field }) => <Calendar {...field} timeOnly showIcon icon="pi pi-clock" />}
                        />
                        {errors.pr_hora && <small className="p-error">{errors.pr_hora.message}</small>}
                    </div>
                </div>

                {/* Kilometraje */}
                <div className="flex flex-column gap-2">
                    <label className="font-bold">Kilometraje</label>
                    <Controller
                        name="pr_kilometraje"
                        control={control}
                        rules={{ 
                            required: 'El kilometraje es obligatorio', 
                            max: { value: 999999.99, message: 'El valor máximo a digitar es 999,999.99' }
                        }}
                        render={({ field }) => (
                            <InputNumber 
                                id={field.name}
                                value={field.value ?? null} 
                                onChange={(e) => field.onChange(e.value)} 
                                mode="decimal" 
                                maxFractionDigits={2} 
                                useGrouping={false}
                                placeholder="0.00" 
                            />
                        )}
                    />
                    {errors.pr_kilometraje && <small className="p-error">{errors.pr_kilometraje.message}</small>}
                </div>

                <Button type="submit" label="Registrar Movimiento" icon="pi pi-save" severity="success" className="mt-4" />
            </form>
        </div>
    );
}