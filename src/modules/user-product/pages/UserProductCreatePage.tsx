import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Actions } from '@/interfaces/general.interface';
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productsUserSchema, productsSchema } from "../interface/user-product.schema";
import type { IUserProduct, IProductIndication } from '../interface/UserProduct.interface';
import { UserProductResource } from '../resources/UserProduct.resource';
import { useUserProductStore } from '../store/userProduct.store';
import UserListPage from '@/modules/user/pages/UserListPage';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useUserStore } from '@/modules/user/store/user.store';
import { useProductStore } from '@/modules/product/store/product.store';

import { useLocation } from "react-router-dom";
import { z } from "zod"
import type { IUser } from '@/modules/user/interface/User.interface';
import ProductListPage from '@/modules/product/pages/ProductListPage';
import type { IProduct } from '@/modules/product/interface/Product.interface';
export default function UserProductCreatePage() {
    const [userSelected, setUserSelected] = useState<IUser | null>()
    const [productSelected, setProductSelected] = useState<IProduct | null>()
    const location = useLocation();
    const entityId = location.state?.id;
    const mode = (location.state?.mode) ? location.state?.mode : Actions.CREATE;
    const userStore = useUserStore()
    const productStore = useProductStore();
    const navigate = useNavigate();
    /* const [searchParams] = useSearchParams();
      const mode = searchParams.get('mode') || Actions.CREATE;
      const entityId = searchParams.get('id');  */
    const [openUsers, setOpenUsers] = useState(false);
    const [openProduct, setOpenProduct] = useState(false);
    const addEntity = useUserProductStore((state) => state.addEntity);
    const updateEntity = useUserProductStore((state) => state.updateEntity);
    const setLoading = useUserProductStore((state) => state.setLoading);
    const isLoading = useUserProductStore((state) => state.isLoading);
    const entities = useUserProductStore((state) => state.entities);

    const entity = entityId ? entities.find(e => e.id === parseInt(entityId)) : null;
    /* const entity = entities.find(e =>
        entityId ? e.id === Number(entityId) : false
    ); */
    type FormData = z.infer<typeof productsUserSchema>;
    type FormDataProducts = z.infer<typeof productsSchema>;

    const { register, handleSubmit, formState: { errors }, reset, control, setValue, watch } = useForm<FormData>({
        resolver: zodResolver(productsUserSchema),
        defaultValues: {
            user_id: userSelected?.id,
            products: []
            // account_owner: account_owner ?? false,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "products"
    });
    useEffect(() => {
        userStore.deleteAllEntities()
        productStore.deleteAllEntities()
        if (mode === Actions.UPDATE && entity) {
            reset({
                products: entity.products ?? [],
                user_id: entity.user_id ?? null
                /*  products:
                 {
                 how_days: entity.how_days,
                 how_often: entity.how_often,
                 first_take: entity.first_take,
                 description: entity.description,
                 product_id: entity.product_id,
                 }, */
                // user_id: entity.user_id,
            })
        }
    }, [entity, mode, reset]);

    useEffect(() => {
        if (userSelected) {
            setValue("user_id", userSelected?.id)
        }
    }, [userSelected])

    const onSubmit = async (data: FormData) => {
        console.log("data_ ", data)
        setLoading(true);
        try {
            if (mode === Actions.CREATE) {
                  const createdUser = await UserProductResource.create(data);
                  addEntity(createdUser as IUserProduct);
                  navigate('/users-product');
                return;
            }

            if (mode === Actions.UPDATE && entity) {
                /*  const updatedUser = await UserProductResource.update(entity.id as number, data);
                 updateEntity(updatedUser as IUserProduct);
                 navigate('/user-products'); */
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
                            onClick={() => navigate('/users-product')}
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

                    <div className="flex items-center justify-between mb-6">
                        {/* <h1 className="text-2xl font-bold text-gray-800">
                            Productos Usuarios
                        </h1> */}
                        <button
                            type="button"
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                            onClick={() => {
                                if (userSelected) setUserSelected(null)
                                setOpenUsers(true)

                            }}
                        >
                            {userSelected ? 'Elegir a otra persona' : '+ Elegir persona'}
                        </button>
                    </div>
                    {openUsers && !userSelected && (
                        <Dialog open={openUsers} onOpenChange={() => {
                            setOpenUsers(true)
                        }}>
                            <DialogHeader>
                            </DialogHeader>
                            <UserListPage autoInit={false} userSelected={userSelected} setUserSelected={setUserSelected}></UserListPage>
                        </Dialog>
                    )
                    }
                    {userSelected
                        && (
                            <div className='w-full'>
                                <div className=' mb-6 w-1/11 mx-auto'>
                                    <h1>Persona</h1>
                                </div>
                                {/* aqui los datos del user */}
                                <div className='flex items-center justify-between mb-6 w-1/3 mx-auto p-6 bg-blue-400 rounded'>
                                    <p>Nombre:</p>
                                    <p className='text-bold'>{userSelected.name}</p>
                                </div>
                            </div>
                        )}

                    <div className="flex items-center justify-between mb-6">

                        <button
                            type="button"
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                            onClick={() => {
                                append({
                                    how_days: 0,
                                    how_often: 0,
                                    first_take: "00:00",
                                    description: "",
                                    product_id: 0,
                                    openProductList: false
                                })
                            }}
                        >
                            + Medicamentos
                        </button>

                    </div>

                    {fields.map((field, i) => (

                        <form key={field.id} onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4 mt-10">
                            <button
                                type="button"
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                onClick={() =>

                                    remove(i)
                                }
                            >
                                x
                            </button>

                            <button
                                type="button"
                                className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition ms-1"
                                onClick={() => {
                                    setValue(`products.${i}.openProductList`, !watch(`products.${i}.openProductList`))//setProductSelected(null)

                                }}
                            >
                                {field.product ? 'Elegir otro Producto' : '+ Elegir Producto'}
                            </button>
                            {watch(`products.${i}.product`) && (
                                <div className='w-full'>
                                    <div className=' mb-6 w-1/11 mx-auto'>
                                        <h1>Producto {i+1}</h1>
                                    </div>
                                    {/* aqui los datos del user */}
                                    <div className='flex items-center justify-between mb-6 w-1/3 mx-auto p-6 bg-blue-400 rounded'>
                                        <p>Nombre:</p>
                                        <p className='text-bold'>{watch(`products.${i}.product.name`)}</p>
                                    </div>
                                </div>
                            )}

                            {/* aqui metemos la seleccion del producto */}
                            {watch(`products.${i}.openProductList`) && (
                                <Dialog open={watch(`products.${i}.openProductList`)} onOpenChange={() => {
                                    setValue(`products.${i}.openProductList`, !watch(`products.${i}.openProductList`))
                                }}>
                                    <DialogHeader>
                                    </DialogHeader>
                                    <ProductListPage autoInit={false} i={i} setValue={setValue} productSelected={productSelected} setProductSelected={setProductSelected}></ProductListPage>
                                </Dialog>
                            )
                            }
                            <div className="flex-col items-center  mb-6">
                                <div className="flex items-center gap-3 w-1/2">
                                    <p>Por</p>
                                    <input
                                        type="number"
                                        id="how_days"

                                        {...register(`products.${i}.how_days`, {
                                            valueAsNumber: true
                                        })}
                                        onWheel={(e)=>e.currentTarget.blur()}
                                        className="mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 text-sm"
                                    /><p>Dias</p>
                                </div>
                                <div>
                                    {errors.products?.[i]?.how_days && <p className="text-red-500 text-sm mt-1">{errors.products[i]?.how_days.message}</p>}
                                </div>
                            </div>

                            <div className="flex-col items-center  mb-6">
                                <div className="flex items-center gap-3 w-1/2">
                                    <p>Cada</p>
                                    <input
                                        type="number"
                                        id="how_often"
                                        {...register(`products.${i}.how_often`, { valueAsNumber: true })}
                                        className="w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm"
                                        onWheel={(e)=>e.currentTarget.blur()}
                                    />
                                    <p>Horas</p>
                                </div>

                                <div>

                                    {errors.products?.[i]?.how_often && <p className="text-red-500 text-sm mt-1">{errors.products[i]?.how_often.message}</p>}

                                </div>
                            </div>


                            <div className="flex-col items-center  mb-6">
                                <div className="flex items-center gap-3 w-1/2">                               
                                    <p className='w-1/4'> Primera aplicación/toma: Fue a las </p>
                                    <input
                                        type="time"
                                        id={`first_take_${i}`}
                                        {...register(`products.${i}.first_take`)}
                                        className="mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 text-sm"
                                    />
                                </div>
                                <div>
                                    {errors.products?.[i]?.first_take && <p className="text-red-500 text-sm mt-1">{errors.products[i]?.first_take.message}</p>}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Descripción
                                </label>
                                <input
                                    type="text"
                                    id="description"
                                    {...register(`products.${i}.description`)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 text-sm"
                                />
                                {errors.products?.[i]?.description && <p className="text-red-500 text-sm mt-1">{errors.products[i].description.message}</p>}
                            </div>


                        </form>
                    ))}
                    <div className="flex justify-between pt-6 border-t">
                        <button
                            type="button"
                            onClick={() => navigate('/user-products')}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            /*  type="submit" */
                            disabled={isLoading}
                            onClick={handleSubmit(onSubmit)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Guardando..." : (mode === Actions.CREATE ? "Crear" : "Actualizar")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};