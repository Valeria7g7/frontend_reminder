import { createEntityStore } from "@/core/store/EntityStore";
import type { IUserProduct } from "../interface/UserProduct.interface";

export const useUserProductStore = createEntityStore<IUserProduct>("userProducts");