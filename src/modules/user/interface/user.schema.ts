import {z} from "zod";

export const userSchema = z.object({
    name: z.string().min(2).max(100),
    last_name: z.string().min(2).max(100),
    second_last_name: z.string().min(2).max(100),
    phone:z.preprocess((value)=>value===""?undefined:value,
    z.string().min(7).max(15).optional()),
    birth_date: z.string(),
    gender: z.string().optional(),
    allergies: z.string().optional(),
    account_owner: z.boolean().optional().default(false),
    password:z.string().min(4).max(100).optional(),
    email:z.string().email().optional(),
   
});