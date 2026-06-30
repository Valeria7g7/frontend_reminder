import type { IEntity } from "@/core/interfaces/interfaces.interface";

export interface IUser extends IEntity { 
    id?: number;
    name: string;
    last_name: string;
    second_last_name?: string;
    phone?: string;
    email?: string;
    account_owner?: boolean;
    birth_date?: string;
    gender?: string;
    allergies?: string;
    [key: string]: unknown;
}