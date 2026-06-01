import { useBaseList } from "@/core/hooks/useBaseList";
import {UserResource} from "../resources/User.resource";
import type {  IUser } from "../interface/User.interface";
import { useUserStore } from "../store/user.store";
//Hook para listar, eliminar etc registros
export function useUsersList(autoInit:boolean=true) {
    return useBaseList<IUser>({
        store:useUserStore,
        resource:UserResource,
        autoInit:autoInit,
        initialSearch:{sort:[{field:'name',direction:'asc'}]}
    })

}