import {z} from "zod";
export const userSchema = z.object({
    //name: z.string().min(2).max(100),
    how_days: z.number().min(1).max(365),
    how_often: z.number().min(1),
    first_take:z.number(),
    description: z.string().optional(),
    user_id: z.number(),
    product_id: z.number(),   
});