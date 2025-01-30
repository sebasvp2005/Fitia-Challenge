"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.classifyFoodsByMacroType = exports.getFoodFilterByMealType = exports.getFoods = void 0;
const axios_1 = __importDefault(require("axios"));
const mealsFilter = {
    "breakfast": "includeInBreakfast",
    "lunch": "includeInLunch",
    "dinner": "includeInDinner"
};
const getFoods = async () => {
    const response = await axios_1.default.get('https://storage.googleapis.com/fitia_public_files/dataset.json');
    return response.data;
};
exports.getFoods = getFoods;
const getFoodFilterByMealType = async (mealType) => {
    const foods = await (0, exports.getFoods)();
    return foods.filter(food => food[mealsFilter[mealType]]);
};
exports.getFoodFilterByMealType = getFoodFilterByMealType;
const classifyFoodsByMacroType = (foods) => {
    return foods.reduce((acc, food) => {
        if (!acc[food.macroType]) {
            acc[food.macroType] = [];
        }
        acc[food.macroType].push(food);
        return acc;
    }, { protein: [], carb: [], fat: [] });
};
exports.classifyFoodsByMacroType = classifyFoodsByMacroType;
