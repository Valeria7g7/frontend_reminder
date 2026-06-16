import { useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Actions } from '@/interfaces/general.interface';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../interface/prescriprion.schema";
import type { IPrescription } from '../interface/Prescription.interface';
import { PrescriptionResource } from '../resources/Prescription.resource';
import { usePrescriptionStore } from '../store/prescription.store';
type PrescriptionCreateProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onClose: () => void;
    mode: string;
    entity?: IPrescription;
    next_action?:()=>void;
  
};

export const PrescriptionCreate = ({ isOpen, setIsOpen, onClose, mode, entity, next_action }: PrescriptionCreateProps) => {

    const addEntity = usePrescriptionStore((state) => state.addEntity);

    const updateEntity = usePrescriptionStore((state) => state.updateEntity)
    const setLoading = usePrescriptionStore((state) => state.setLoading);
    const isLoading = usePrescriptionStore((state) => state.isLoading);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
           
        },
    });
/*   const {  reset } = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
            account_owner:  false,
        },
    }); */
    useEffect(() => {
        if (mode === Actions.UPDATE && entity) {
            reset({
                   date:entity.date,
                   total:entity.total??0,
                   description:entity.description,
            });
        }
    }, [entity, mode, reset]);

    const onSubmit = async (data: IPrescription) => {
        setLoading(true);
        try {
            if (mode === Actions.CREATE) {
                const createdPrescription = await PrescriptionResource.create(data);
                addEntity(createdPrescription as IPrescription);
                setIsOpen(false);
                if(next_action) next_action();
                return;
            }

            if (mode === Actions.UPDATE && entity) {
                const updatedPrescription = await PrescriptionResource.update(entity.id as number, data);
                updateEntity(updatedPrescription as IPrescription);
                setIsOpen(false);
            }
        } catch (error) {
            console.error("Error saving user: ", error);
        } finally {
            setLoading(false);
        }
    };






    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='max-w-2xl'>
                <DialogHeader>
                    <DialogTitle> {mode === Actions.CREATE ? 'Crear Nuevo Usuario' : 'Editar Usuario'}</DialogTitle>
                    <DialogDescription>
                        Completa el formulario para guardar un nuevo usuario.
                    </DialogDescription>
                </DialogHeader>
                   
                <div className="product-list">
                    <h1>Crear Usuario</h1>
                    <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
                        {/* aqui pedimos el user tambien con un select */}
                        <div className="mb-2">
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Fecha*</label>
                            <input type="date" id="date"    {...register("date")} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
                        </div>
                        <div className="mb-2">
                            <label htmlFor="total" className="block text-sm font-medium text-gray-700">Total</label>
                            <input type="text" id="total"    {...register("total")} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            {errors.total && <p className="text-red-500 text-sm mt-1">{errors.total.message}</p>}
                        </div>
                        <div className="mb-2">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                            <input type="text" id="description" {...register("description")} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                        </div>
                    
                        <div className="flex justify-between">
                            <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">Cancelar</button>
                            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                                {isLoading ? "Guardando..." : (mode === Actions.CREATE ? "Crear" : "Actualizar")}
                            </button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};