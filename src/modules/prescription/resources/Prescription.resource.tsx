
import type { IPrescription } from '../interface/Prescription.interface';
import { crudApi } from '@/core/resources/resourceApi';

const baseCrudApiResource=crudApi<IPrescription,Partial<IPrescription>>({
    baseApi:'/users'
})
export const PrescriptionResource={
    ...baseCrudApiResource//con los 3 puntos le dice copeate todas las propiedades de baseCrudApiResource y agregalas a ProductResource, entonces ProductResource va a tener los metodos list, create, update, etc... que se definieron en el crudApi   
}