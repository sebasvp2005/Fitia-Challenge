import { PlanItem } from "./planItem.model";
export interface Plan{
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
    planItems : PlanItem[];
}
