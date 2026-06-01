import type { EntityId } from "@/core/interfaces/interfaces.interface";

export interface IProduct { 
    id?:  EntityId;
    name: string;
    price?: string|null|undefined;
    description?: string|null|undefined;
    [key: string]: unknown;
}