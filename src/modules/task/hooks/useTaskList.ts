import { useBaseList } from "@/core/hooks/useBaseList";
import {TaskResource} from "../resources/Task.resource";
import type { ITask } from "../interface/task.interface";
import { useTaskStore } from "../store/task.store";
//Hook para listar, eliminar etc registros
export function useTasksList(autoInit:boolean=true) {
    return useBaseList<ITask>({
        store:useTaskStore,
        resource:TaskResource,
        autoInit:autoInit,
        initialSearch:{sort:[{field:'name',direction:'asc'}]}
    })

}