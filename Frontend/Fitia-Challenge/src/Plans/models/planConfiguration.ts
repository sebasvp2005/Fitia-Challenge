
export interface PlanConfiguration{
    mealType: string;
    nutrientsTargets: nutrientTarget[];
}


export interface nutrientTarget{
    name: string;
    limit: number;
    strictMode: boolean;
    priority: string;
};


export interface NutrientOptions {
    calories: Nutrient|null;
    proteins: Nutrient|null;
    carbs: Nutrient|null;
    fats: Nutrient|null;
}

export interface Nutrient {
    limit: number;
    strictMode: boolean;
    priority: "low" | "medium" | "high";
}