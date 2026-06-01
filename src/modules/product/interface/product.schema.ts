import {z} from "zod";
import { id } from "zod/v4/locales";

export const productSchema = z.object({
   // id: z.number().nullish(),
    name: z.string().min(2).max(100),
    description: z.string().max(255).nullish(),
    price: z.string().nullish()
});