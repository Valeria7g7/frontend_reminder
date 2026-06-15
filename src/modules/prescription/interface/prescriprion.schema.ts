import {z} from "zod";

export const userSchema = z.object({
    date:z.string(),
    total:z.number().optional(),
    description:z.string().optional(),
});