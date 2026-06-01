import { createEntityStore } from "@/core/store/EntityStore";
import type { IProduct } from "../interface/Product.interface";

export const useProductStore = createEntityStore<IProduct>("products");