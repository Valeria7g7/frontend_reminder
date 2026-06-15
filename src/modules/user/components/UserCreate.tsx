import { useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Actions } from '@/interfaces/general.interface';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../interface/user.schema";
import type { IUser } from '../interface/User.interface';
import { UserResource } from '../resources/User.resource';
import { useUserStore } from '../store/user.store';
import { FormUser } from './FormUser';
type UserCreateProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onClose: () => void;
    mode: string;
    entity?: IUser;
    next_action?:()=>void;
  
};

export const UserCreate = ({ isOpen, setIsOpen, onClose, mode, entity, next_action }: UserCreateProps) => {

    const addEntity = useUserStore((state) => state.addEntity);

    const updateEntity = useUserStore((state) => state.updateEntity)
    const setLoading = useUserStore((state) => state.setLoading);
    const isLoading = useUserStore((state) => state.isLoading);

  /*   const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
            account_owner: account_owner ?? false,
        },
    }); */
  const {  reset } = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
            account_owner:  false,
        },
    });
    useEffect(() => {
        if (mode === Actions.UPDATE && entity) {
            reset({
                name: entity.name,
                last_name: entity.last_name,
                second_last_name: entity.second_last_name,
                phone: entity.phone,
                birth_date: entity.birth_date,
                gender: entity.gender,
                allergies: entity.allergies,
                /*             email: entity.email, */
                account_owner: entity.account_owner ?? false,
            });
        }
    }, [entity, mode, reset]);

    const onSubmit = async (data: IUser) => {
        setLoading(true);
        try {
            if (mode === Actions.CREATE) {
                const createdUser = await UserResource.create(data);
                addEntity(createdUser as IUser);
                setIsOpen(false);
                if(next_action) next_action();
                return;
            }

            if (mode === Actions.UPDATE && entity) {
                const updatedUser = await UserResource.update(entity.id as number, data);
                updateEntity(updatedUser as IUser);
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
                    <FormUser  onSubmit={onSubmit} mode={mode} setIsOpen={setIsOpen} isOpen={isOpen} isLoading={isLoading} />
               {/*  <div className="product-list">
                    <h1>Crear Usuario</h1>
                    <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre*</label>
                            <input type="text" id="name"    {...register("name")} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>
                        <div className="mb-2">
                            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Primer Apellido*</label>
                            <input type="text" id="last_name"    {...register("last_name")} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>}
                        </div>
                        <div className="mb-2">
                            <label htmlFor="second_last_name" className="block text-sm font-medium text-gray-700">SegundoApellido</label>
                            <input type="text" id="second_last_name" {...register("second_last_name")} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            {errors.second_last_name && <p className="text-red-500 text-sm mt-1">{errors.second_last_name.message}</p>}
                        </div>
                        <div className="mb-2">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefono</label>
                            <input type="text" id="phone"    {...register("phone")} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                        </div>
                        <div className="mb-2">
                            <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                            <input type="date" id="birth_date"    {...register("birth_date")} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            {errors.birth_date && <p className="text-red-500 text-sm mt-1">{errors.birth_date.message}</p>}
                        </div>

                        <div className="mb-2">
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Genero Biologico</label>
                            <select id="gender" {...register("gender")} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                                <option value="">Selecciona un genero</option>
                                <option value="male">Masculino</option>
                                <option value=" female">Femenino</option>
                            </select>
                            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
                        </div>
                        <div className="mb-2">
                            <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">Alergias</label>
                            <textarea id="allergies" {...register("allergies")} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                            {errors.allergies && <p className="text-red-500 text-sm mt-1">{errors.allergies.message}</p>}
                        </div>
                        <div className="flex justify-between">
                            <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">Cancelar</button>
                            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                                {isLoading ? "Guardando..." : (mode === Actions.CREATE ? "Crear" : "Actualizar")}
                            </button>
                        </div>
                    </form>

                </div> */}



            </DialogContent>
        </Dialog>
    );
};