import {z} from "zod";
import { productSchema } from "@/modules/product/interface/product.schema";
export const productPrescription = z.object({
    how_days: z.number().min(1).max(365),
    how_often: z.number().min(1),
    first_take: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
    description: z.string().optional(),
    product_id: z.number(),   
    product: productSchema.optional(),
    //opcional para modal
    openProductList:z.boolean()
});
export const productsUserSchema=z.object({
    products:z.array(productPrescription),
    user_id:z.number().optional()
})

export const productsSchema=z.object({
    products:z.array(productPrescription),
    
})