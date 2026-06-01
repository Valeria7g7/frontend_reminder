import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription,  DialogHeader,  DialogTitle } from '@/components/ui/dialog';
import  { Actions } from '@/interfaces/general.interface';

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {productSchema} from "../interface/product.schema";
import type { IProduct } from '../interface/Product.interface';
//import ProductResource from '../resources/Product.resource';
import { ProductResource } from '../resources/Product.resource';
import { useProductStore } from '../store/product.store';
type ProductCreateProps=
    {
    isOpen: boolean,
     setIsOpen: (isOpen: boolean) => void, 
     onClose: () => void, mode: String
     entity?: IProduct
    }
export const ProductCreate= ({isOpen,setIsOpen,onClose,mode,entity }: ProductCreateProps) => {
 
const addProduct = useProductStore((state)=>state.addEntity);

const updateEntity=useProductStore((state)=>state.updateEntity)
const setLoading= useProductStore((state)=>state.setLoading);
const isLoading= useProductStore((state)=>state.isLoading);

const {register,handleSubmit,formState:{errors},reset} = useForm({
    resolver: zodResolver(productSchema)
});
useEffect(()=>{
    if(mode==Actions.UPDATE && entity){
        reset({
            name:entity.name,
            description:entity.description,
            price:entity.price
         })
    }
},[entity,mode,reset])
const onSubmit=(data:IProduct)=>{
    setLoading(true);
    try{
    if(mode===Actions.CREATE){
    ProductResource.create(data).then((response) => {
        const createdProduct = response;    
        addProduct(createdProduct as IProduct);
        setIsOpen(false);
    }).catch((error)=>{
        console.error("Error creating product: ", error);
    });
}
if(mode===Actions.UPDATE && entity){
 ProductResource.update(entity.id as number, data).then((response) => {
        const updatedProduct = response;
        console.log("response update: ", updatedProduct);
        updateEntity(updatedProduct as IProduct);
        setIsOpen(false);
    }).catch((error)=>{
        console.error("Error creating product: ", error);
    });
     
}
setLoading(false);
    }catch(error){
        setLoading(false);
    }
}


  

 

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='max-w-2xl'>
                <DialogHeader>
                    <DialogTitle> {mode === Actions.CREATE ? 'Crear Nuevo Producto' : 'Editar Producto'}</DialogTitle>
                    <DialogDescription>
                        Completa el formulario para guardar un nuevo producto.
                    </DialogDescription>
                </DialogHeader>
        <div className="product-list">
            <h1>Crear Producto</h1>
            {/* aqui creamos el formulario para crear un nuevo producto */}

            <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre*</label>
                    <input type="text" id="name"    {...register("name")} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div className="mb-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción(opcional)</label>
                    <textarea id="description" {...register("description")} name="description"  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>
                <div className="mb-2">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio(opcional)</label>
                    <input type="number" {...register("price")} name="price"  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                </div>
                <div  className="flex justify-between">

                <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
               {isLoading?"Guardando...":(mode==Actions.CREATE?"Crear":"Actualizar" )}</button>
                </div>
            </form>

        </div>

       
        
        </DialogContent>
        </Dialog>
    );
};