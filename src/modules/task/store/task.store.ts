import { createEntityStore } from "@/core/store/EntityStore";
import type { ITask } from "../interface/task.interface";

export const useTaskStore = createEntityStore<ITask>("task");