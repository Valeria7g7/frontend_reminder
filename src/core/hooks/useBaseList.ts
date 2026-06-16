import { ca } from "zod/v4/locales";
import type { ISearchParams, UseBaseListConfig ,IEntity, IOverridesParams} from "../interfaces/interfaces.interface";
import { useCallback, useState } from "react";

//creamos el hook base list con sus metodos genericos
export function useBaseList<T extends IEntity>
(config:UseBaseListConfig<T>){
    const store=config.store();
    const initialSearch=config.initialSearch || {};
    const [paramsSearch,setParamsSearch]=useState<ISearchParams>(config.initialSearch || {});

    //primer funcion  para construir los parametros a enviar al back
    const buildParams = useCallback(
        (overrides?:IOverridesParams, searchOverride?:ISearchParams)=>{

            const pagination = overrides ? { ...store.pagination, ...overrides } : store.pagination;
            const {page}=pagination;
            const {limit}=pagination;

            //aqui indicamos que los parametros se mergeen, contemplando que si el ultimo indicado
            //osea searchOverride tiene un valor, este se priorice sobre los anteriores
            //y al final el resultado sea un objeto de tipo ISearchParams
            const currentSearch:ISearchParams = {
                ...initialSearch,
                ...paramsSearch,
                ...searchOverride,
            };
            const params:Record<string, any> = {
                page,
                limit,
                ...(config.overrideParams || {})
            };

            
      if (currentSearch.search?.value) {
        params.search = {
          value: currentSearch.search.value.trim(),
          case_sensitive: false,
        };
      }

      if (currentSearch.filters?.length) {
        params.filters = currentSearch.filters;
      }

      if (currentSearch.sort?.length) {
        params.sort = currentSearch.sort;
      }
      if (currentSearch.includes?.length) {
        params.includes = currentSearch.includes;
      }

            return params;
    },[store.pagination,paramsSearch,config.overrideParams]);


    //ahora si las funciones para consumir apis
    const getList=useCallback(//memorizala funcion para que no se vuelva a crear en cada renderizado
        async(
            paramsOverride?:IOverridesParams,
            searchOverride?:ISearchParams
        )=>{
            store.setLoading(true);
            try{
                const params=buildParams(paramsOverride,searchOverride);
                const response= await config.resource.search(params);
                const data=response.data as T[];
                store.setEntities(data);
                let paginationUpdate;

        if (response.meta && typeof response.meta === 'object') {
          // Use meta information if available
          const meta = response.meta;
          const page = (params.page as number) || 1;
          const limit = (params.limit as number) || 20;
          paginationUpdate = {
            page: meta.current_page || page,
            limit: meta.per_page || limit,
            total: meta.total || response.total || response.data.length,
            pages:
              meta.last_page ||
              Math.ceil(
                (meta.total || response.total || response.data.length) / (meta.per_page || limit)
              ),
            per_page: meta.per_page || limit,
            from: meta.from || (page - 1) * limit + 1,
            to:
              meta.to ||
              Math.min(page * limit, meta.total || response.total || response.data.length),
          };
          store.setPaginationMeta(response.meta);
        } else {
          // Calculate pagination based on request params and response data
          const currentPage = (params.page as number) || 1;
          const pageSize = (params.limit as number) || 20;
          const totalItems = response.total || response.data.length;

          // For APIs that don't provide meta, we need to make assumptions
          // If we get exactly pageSize items, there might be more pages
          // If we get less than pageSize, this is likely the last page
          let totalPages;
          if (totalItems && totalItems > 0) {
            // Use explicit total if provided
            totalPages = Math.ceil(totalItems / pageSize);
          } else if (response.data.length === pageSize) {
            // We got a full page, assume there might be more
            // This is a rough estimate - we can't know for sure without total
            totalPages = currentPage + 1;
          } else {
            // We got less than a full page, this is likely the last page
            totalPages = currentPage;
          }

          paginationUpdate = {
            page: currentPage,
            limit: pageSize,
            total: totalItems || response.data.length,
            pages: totalPages,
            per_page: pageSize,
            from: response.data.length > 0 ? (currentPage - 1) * pageSize + 1 : null,
            to:
              response.data.length > 0 ? (currentPage - 1) * pageSize + response.data.length : null,
          };
        }

        store.setPagination(paginationUpdate);

        return response;
            }
            catch(error){
              store.deleteAllEntities();
                store.setPaginationMeta(null);
                throw error;
            }finally{
                store.setLoading(false);
            }
        },
        [buildParams,config.resource,store]//le dice recrea la funcion si uno de estos 3 parametros cambia
    );

     // Search
  const onSearch = useCallback(
    (search?: Partial<ISearchParams>) => {
      //agg
      setParamsSearch((prev) => {
        // Mergear con los parámetros iniciales para preservarlos
        const updated: ISearchParams = {
          ...initialSearch,
          ...prev,
          ...search,
          // Preservar arrays iniciales si no se especifican explícitamente
          filters:
            search?.filters !== undefined
              ? search.filters
              : prev.filters?.length
                ? prev.filters
                : initialSearch.filters,
          includes:
            search?.includes !== undefined
              ? search.includes
              : prev.includes?.length
                ? prev.includes
                : initialSearch.includes,
          sort:
            search?.sort !== undefined
              ? search.sort
              : prev.sort?.length
                ? prev.sort
                : initialSearch.sort,
        };
        return updated;
      });
      //
      store.setPagination({ page: 1 });
      return getList({ page: 1 }, search);
    },
    [store, getList, initialSearch]
  ); //agg initialSearch
 // Select
  const onSelect = useCallback(async () => {
    const response = await config.resource.select('created_at');
    const entityName = config.resource.getEntityName();
    return response?.[entityName] || [];
  }, [config.resource]);

  // Reset
  const onReset = useCallback(() => {
    const resetSearch: ISearchParams = {
      search: null,
      filters: [],
      sort: [{ field: 'created_at', direction: 'desc' }],
    };
    setParamsSearch(resetSearch);
    store.setPagination({ page: 1 });
    return getList({ page: 1 }, resetSearch);
  }, [store, getList]);

  // Page change
  const onPageChanged = useCallback(
    (page: number, limit?: number) => {
      const paginationUpdate = {
        page,
        ...(limit ? { limit } : {}),
      };

      // Update store first
      store.setPagination(paginationUpdate);

      // Call getList with the exact parameters we want to use
      return getList(paginationUpdate);
    },
    [store, getList]
  );
    //remove, para eliminar un registro
    const onRemove=useCallback(async(entity:T)=>{
        
        if(!config.resource.remove)return;
        try{
            store.setDeleting(true);
        await config.resource.remove(entity.id);
        store.deleteEntity(entity.id as string);
        }catch(error){
            store.setDeleting(false);
            throw error;
        }finally{
            store.setDeleting(false);
        }

    },[config.resource,store]);
    //restore, para restarurar un registro eliminaod
    const onRestore=useCallback(async(entity:T)=>{
        if(!config.resource.restore)return;
        await config.resource.restore(entity.id);
        store.updateEntity({
            id:entity.id} as Partial<T>);
        
    },[config.resource,store]);

    return {
        onPageChanged,
        onRemove,
        onRestore,
        onSearch,
        paramsSearch,
        setParamsSearch,
        onReset,
        onSelect
    }
}


