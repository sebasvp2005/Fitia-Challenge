import { randomInt } from "crypto";
import { Food } from "../models/food.model";
import { Plan } from "../models/plan.model";
import { PlanItem } from "../models/planItem.model";
import * as FoodService from './food.service';

export interface Nutrient {
    name: keyof Food;
    limit: number;
};

export const createPlan = async (mealType:string, nutrientTargets: Nutrient[]) => {
    const foods = await FoodService.getFoodFilterByMealType(mealType);

    const basePlan = getBasePlan(foods);
    console.log(basePlan);

    const plan = calcPlanPortions(basePlan, nutrientTargets);
    console.log(plan);

    return plan;
};

export const getBasePlan = (foods : Food[]) => {
    const foodsByMacrotype =  FoodService.classifyFoodsByMacroType(foods);
    const basePlan : Food[] = [];
    console.log(foodsByMacrotype);

    // Add protein to the base plan
    basePlan.push(foodsByMacrotype.protein[randomInt(0, foodsByMacrotype.protein.length)]);

    // Add carbs to the base plan
    let carbInd: number = randomInt(0, foodsByMacrotype.carb.length);
    basePlan.push(foodsByMacrotype.carb[carbInd]);
    let num = randomInt(0, 2);
    console.log(num);
    if(num == 1) {
        basePlan.push(foodsByMacrotype.carb[(carbInd + randomInt(1, foodsByMacrotype.carb.length)) % foodsByMacrotype.carb.length]);
    }

    num = randomInt(0, 2);
    console.log(num);
    // Add fat to the base plan
    if(num == 1) {
        basePlan.push(foodsByMacrotype.fat[randomInt(0, foodsByMacrotype.fat.length)]);
    }

    return basePlan;
};


export const calcPlanPortions = (foods : Food[], nutrientTargets: Nutrient[]) : Plan|null => {

    const weights : number[]= [];

    let ans : number[] =[];

    let numberSol = 0
    const f = (foodIndex: number) => {
        console.log(foodIndex, weights);
        for (const {name, limit} of nutrientTargets){
            let acum = 0;

            for (let i = 0; i < weights.length; i++) {

                const nutrientValue = foods[i][name];

                if ( typeof nutrientValue !== 'number') {
                    throw new Error(`Property ${name} is not a number`);
                }

                acum += nutrientValue * weights[i];
            }

            if(acum > limit * 1.1) return;

        }

        if (weights.length === foods.length) {
            for (const {name, limit} of nutrientTargets){
                let acum = 0;
    
                for (let i = 0; i < weights.length; i++) {
    
                    const nutrientValue = foods[i][name];
    
                    if ( typeof nutrientValue !== 'number') {
                        throw new Error(`Property ${name} is not a number`);
                    }
    
                    acum += nutrientValue * weights[i];
                }
    
                if(acum < limit * 0.8) {
                    console.log('No cumplio con el limite', name, acum, limit);   
                    return;
                }
    
            }

            ans = [...weights];
            console.log(weights);
            numberSol++;
            return;
        }

        for(let curWeight = foods[foodIndex].minSize; curWeight <= foods[foodIndex].maxSize; curWeight += foods[foodIndex].sizeIntervals){
            weights.push(curWeight);
            f(foodIndex + 1);
            weights.pop();
        }
    };
    f(0);


    console.log(numberSol);

    if(ans.length) {
        const planItems: PlanItem[] = foods.map((food, index) => {
            return {
                food: food,
                serving: ans[index] / food.servingSize
            };
        });

        const plan : Plan = {
            kcal: planItems.reduce((acc, planItem) => acc + planItem.food.caloriesPerGram * planItem.serving  * planItem.food.servingSize, 0),
            protein: planItems.reduce((acc, planItem) => acc + planItem.food.proteinPerGram * planItem.serving * planItem.food.servingSize, 0),
            carbs: planItems.reduce((acc, planItem) => acc + planItem.food.carbsPerGram * planItem.serving * planItem.food.servingSize, 0),
            fat: planItems.reduce((acc, planItem) => acc + planItem.food.fatPerGram * planItem.serving * planItem.food.servingSize, 0),
            planItems: planItems
        };

        return plan
    }
    return null;

}