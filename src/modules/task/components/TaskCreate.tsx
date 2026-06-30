import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription,  DialogHeader,  DialogTitle } from '@/components/ui/dialog';
import  { Actions } from '@/interfaces/general.interface';

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {productSchema} from "../interface/task.schema";
import type { ITask } from '../interface/task.interface';
//import ProductResource from '../resources/Product.resource';
import { TaskResource } from '../resources/Task.resource';
import { useTaskStore } from '../store/task.store';
type TaskCreateProps=
    {
    isOpen: boolean,
     setIsOpen: (isOpen: boolean) => void, 
     onClose: () => void, mode: String
     entity?: ITask
    }
export const TaskCreate= ({isOpen,setIsOpen,onClose,mode,entity }: TaskCreateProps) => {
 
const addProduct = useTaskStore((state)=>state.addEntity);

const updateEntity=useTaskStore((state)=>state.updateEntity)
const setLoading= useTaskStore((state)=>state.setLoading);
const isLoading= useTaskStore((state)=>state.isLoading);

const {register,handleSubmit,formState:{errors},reset} = useForm({
    resolver: zodResolver(productSchema)
});
useEffect(()=>{
    if(mode==Actions.UPDATE && entity){
        reset({
            name:entity.name,
            description:entity.description,
         })
    }
},[entity,mode,reset])
const onSubmit=(data:ITask)=>{
    setLoading(true);
    try{
    if(mode===Actions.CREATE){
    TaskResource.create(data).then((response) => {
        const createdProduct = response;    
        addProduct(createdProduct as ITask);
        setIsOpen(false);
    }).catch((error)=>{
        console.error("Error creating product: ", error);
    });
}
if(mode===Actions.UPDATE && entity){
 TaskResource.update(entity.id as number, data).then((response) => {
        const updatedTask = response;
       
        updateEntity(updatedTask as ITask);
        setIsOpen(false);
    }).catch((error)=>{
        console.error("Error creating task: ", error);
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
                    <DialogTitle> {mode === Actions.CREATE ? 'Crear Nueva tarea' : 'Editar tarea'}</DialogTitle>
                    <DialogDescription>
                        Completa el formulario para guardar una nueva tarea.
                    </DialogDescription>
                </DialogHeader>
        <div className="product-list">
            <h1>Crear Producto</h1>

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