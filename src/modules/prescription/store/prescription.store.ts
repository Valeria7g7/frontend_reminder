import { createEntityStore } from "@/core/store/EntityStore";
import type { IPrescription } from "../interface/Prescription.interface";

export const usePrescriptionStore = createEntityStore<IPrescription>("users");