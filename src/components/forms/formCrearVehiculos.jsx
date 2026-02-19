import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export const FormCrearVehiculos = () => {
    
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            placa: '',
            marca: '',
            modelo: ''
        }
    });

    const onSubmit = (data) => {
        console.log("Datos del vehículo:", data);
    };

    return (
        <div className="card p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-4">
                
                {/* Campo Placa */}
                <div className="flex flex-column gap-2">
                    <label htmlFor="placa" className="font-bold">Placa</label>
                    <Controller
                        name="placa"
                        control={control}
                        rules={{ required: 'La placa es obligatoria', maxLength: 20 }}
                        render={({ field, fieldState }) => (
                            <InputText 
                                id={field.name} 
                                {...field} 
                                className={fieldState.invalid ? 'p-invalid' : ''} 
                            />
                        )}
                    />
                    {errors.placa && <small className="p-error">{errors.placa.message}</small>}
                </div>

                {/* Campo Marca */}
                <div className="flex flex-column gap-2">
                    <label htmlFor="marca" className="font-bold">Marca</label>
                    <Controller
                        name="marca"
                        control={control}
                        rules={{ required: 'La marca es obligatoria' }}
                        render={({ field, fieldState }) => (
                            <InputText 
                                id={field.name} 
                                {...field} 
                                className={fieldState.invalid ? 'p-invalid' : ''} 
                            />
                        )}
                    />
                </div>

                {/* Campo Modelo */}
                <div className="flex flex-column gap-2">
                    <label htmlFor="modelo" className="font-bold">Modelo</label>
                    <Controller
                        name="modelo"
                        control={control}
                        rules={{ required: 'El modelo es obligatorio' }}
                        render={({ field, fieldState }) => (
                            <InputText 
                                id={field.name} 
                                {...field} 
                                className={fieldState.invalid ? 'p-invalid' : ''} 
                            />
                        )}
                    />
                </div>

                <Button type="submit" label="Registrar Vehículo" icon="pi pi-check" severity="info" className="mt-2" />
            </form>
        </div>
    );
};