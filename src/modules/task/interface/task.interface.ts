import type { EntityId } from "@/core/interfaces/interfaces.interface";

export interface ITask { 
    id?:  EntityId;
    name: string;
    description?: string|null|undefined;
    [key: string]: unknown;
}