import { create } from "zustand";
import { PlanConfiguration, nutrientTarget } from './../models/planConfiguration';

interface PlanConfigurationStore {
    configuration: PlanConfiguration;
    setMealType: (mealType: string) => void;
    setNutrientsTargets: (nutrientsTargets: nutrientTarget[]) => void;
}

export const usePlanConfigurationStore = create<PlanConfigurationStore>((set) => ({
    configuration: {
        mealType: "",
        nutrientsTargets: [],
    },
    setMealType: (mealType) => set((state) => ({
        configuration: { ...state.configuration, mealType }
    })),
    setNutrientsTargets: (nutrientsTargets) => set((state) => ({
        configuration: { ...state.configuration, nutrientsTargets }
    }))
}));
