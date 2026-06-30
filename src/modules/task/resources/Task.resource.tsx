
import type { ITask } from '../interface/task.interface';
import { crudApi } from '@/core/resources/resourceApi';

const baseCrudApiResource=crudApi<ITask,Partial<ITask>>({
    baseApi:'/task'
})
export const TaskResource={
    ...baseCrudApiResource//con los 3 puntos le dice copeate todas las propiedades de baseCrudApiResource y agregalas a ProductResource, entonces ProductResource va a tener los metodos list, create, update, etc... que se definieron en el crudApi   
}