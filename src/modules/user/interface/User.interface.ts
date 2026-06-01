export interface IUser { 
    id?: number;
    name: string;
    last_name: string;
    second_last_name?: string;
    phone?: string;
    email?: string;
    account_owner?: boolean;
    [key: string]: unknown;
}