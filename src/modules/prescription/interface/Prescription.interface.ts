export interface IPrescription { 
    id?: number;
    date:string;
    total?: number;
    description?: string;
    [key: string]: unknown;
}