import {create} from 'zustand';
import {devtools} from 'zustand/middleware';    
import type { EntityId,IPagination } from '@/core/interfaces/interfaces.interface';
import type { IStore, IEntity,  } from '@/core/interfaces/interfaces.interface';

export function createEntityStore<T extends IEntity>(name: string) {
   return create<IStore<T>>()(
    devtools((set,get)=>({
        entities:[],
        selectedId:null,
        currentEntity:null,
        isLoading:false,
        isSaving:false,
        isDeleting:false,
        pagination: {page:1,limit:10,total:0,pages:0,per_page:10,to:null,from:null},
        paginationMeta:null,
        setLoading:(value:boolean)=>set({isLoading:value}),
        setIsSaving:(value:boolean)=>set({isSaving:value}),
        setDeleting:(value:boolean)=>set({isDeleting:value}),
        setEntities:(entities:T[])=>set({entities:entities}),
        addEntity:(entity:T)=>set((state:any )=>({entities:[entity,...state.entities]})),
        updateEntity:(entity:Partial<T>)=>set((state:any)=>({entities:state.entities.map((e:T)=>e.id === entity.id ? {...e,...entity} : e)})),
        deleteEntity:(id:EntityId)=>set((state:any)=>({entities:state.entities.filter((e:T)=>e.id !== id)})),
        selectEntity:(id:EntityId | null)=>set({selectedId:id,currentEntity:get().entities.find((e:T)=>e.id === id) || null}),
        clearSelection:()=>set({entities:[], selectedId:null,currentEntity:null}),
        setPagination:(pagination:IPagination)=>set({pagination:pagination}),
        selectedEntity:(id:EntityId)=>set({selectedId:id}),
        getSelectedEntity:()=>{
            const state=get();
            return state.entities.find((e:T)=>e.id===state.selectedId)
        },
        setPaginationMeta:(meta:any)=>set({paginationMeta:meta}),
        deleteAllEntities:()=>set({entities:[]})

    }))
   )
}