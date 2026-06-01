import { useBaseList } from "@/core/hooks/useBaseList";
import {ProductResource} from "../resources/Product.resource";
import type { IProduct } from "../interface/Product.interface";
import { useProductStore } from "../store/product.store";
//Hook para listar, eliminar etc registros
export function useProductsList(autoInit:boolean=true) {
    return useBaseList<IProduct>({
        store:useProductStore,
        resource:ProductResource,
        autoInit:autoInit,
        initialSearch:{sort:[{field:'name',direction:'asc'}]}
    })

}