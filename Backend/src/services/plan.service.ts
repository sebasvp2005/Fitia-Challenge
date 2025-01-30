import { randomInt } from "crypto";
import { Food } from "../models/food.model";
import { Plan } from "../models/plan.model";
import { PlanItem } from "../models/planItem.model";
import * as FoodService from './food.service';

export interface Nutrient {
    name: keyof Food;
    limit: number;
    strictMode: boolean;
    priority: string;
};

function getWeigths( plan : Plan){
    return plan.planItems.map((planItem) => planItem.serving * planItem.food.servingSize);
}

export const createPlan = async (mealType:string, nutrientTargets: Nutrient[]) => {
    const foods = await FoodService.getFoodFilterByMealType(mealType);
    let plan : Plan | null = null
    let totalDistance = 1e16;
    for(let i = 0; i < 15; i++) {
        const basePlan = getBasePlan(foods);
    
        const curPlan = calcPlanPortions(basePlan, nutrientTargets);

        if(curPlan == null) {
            continue;
        }
        let curDistance = calculateTotalDistance(nutrientTargets, basePlan, getWeigths(curPlan));
        if( curDistance < totalDistance) {
            totalDistance = curDistance
            plan = curPlan; 
        }
    }

    return plan;
};

export const getBasePlan = (foods : Food[]) => {
    const foodsByMacrotype =  FoodService.classifyFoodsByMacroType(foods);
    const basePlan : Food[] = [];

    basePlan.push(foodsByMacrotype.protein[randomInt(0, foodsByMacrotype.protein.length)]);

    let carbInd: number = randomInt(0, foodsByMacrotype.carb.length);
    basePlan.push(foodsByMacrotype.carb[carbInd]);

    let num = randomInt(0, 2);
    if(num == 1) {
        basePlan.push(foodsByMacrotype.carb[(carbInd + randomInt(1, foodsByMacrotype.carb.length)) % foodsByMacrotype.carb.length]);
    }

    num = randomInt(0, 2);

    if(num == 1) {
        basePlan.push(foodsByMacrotype.fat[randomInt(0, foodsByMacrotype.fat.length)]);
    }

    return basePlan;
};

const priorities :Record<string, (x: number) => number> = {
    "high": (x: number)=>{return x**2},
    "medium": (x: number)=>{return x},
    "low": (x: number)=>{return x/2}
}

const calcDistance = ( x: number, y: number, priority: string) => {
    return priorities[priority](Math.abs(x - y)) ** 2;
}

const validateConfiguration = (nutrientTargets: Nutrient[], foods: Food[], weights: number[]) => {
    for (const {name, limit, strictMode, priority} of nutrientTargets){
        if(!strictMode)continue;
        let acum=0

        for (let i = 0; i < weights.length; i++) {

            const nutrientValue = foods[i][name];

            if ( typeof nutrientValue !== 'number') {
                throw new Error(`Property ${name} is not a number`);
            }

            acum += nutrientValue * weights[i];
        }
        if(foods.length == weights.length && acum < limit * 0.8) {
            return false;
        }

        if (acum > limit * 1.2) {
            return false;
        }
    }
    return true;
}

const calculateTotalDistance = (nutrientTargets: Nutrient[], foods: Food[], weights: number[]) => {
    let cur_total_distance = 0;
    for (const {name, limit, strictMode, priority} of nutrientTargets){
        if(strictMode)continue;
        let acum = 0;
        
        for (let i = 0; i < weights.length; i++) {

            const nutrientValue = foods[i][name];

            if ( typeof nutrientValue !== 'number') {
                throw new Error(`Property ${name} is not a number`);
            }

            acum += nutrientValue * weights[i];
        }

        let cur_distance = calcDistance(acum, limit, priority);
        cur_total_distance += cur_distance;

    }
    cur_total_distance = Math.sqrt(cur_total_distance);

    return cur_total_distance;

}


export const calcPlanPortions = (foods : Food[], nutrientTargets: Nutrient[]) : Plan|null => {

    const weights : number[]= [];

    let ans : number[] =[];

    let min_distance = 1e9;
    const f = (foodIndex: number) => {
        if(validateConfiguration(nutrientTargets, foods, weights) == false) return;

        if (weights.length === foods.length) {

            let totalDistance = calculateTotalDistance(nutrientTargets, foods, weights);
            
            if( totalDistance < min_distance) {
                ans = [...weights];
                min_distance = totalDistance;
            }

            return;
        }

        for(let curWeight = foods[foodIndex].minSize; curWeight <= foods[foodIndex].maxSize; curWeight += foods[foodIndex].sizeIntervals){
            weights.push(curWeight);
            f(foodIndex + 1);
            weights.pop();
        }
    };

    f(0);



    if(ans.length) {
        const planItems: PlanItem[] = foods.map((food, index) => {
            return {
                food: food,
                serving: parseFloat((ans[index] / food.servingSize).toFixed(2))
            };
        });

        const plan : Plan = {
            kcal: parseFloat(planItems.reduce((acc, planItem) => acc + planItem.food.caloriesPerGram * planItem.serving  * planItem.food.servingSize, 0).toFixed(2)),
            protein: parseFloat(planItems.reduce((acc, planItem) => acc + planItem.food.proteinPerGram * planItem.serving * planItem.food.servingSize, 0).toFixed(2)),
            carbs: parseFloat(planItems.reduce((acc, planItem) => acc + planItem.food.carbsPerGram * planItem.serving * planItem.food.servingSize, 0).toFixed(2)),
            fat: parseFloat(planItems.reduce((acc, planItem) => acc + planItem.food.fatPerGram * planItem.serving * planItem.food.servingSize, 0).toFixed(2)),
            planItems: planItems
        };

        return plan
    }
    return null;

}