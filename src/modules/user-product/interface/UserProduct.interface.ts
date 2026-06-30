import type { IUser } from "@/modules/user/interface/User.interface";
import type { IProduct } from "@/modules/product/interface/Product.interface";
export interface IUserProduct { 
    id?: number;
    products:IProductIndication[],
    user_id:number
   user?: IUser,
[key: string]: unknown;
}

export interface IProductIndication{
    product: IProduct
    how_days: number;
    how_often: number;
    first_take: string;
    description?: string;
    product_id: number;
}