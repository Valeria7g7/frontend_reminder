import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Actions } from '@/interfaces/general.interface';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../interface/user-product.schema";
import type { IUserProduct } from '../interface/UserProduct.interface';
import { UserProductResource } from '../resources/UserProduct.resource';
import { useUserProductStore } from '../store/userProduct.store';
import UserListPage from '@/modules/user/pages/UserListPage';
export default function UserProductCreatePage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode') || Actions.CREATE;
    const entityId = searchParams.get('id');

    const addEntity = useUserProductStore((state) => state.addEntity);
    const updateEntity = useUserProductStore((state) => state.updateEntity);
    const setLoading = useUserProductStore((state) => state.setLoading);
    const isLoading = useUserProductStore((state) => state.isLoading);
    const entities = useUserProductStore((state) => state.entities);

    const entity = entityId ? entities.find(e => e.id === parseInt(entityId)) : undefined;

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
                navigate('/user-products');
                return;
            }

            if (mode === Actions.UPDATE && entity) {
                const updatedUser = await UserProductResource.update(entity.id as number, data);
                updateEntity(updatedUser as IUserProduct);
                navigate('/user-products');
            }
        } catch (error) {
            console.error("Error saving user: ", error);
        } finally {
            setLoading(false);
        }
    };






    return (
          <div className="p-6 bg-gray-100 min-h-full">
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="mb-6">
                        <button
                            onClick={() => navigate('/user-products')}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 flex items-center"
                        >
                            ← Volver
                        </button>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {mode === Actions.CREATE ? 'Crear Nuevo Usuario-Producto' : 'Editar Usuario-Producto'}
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Completa el formulario para guardar un nuevo usuario-producto.
                        </p>
                    </div>



                    {/* aqui meto la parte para seleccionar un user
                     */}

<UserListPage ></UserListPage>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label htmlFor="how_days" className="block text-sm font-medium text-gray-700">
                                Días*
                            </label>
                            <input
                                type="number"
                                id="how_days"
                                {...register("how_days")}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 text-sm"
                            />
                            {errors.how_days && <p className="text-red-500 text-sm mt-1">{errors.how_days.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="how_often" className="block text-sm font-medium text-gray-700">
                                Frecuencia*
                            </label>
                            <input
                                type="number"
                                id="how_often"
                                {...register("how_often")}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 text-sm"
                            />
                            {errors.how_often && <p className="text-red-500 text-sm mt-1">{errors.how_often.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="first_take" className="block text-sm font-medium text-gray-700">
                                Primera Toma*
                            </label>
                            <input
                                type="text"
                                id="first_take"
                                {...register("first_take")}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 text-sm"
                            />
                            {errors.first_take && <p className="text-red-500 text-sm mt-1">{errors.first_take.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Descripción
                            </label>
                            <input
                                type="text"
                                id="description"
                                {...register("description")}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 text-sm"
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                        </div>

                        <div className="flex justify-between pt-6 border-t">
                            <button
                                type="button"
                                onClick={() => navigate('/user-products')}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Guardando..." : (mode === Actions.CREATE ? "Crear" : "Actualizar")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};