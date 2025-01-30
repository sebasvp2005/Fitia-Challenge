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
exports.getPlan = void 0;
const PlanService = __importStar(require("../services/plan.service"));
const nutrientsFilter = {
    "calories": "caloriesPerGram",
    "fats": "fatPerGram",
    "carbs": "carbsPerGram",
    "proteins": "proteinPerGram"
};
const getPlan = async (req, res) => {
    const mealType = req.body.mealType || 'breakfast';
    const nutrientsTarget = req.body.nutrientsTargets || [];
    // Convert nutrientsTarget to match the Nutrient interface
    const targets = nutrientsTarget.map((target) => {
        const { name, limit, strictMode, priority } = target;
        if (!nutrientsFilter[name]) {
            throw new Error(`Invalid nutrient name: ${name}`);
        }
        return {
            name: nutrientsFilter[name],
            limit: limit,
            strictMode: strictMode,
            priority: priority
        };
    });
    const plan = await PlanService.createPlan(mealType, targets);
    res.status(200).send(plan);
};
exports.getPlan = getPlan;
