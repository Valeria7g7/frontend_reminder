import { createEntityStore } from "@/core/store/EntityStore";
import type { IUser } from "../interface/User.interface";

export const useUserStore = createEntityStore<IUser>("users");