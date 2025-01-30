import { Food } from "./food";


export interface Plan{
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
    planItems : PlanItem[];
}

export interface PlanItem{
    serving: number;
    food: Food;
}

