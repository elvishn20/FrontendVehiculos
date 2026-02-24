import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useEffect } from "react";

export const FormActualizarVehiculos = ({onSuccess, onHide, vehiculo, toast}) => {
    
    // Registro de la data al formulario
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            pr_id: '',
            pr_placa: '',
            pr_marca: '',
            pr_modelo: ''
        }
    });

    // Cargamos los datos del campo para que esten en el formulario
    useEffect(() => {
        if (vehiculo) {
            reset({
                pr_id: vehiculo.fn_id,
                pr_placa: vehiculo.fn_placa,
                pr_marca: vehiculo.fn_marca,
                pr_modelo: vehiculo.fn_modelo
            });
        };
    }, [vehiculo, reset]);

    // Envio de los datos al backend
    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:3000/editar-vehiculo', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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
        }
    };

    return (
        <div className="card p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-4">
                
                {/* Campo Placa */}
                <div className="flex flex-column gap-2">
                    <label htmlFor="pr_placa" className="font-bold">Placa</label>
                    <Controller
                        name="pr_placa"
                        control={control}
                        rules={{ 
                            required: 'La placa es obligatoria', 
                            maxLength: {value: 10, message: 'La placa no puede exceder los 10 caracteres'},
                            pattern: { 
                                value: /^([A-Z]\s*){3}([0-9]\s*){4}$/i, 
                                message: 'Formato requerido: 3 letras y 4 números (Ej: B AA 0001 o BAA0001)' 
                            }
                        }}
                        render={({ field, fieldState }) => (
                            <InputText 
                                id={field.name} 
                                {...field} 
                                placeholder="Ej: B AA 0001"
                                className={fieldState.invalid ? 'p-invalid' : ''} 
                            />
                        )}
                    />
                    {errors.pr_placa && <small className="p-error">{errors.pr_placa.message}</small>}
                </div>

                {/* Campo Marca */}
                <div className="flex flex-column gap-2">
                    <label htmlFor="pr_marca" className="font-bold">Marca</label>
                    <Controller
                        name="pr_marca"
                        control={control}
                        rules={{ 
                            required: 'La marca es obligatoria',
                            maxLength: { value: 30, message: 'Máximo 30 caracteres' } 
                        }}
                        render={({ field, fieldState }) => (
                            <InputText 
                                id={field.name} 
                                {...field} 
                                className={fieldState.invalid ? 'p-invalid' : ''} 
                            />
                        )}
                    />
                    {errors.pr_marca && <small className="p-error">{errors.pr_marca.message}</small>}
                </div>

                {/* Campo Modelo */}
                <div className="flex flex-column gap-2">
                    <label htmlFor="pr_modelo" className="font-bold">Modelo</label>
                    <Controller
                        name="pr_modelo"
                        control={control}
                        rules={{ 
                            required: 'El modelo es obligatorio',
                            maxLength: { value: 30, message: 'Máximo 30 caracteres' }
                        }}
                        render={({ field, fieldState }) => (
                            <InputText 
                                id={field.name} 
                                {...field} 
                                className={fieldState.invalid ? 'p-invalid' : ''} 
                            />
                        )}
                    />
                    {errors.pr_modelo && <small className="p-error">{errors.pr_modelo.message}</small>}
                </div>

                <Button type="submit" label="Editar Vehículo" icon="pi pi-save" severity="info" className="mt-2" />
            </form>
        </div>
    );
};