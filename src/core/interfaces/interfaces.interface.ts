export interface Scope {
    name: string;
    description?: string;
}
export interface Filter {   
    field: string;
    operator: string;
    value: any;
}
export interface Search {
    value: string;
    caseSensitive?: string[];
}
export interface Sort {
    field: string;
    direction: 'asc' | 'desc';
}
export interface Agregate {
    relation: string;
    type?: string;
    filters?: Filter[];
}
export interface Include {
    relation: string;
    fields?: string[];
    filters?: Filter[];
}
export interface ISearchParams{
    id?:string;
    scopes?:Scope[];
    filters?:Filter[];
    search?:Search|null;
    sort?:Sort[];
    aggregates?:Agregate[];
    includes?:Include[];
}
export const initialSearch: ISearchParams = {
    search: undefined,
    filters: [],
    sort: [],
    includes: [],
  };
export type EntityId = string | number;

export interface IEntity {
    id?: EntityId;
}
/* type Pagination = { page: number; limit: number; total: number }; */
export interface IPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
  per_page: number;
  to: number | null;
  from: number | null;
}
export interface IStore <T extends IEntity> {
       entities: T[];
       selectedId: EntityId | null;
       currentEntity: T | null;
       isLoading: boolean;
       isSaving: boolean;
       isDeleting: boolean;
       pagination: IPagination;
       paginationMeta: IPaginationMeta | null;
    
       deleteAllEntities: () => void;
       setLoading: (value: boolean) => void;
       setIsSaving: (value: boolean) => void;
       setDeleting: (value: boolean) => void;
       setEntities: (entities: T[]) => void;
       addEntity: (entity: T) => void;
       updateEntity: (entity: Partial<T>) => void;
       deleteEntity: (id: EntityId) => void;
       selectEntity: (id: EntityId | null) => void;
       clearSelection: () => void;
       setPagination: (pagination:Partial< IPagination>) => void;
       selectedEntity: (id: EntityId) => void;
       getSelectedEntity: () => T | undefined | null;
       setPaginationMeta: (meta: IPaginationMeta | null) => void;
   };
type AnyResource=Record<string, any>;

export interface UseBaseListConfig<T extends IEntity>{
    store:()=>IStore<T>;
    resource:AnyResource;
    autoInit?:boolean;
    overrideParams?:Record<string, any>;
    initialSearch?:ISearchParams;
}

export interface IOverridesParams{
    page?:number;
    limit?:number;
}

export interface IPaginationMeta {
    current_page: number;
    from: number | null;
    last_page: number;
    per_page: number;
    to: number | null;
    total: number;
    path?: string;
    first_page_url?: string;
    last_page_url?: string;
    next_page_url?: string | null;
    prev_page_url?: string | null;
}

export interface IPaginatedResponse<T> {
  data: T[];
  total?: number;
  meta?: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from: number | null;
    to: number | null;
    first_page_url?: string;
    last_page_url?: string;
    next_page_url?: string | null;
    prev_page_url?: string | null;
    path?: string;
  };
  links?: {
    first?: string;
    last?: string;
    prev?: string | null;
    next?: string | null;
  };
}