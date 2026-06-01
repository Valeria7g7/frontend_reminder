import type { IPaginatedResponse,  } from '@/core/interfaces/interfaces.interface';
import { apiClient } from '@/core/api/apiClient';
import { map } from 'zod';

//creamos un tipo de recurso generico, el cual define la estructura que tendran los 
//recursos hijos", es decir los parametros que pasaran los recursos de los modulos

////Partial convierte todas sus propiedaddes de un tipo en opcinales, ejemplo {id?: string, name?: string} //
//TRecord representa como luce el registro compleyo
//TForm representa como luce el formulario, que puede ser diferente al registro, por ejemplo el formulario no tiene el id, o tiene campos adicionales para el formulario
export interface CrudApiTypes<TRecord,TForm,TCustomMethods=Record<string, unknown>>{
    baseApi:string;
    mapListResponse?:(payload:IPaginatedResponse<TRecord>)=>IPaginatedResponse<TRecord>;
    mapCreateInput?: (input:TForm)=>unknown;
    mapUpdateInput?: (input:TForm)=>unknown;
    customMethods?:(baseApi:string)=>TCustomMethods;
}

//creamos una constante(funcion) generica tambien, para que de aqui los recursos hijos puedan crear sus propios recursos.
//pero con sus parametros personalizados de cada modulo.
//estos parametros "<TRecord extends Record<string, unknown>,TForm extends Record<string, unknown>,TParams = Record<string, unknown>"  genericos definene los tipos con los que voy a trabajar, ejemplo User etc...
export const crudApi = < TRecord extends Record<string, unknown>,
TForm extends Record<string, unknown>,
TParams = Record<string, unknown>,
TCustomMethods=Record<string, unknown>>({
    baseApi,
    mapListResponse
    ,mapCreateInput,
    mapUpdateInput,
    customMethods,
}:CrudApiTypes<TRecord,TForm,TCustomMethods>)=>{///{baseApi, mapListResponse,mapCreateInput, mapUpdateInput, customMethods,}:CrudApiTypes<TRecord,TForm,TCustomMethods>) y estos son los que va a recibir el recurso hijo, , como en este caso una variable path y metodos, 
    //funcion para limpiar los parametros
    const cleanParams = async (payload:TForm)=>{
        const includedParams: Record<string, string>={};
        const payloadObj=payload as Record<string,unknown>;
        if(payloadObj.include){
        includedParams.include=String(payloadObj.include);

        }
        const queryParams=new URLSearchParams(includedParams);
return queryParams;
    }
 const list = async (params: TParams) => {
    const { data } = await apiClient.get<IPaginatedResponse<TRecord>>(baseApi, { params });
    return mapListResponse ? mapListResponse(data) : data;
  };
    const search = async (params: TParams) => {
    const { data } = await apiClient.post<IPaginatedResponse<TRecord>>(`${baseApi}/search`, params);
    return mapListResponse ? mapListResponse(data) : data;
  };
  const create=async(payload:TForm):Promise<TRecord>=>{
    const body=mapCreateInput ? mapCreateInput(payload) : payload;
    const queryParams=await cleanParams(payload);
   // const {data}=await apiClient.post<{response: TRecord}>(baseApi, { params: queryParams,body:body });
    const { data } = await apiClient.post<{data: TRecord}>(`${baseApi}?${queryParams.toString()}`,body );
    
    return data.data;
  }

  const update=async(id:string|number,payload:TForm):Promise< TRecord>=>{
    const body=mapUpdateInput ? mapUpdateInput(payload) : payload;
    const queryParams=await cleanParams(payload);
   //const {data}=await apiClient.put<{data:TRecord}>(`${baseApi}/${id}`, { params: queryParams, body: body });
    const { data } = await apiClient.put<{data: TRecord}>(`${baseApi}/${id}?${queryParams.toString()}`,body );
    return data.data;
  }

  const show = async (id:string, params:Partial<TForm>)=>{
    const {data}=await apiClient.get<{data:TRecord}>(`${baseApi}/${id}`, { params });
    return data;
  }
  const remove=async(id:string)=>{
    await apiClient.delete(`${baseApi}/${id}`);
  }
  const methods={list,create,update,show,remove,search,...(customMethods ? customMethods(baseApi) : {})}
  return methods;
}
