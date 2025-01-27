import * as functions from '@google-cloud/functions-framework';
import * as PlanService from '../services/plan.service';
import { Food } from '../models/food.model';

const nutrientsFilter: Record<string, keyof Food> = {
    "calories": "caloriesPerGram",
    "fats": "fatPerGram",
    "carbs": "carbsPerGram",
    "proteins": "proteinPerGram"
};

export const getPlan = async (req: functions.Request, res: functions.Response) =>{


    const mealType = req.body.mealType || 'breakfast';
    const nutrientsTarget = req.body.nutrientsTarget || [];

    // Convert nutrientsTarget to match the Nutrient interface
    const targets = nutrientsTarget.map((target: any) => {
        const { name, limit } = target;

        if (!nutrientsFilter[name]) {
            throw new Error(`Invalid nutrient name: ${name}`);
        }

        return {
            name: nutrientsFilter[name], 
            limit: limit
        };
    });

    const plan = await PlanService.createPlan(mealType, targets);
    res.status(200).send(plan);

}