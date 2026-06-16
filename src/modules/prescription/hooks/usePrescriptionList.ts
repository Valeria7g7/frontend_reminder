import { useBaseList } from "@/core/hooks/useBaseList";
import {PrescriptionResource} from "../resources/Prescription.resource";
import type {  IPrescription } from "../interface/Prescription.interface";
import { usePrescriptionStore } from "../store/prescription.store";
//Hook para listar, eliminar etc registros
export function usePrescriptionsList(autoInit:boolean=true) {
    return useBaseList<IPrescription>({
        store:usePrescriptionStore,
        resource:PrescriptionResource,
        autoInit:autoInit,
        initialSearch:{sort:[{field:'name',direction:'asc'}]}
    })

}