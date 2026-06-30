import {z} from "zod";
import { id } from "zod/v4/locales";

export const productSchema = z.object({
    name: z.string().min(2).max(100),
    description: z.string().max(255).nullish(),
    
});