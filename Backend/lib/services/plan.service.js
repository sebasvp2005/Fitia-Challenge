"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcPlanPortions = exports.getBasePlan = exports.createPlan = void 0;
const crypto_1 = require("crypto");
const FoodService = __importStar(require("./food.service"));
;
function getWeigths(plan) {
    return plan.planItems.map((planItem) => planItem.serving * planItem.food.servingSize);
}
const createPlan = async (mealType, nutrientTargets) => {
    const foods = await FoodService.getFoodFilterByMealType(mealType);
    let plan = null;
    let totalDistance = 1e16;
    for (let i = 0; i < 15; i++) {
        const basePlan = (0, exports.getBasePlan)(foods);
        const curPlan = (0, exports.calcPlanPortions)(basePlan, nutrientTargets);
        if (curPlan == null) {
            continue;
        }
        let curDistance = calculateTotalDistance(nutrientTargets, basePlan, getWeigths(curPlan));
        if (curDistance < totalDistance) {
            totalDistance = curDistance;
            plan = curPlan;
        }
    }
    return plan;
};
exports.createPlan = createPlan;
const getBasePlan = (foods) => {
    const foodsByMacrotype = FoodService.classifyFoodsByMacroType(foods);
    const basePlan = [];
    basePlan.push(foodsByMacrotype.protein[(0, crypto_1.randomInt)(0, foodsByMacrotype.protein.length)]);
    let carbInd = (0, crypto_1.randomInt)(0, foodsByMacrotype.carb.length);
    basePlan.push(foodsByMacrotype.carb[carbInd]);
    let num = (0, crypto_1.randomInt)(0, 2);
    if (num == 1) {
        basePlan.push(foodsByMacrotype.carb[(carbInd + (0, crypto_1.randomInt)(1, foodsByMacrotype.carb.length)) % foodsByMacrotype.carb.length]);
    }
    num = (0, crypto_1.randomInt)(0, 2);
    if (num == 1) {
        basePlan.push(foodsByMacrotype.fat[(0, crypto_1.randomInt)(0, foodsByMacrotype.fat.length)]);
    }
    return basePlan;
};
exports.getBasePlan = getBasePlan;
const priorities = {
    "high": (x) => { return x ** 2; },
    "medium": (x) => { return x; },
    "low": (x) => { return x / 2; }
};
const calcDistance = (x, y, priority) => {
    return priorities[priority](Math.abs(x - y)) ** 2;
};
const validateConfiguration = (nutrientTargets, foods, weights) => {
    for (const { name, limit, strictMode, priority } of nutrientTargets) {
        if (!strictMode)
            continue;
        let acum = 0;
        for (let i = 0; i < weights.length; i++) {
            const nutrientValue = foods[i][name];
            if (typeof nutrientValue !== 'number') {
                throw new Error(`Property ${name} is not a number`);
            }
            acum += nutrientValue * weights[i];
        }
        if (foods.length == weights.length && acum < limit * 0.8) {
            return false;
        }
        if (acum > limit * 1.2) {
            return false;
        }
    }
    return true;
};
const calculateTotalDistance = (nutrientTargets, foods, weights) => {
    let cur_total_distance = 0;
    for (const { name, limit, strictMode, priority } of nutrientTargets) {
        if (strictMode)
            continue;
        let acum = 0;
        for (let i = 0; i < weights.length; i++) {
            const nutrientValue = foods[i][name];
            if (typeof nutrientValue !== 'number') {
                throw new Error(`Property ${name} is not a number`);
            }
            acum += nutrientValue * weights[i];
        }
        let cur_distance = calcDistance(acum, limit, priority);
        cur_total_distance += cur_distance;
    }
    cur_total_distance = Math.sqrt(cur_total_distance);
    return cur_total_distance;
};
const calcPlanPortions = (foods, nutrientTargets) => {
    const weights = [];
    let ans = [];
    let min_distance = 1e9;
    const f = (foodIndex) => {
        if (validateConfiguration(nutrientTargets, foods, weights) == false)
            return;
        if (weights.length === foods.length) {
            let totalDistance = calculateTotalDistance(nutrientTargets, foods, weights);
            if (totalDistance < min_distance) {
                ans = [...weights];
                min_distance = totalDistance;
            }
            return;
        }
        for (let curWeight = foods[foodIndex].minSize; curWeight <= foods[foodIndex].maxSize; curWeight += foods[foodIndex].sizeIntervals) {
            weights.push(curWeight);
            f(foodIndex + 1);
            weights.pop();
        }
    };
    f(0);
    if (ans.length) {
        const planItems = foods.map((food, index) => {
            return {
                food: food,
                serving: parseFloat((ans[index] / food.servingSize).toFixed(2))
            };
        });
        const plan = {
            kcal: parseFloat(planItems.reduce((acc, planItem) => acc + planItem.food.caloriesPerGram * planItem.serving * planItem.food.servingSize, 0).toFixed(2)),
            protein: parseFloat(planItems.reduce((acc, planItem) => acc + planItem.food.proteinPerGram * planItem.serving * planItem.food.servingSize, 0).toFixed(2)),
            carbs: parseFloat(planItems.reduce((acc, planItem) => acc + planItem.food.carbsPerGram * planItem.serving * planItem.food.servingSize, 0).toFixed(2)),
            fat: parseFloat(planItems.reduce((acc, planItem) => acc + planItem.food.fatPerGram * planItem.serving * planItem.food.servingSize, 0).toFixed(2)),
            planItems: planItems
        };
        return plan;
    }
    return null;
};
exports.calcPlanPortions = calcPlanPortions;
