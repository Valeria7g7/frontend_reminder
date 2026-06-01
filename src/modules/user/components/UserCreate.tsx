import { useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription,  DialogHeader,  DialogTitle } from '@/components/ui/dialog';
import  { Actions } from '@/interfaces/general.interface';

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {userSchema} from "../interface/user.schema";
import type { IUser } from '../interface/User.interface';
import { UserResource } from '../resources/User.resource';
import { useUserStore } from '../store/user.store';
type UserCreateProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onClose: () => void;
    mode: string;
    entity?: IUser;
};

export const UserCreate = ({ isOpen, setIsOpen, onClose, mode, entity }: UserCreateProps) => {

    const addEntity = useUserStore((state) => state.addEntity);

const updateEntity=useUserStore((state)=>state.updateEntity)
const setLoading= useUserStore((state)=>state.setLoading);
const isLoading= useUserStore((state)=>state.isLoading);

const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
        account_owner: false,
    },
});

useEffect(() => {
    if (mode === Actions.UPDATE && entity) {
        reset({
            name: entity.name,
            last_name: entity.last_name,
            second_last_name: entity.second_last_name,
            phone: entity.phone,
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
        <div className="product-list">
            <h1>Crear Usuario</h1>
            {/* aqui creamos el formulario para crear un nuevo usuario */}

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
               {/*  <div className="mb-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" {...register("email")} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div> */}
               {/*  <div className="mb-4 flex items-center gap-2">
                    <input type="checkbox" id="account_owner" {...register("account_owner")} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <label htmlFor="account_owner" className="text-sm font-medium text-gray-700">Cuenta a nombre del dueño</label>
                </div> */}
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