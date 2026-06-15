import { useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Actions } from '@/interfaces/general.interface';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../interface/user-product.schema";
import type { IUserProduct } from '../interface/UserProduct.interface';
import { UserProductResource } from '../resources/UserProduct.resource';
import { useUserProductStore } from '../store/userProduct.store';
type UserProductCreateProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onClose: () => void;
    mode: string;
    entity?: IUserProduct;
    next_action?:()=>void;
  
};

export const UserProductCreate = ({ isOpen, setIsOpen, onClose, mode, entity, next_action }: UserProductCreateProps) => {

    const addEntity = useUserProductStore((state) => state.addEntity);

    const updateEntity = useUserProductStore((state) => state.updateEntity)
    const setLoading = useUserProductStore((state) => state.setLoading);
    const isLoading = useUserProductStore((state) => state.isLoading);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
           // account_owner: account_owner ?? false,
        },
    });
 
    useEffect(() => {
        if (mode === Actions.UPDATE && entity) {
            reset({
                how_days: entity.how_days,
                how_often: entity.how_often,
                first_take: entity.first_take,
                description: entity.description,
                user_id: entity.user_id,
                product_id: entity.product_id,
            });
        }
    }, [entity, mode, reset]);

 

    const onSubmit = async (data: IUserProduct) => {
        setLoading(true);
        try {
            if (mode === Actions.CREATE) {
                const createdUser = await UserProductResource.create(data);
                addEntity(createdUser as IUserProduct);
                setIsOpen(false);
                if(next_action) next_action();
                return;
            }

            if (mode === Actions.UPDATE && entity) {
                const updatedUser = await UserProductResource.update(entity.id as number, data);
                updateEntity(updatedUser as IUserProduct);
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
                    <DialogTitle> {mode === Actions.CREATE ? 'Crear Nuevo Usuario-Producto' : 'Editar Usuario-Producto'}</DialogTitle>
                    <DialogDescription>
                        Completa el formulario para guardar un nuevo usuario-producto.
                    </DialogDescription>
                </DialogHeader>
                <div className="product-list">
                    <h1>Crear Usuario-Producto</h1>
                    <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-2">
                            <label htmlFor="how_days" className="block text-sm font-medium text-gray-700">Días*</label>
                            <input type="number" id="how_days"    {...register("how_days")} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            {errors.how_days && <p className="text-red-500 text-sm mt-1">{errors.how_days.message}</p>}
                        </div>
                        <div className="mb-2">
                            <label htmlFor="how_often" className="block text-sm font-medium text-gray-700">Frecuencia*</label>
                            <input type="number" id="how_often"    {...register("how_often")} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            {errors.how_often && <p className="text-red-500 text-sm mt-1">{errors.how_often.message}</p>}
                        </div>
                        <div className="mb-2">
                            <label htmlFor="first_take" className="block text-sm font-medium text-gray-700">Primera Toma*</label>
                            <input type="text" id="first_take"    {...register("first_take")} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            {errors.first_take && <p className="text-red-500 text-sm mt-1">{errors.first_take.message}</p>}
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