import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export const FormCrearVehiculos = ({onSuccess, onHide}) => {
    
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            pr_placa: '',
            pr_marca: '',
            pr_modelo: ''
        }
    });

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:3000/insertar-vehiculo', {
            method: 'POST',
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
                    onSuccess();
                } 
                if (onHide) onHide();
            } else {
                console.error('Error del servidor: ', result.message);
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
                        rules={{ required: 'La placa es obligatoria', maxLength: 20 }}
                        render={({ field, fieldState }) => (
                            <InputText 
                                id={field.name} 
                                {...field} 
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
                        rules={{ required: 'La marca es obligatoria' }}
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
                        rules={{ required: 'El modelo es obligatorio' }}
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

                <Button type="submit" label="Registrar Vehículo" icon="pi pi-check" severity="info" className="mt-2" />
            </form>
        </div>
    );
};