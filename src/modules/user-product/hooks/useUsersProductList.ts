import { useBaseList } from "@/core/hooks/useBaseList";
import {UserProductResource} from "../resources/UserProduct.resource";
import type {  IUserProduct } from "../interface/UserProduct.interface";
import { useUserProductStore } from "../store/userProduct.store";
//Hook para listar, eliminar etc registros
export function useUsersProductList(autoInit:boolean=true) {
    return useBaseList<IUserProduct>({
        store:useUserProductStore,
        resource:UserProductResource,
        autoInit:autoInit,
        initialSearch:{sort:[{field:'name',direction:'asc'}]}
    })

}