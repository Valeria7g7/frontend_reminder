import type { IUser } from "@/modules/user/interface/User.interface";
import type { IProduct } from "@/modules/product/interface/Product.interface";
export interface IUserProduct { 
    id?: number;
    how_days: number;
    how_often: number;
    first_take: number;
    description?: string;
    user_id: number;
    product_id: number;
    user?: IUser,
    product?: IProduct,
    [key: string]: unknown;
}