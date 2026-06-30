import { useEffect, useState } from 'react';
import { TaskCreate } from '../components/TaskCreate';
import { Actions } from '@/interfaces/general.interface';
import { useTaskStore } from '../store/task.store';   

import { useTasksList } from '../hooks/useTaskList';
import { TableActions } from '@/core/genericComponents/TableActions';
import type { ITask } from '../interface/task.interface';
import {TaskResource} from '../resources/Task.resource';
import { MessageConfirmation } from '@/core/genericComponents/MessageConfirmation';
import {SearchTable} from '@/core/genericComponents/SearchTable'
import { LoadingComponent } from '@/core/genericComponents/LoadingComponent';
import { NoData } from '@/core/genericComponents/NoData';
export default function TaskListPage() {
    const { onSearch,paramsSearch,onReset} = useTasksList(true);
    const entities= useTaskStore((state)=>state.entities);
    const isLoading= useTaskStore((state)=>state.isLoading);
    
    const deleteEntity= useTaskStore((state)=>state.deleteEntity);

  
    const [showModalNewTask, setShowNewTask] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    
    //para mandar el mode
    const [mode, setMode] = useState<String>(Actions.CREATE);
    const [entity,setEntity]=useState<ITask|undefined>(undefined);


    const onEdit=async(product:ITask)=>{
         setMode(Actions.UPDATE);
         setShowNewTask(true);
         setEntity(product);
    }
   /*  useEffect(() => {
        fetchProducts();
        
    }, []); */

    /* const fetchProducts = async () => {
        try {
            onSearch();
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
         
        }
    }; */

const getConfirmation=(entity:ITask)=>{
    setShowConfirmation(true);
    setEntity(entity);
}
    //delete
    const onDelete=(entity:ITask)=>{
        if(!entity )return;
        TaskResource.remove(entity.id as any).then(()=>{
            deleteEntity(entity.id as any); 
        })
    }

    return (
        <div className="p-6 bg-gray-100 min-h-full">
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6">

        {isLoading &&(
            <LoadingComponent text="Productos"/>
        )}

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Tareas
                    </h1>
                    <button
                        type="button"
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        onClick={() => {
                            setMode(Actions.CREATE);
                            setShowNewTask(true);
                        }}
                    >
                        + nuevo
                    </button>
                </div>

                
                  <div className="mb-8">
               <SearchTable 
               paramsSearch={paramsSearch}
               onSearch={onSearch}
               onClear={onReset}
               />
               </div>
               

                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">

                       
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="px-4 py-3 text-left border-b">Name</th>
                                <th className="px-4 py-3 text-left border-b">Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                 
                        <tbody className="text-gray-700">
                            {entities.map((product) => (
                                <tr
                                    key={product.id}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-3">
                                        {product.name}
                                    </td>
                                    <td className="px-4 py-3">
                                        {product.description ?? '—'}
                                    </td>
                                    
                                    <td className="px-4 py-3">
                                            <TableActions canDelete={true} canEdit={true} onDelete={() =>getConfirmation(product)}   onEdit={() => onEdit(product)} />
                                       
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
                 {entities.length === 0 && (
                                    <div className="border border-border rounded-lg p-6">
                                        <NoData />
                                    </div>
                
                                )}
            </div>
            {showModalNewTask && (
                <TaskCreate 
                 isOpen={showModalNewTask}
                 mode ={mode}
                 setIsOpen={setShowNewTask} 
                 onClose={() => setShowNewTask(false)} 
                 entity={entity}
                 />
            )}
       {showConfirmation &&(
        <MessageConfirmation
        message="¿Estás seguro de que deseas eliminar esta tarea?"
        onConfirm={()=>{
            if(entity)onDelete(entity);
            setShowConfirmation(false);
        }}
        onCancel={()=>setShowConfirmation(false)}
        />
       )}

        </div>
    );
}