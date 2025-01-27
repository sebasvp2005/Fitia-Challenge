import * as functions from '@google-cloud/functions-framework';
import * as foodService from '../services/food.service';

export const getFoods = async (req: functions.Request, res: functions.Response) =>{
    const foods = await foodService.getFoods()
    res.status(200).send(foods)
}