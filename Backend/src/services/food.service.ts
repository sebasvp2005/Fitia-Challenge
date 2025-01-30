import { Food } from "../models/food.model";
import axios from 'axios';


const mealsFilter: Record<string, keyof Food> = {
    "breakfast": "includeInBreakfast",
    "lunch": "includeInLunch",
    "dinner": "includeInDinner"
};


export const getFoods = async(): Promise<Food[]> =>{
    const response = await axios.get<Food[]>('https://storage.googleapis.com/fitia_public_files/dataset.json');
    return response.data;
};


export const getFoodFilterByMealType = async(mealType: string): Promise<Food[]> =>{
    const foods = await getFoods();
    return foods.filter(food => food[mealsFilter[mealType]]);
};

export const classifyFoodsByMacroType = (foods: Food[]): Record<Food['macroType'], Food[]> => {
    return foods.reduce<Record<Food['macroType'], Food[]>>((acc, food) => {
      if (!acc[food.macroType]) {
        acc[food.macroType] = [];
      }
      acc[food.macroType].push(food);
      return acc;
    }, { protein: [], carb: [], fat: [] }); 
};